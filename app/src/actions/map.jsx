import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION, LOADING, ERROR, DATA, SEARCH, HISTORY, SHARE, SPLASH} from '../constants';
import { push } from 'react-router-redux';

import { fetchWithTimeout } from '../helpers/utils';

/* Timeout for the requests before throwing an error */
const requestsTimeout = 45000;

export function updateURL(params, nextParams) {
  params = Object.assign({}, params, nextParams);

  let url = `${params.basemap}/${params.lat}/${params.lng}/${params.zoom}`;

  url += '?' + ['area', 'year'].map(k => params[k] ? `${k}=${params[k]}` : '')
    .filter(k => k.length)
    .join('&');

  return push(`/map/${url}`);
};

export function setMode(mode) {
  return dispatch => {
    dispatch({
      type: MODE,
      payload: mode
    });
  }
};

export function setAction(action) {
  return dispatch => {
    dispatch({
      type: ACTION,
      payload: action
    });
  };
};


export function goTo(params, page) {
  return dispatch => {
    dispatch({
      type: HISTORY,
      payload: true
    });
    return dispatch(push(page));
  };
};

export function fetchData(routerParams, rectangleBounds, year) {
  return (dispatch, getState) => {
    const state = getState().map;
    let fetchSeries = true;

    year = year || routerParams.year;

    dispatch({
      type: LOADING,
      payload: true
    });

    if(!rectangleBounds) {
      /* We just want to fetch the new geometries */
      fetchSeries = false;
      rectangleBounds = routerParams.area.split(',');
    }
    const rectangleLatLng = [
      [ rectangleBounds[1], rectangleBounds[0] ],
      [ rectangleBounds[1], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[0] ]
    ];
    const coords = `[${rectangleLatLng.map(arr => `[${arr.toString()}]`).toString()}]`;

    /* By removing the data first, we make it easy for the components to know
     * when new data arrive */
    dispatch(emptyData.apply(null, fetchSeries ? [] : [ 'yearlyPercentage' ]));

    let yearlyPercentage, geometries;

    /* We only fetch the series if the rectangleBounds changed */
    new Promise((resolve, reject) => {
      if(!fetchSeries) return resolve();
      fetchWithTimeout(`http://waterapp.enviro-service.appspot.com/water/series?coords=${coords}&begin=1999-01-01`, requestsTimeout)
        .then(response => response.json())
        /* We parse the data */
        .then(response => {
          yearlyPercentage = response.result.map(d => {
            return {
              year: +d.date.slice(0, 4),
              percentage: d.area
            }
          });
        })
        .then(resolve)
        .catch(reject);
    })
      /* We fetch the geometries
       * NOTE: we need to do it after in order to have the last year with data
       * in case the user hasn't selected a year yet */
      .then(() => {
        if(!year) {
          year = yearlyPercentage[yearlyPercentage.length - 1].year;
          dispatch(updateURL(routerParams, { year }));
        }

        return fetchWithTimeout(`http://waterapp.enviro-service.appspot.com/water?coords=${coords}&date=${year}-01-01`, requestsTimeout);
      })
      .then(response => response.json())
      /* We parse the data */
      .then(response => geometries = response.result.features)
      .then(() => {
        const payload = {};
        if(yearlyPercentage) payload.yearlyPercentage = yearlyPercentage;
        if(geometries) payload.geometries = geometries;

        dispatch({
          type: DATA,
          payload
        });
      })
      .catch(response => {
        let error;
        if(response.message === 'timeout') {
          error = 'The analysis takes too long. Please try again with a smaller area.';
        } else if(!fetchSeries) {
          error = 'There was an error retrieving the data for the selected year. Please try another one.';
        } else if(yearlyPercentage) {
          error = `There was an error retrieving the data for ${yearlyPercentage[yearlyPercentage.length - 1].year}. Please select another year to see the full results.`;
        } else {
          error = 'There was an error doing the analysis of the area you’ve selected. If the error keeps on appearing, try with a smaller area.';
        }

        dispatch({
          type: ERROR,
          payload: error
        });

        /* In case the second request fails but we succeeded in fetching the
         * series, update the store with them */
        if(yearlyPercentage) {
          dispatch({
            type: DATA,
            payload: { yearlyPercentage }
          });
        }
      })
      /* We always remove the loading spinner */
      .then(() => {
        dispatch({
          type: LOADING,
          payload: false
        });
      });
  };
};

export function emptyData(...keep) {
  const payload = { yearlyPercentage: null, geometries: null };
  if(keep.length) keep.forEach(v => delete payload[v]);
  return {
    type: DATA,
    payload
  };
};

export function setError(text) {
  return dispatch => {
    dispatch({
      type: ERROR,
      payload: text
    });
  };
};

export function toggleSearch(active) {
  return dispatch => {
    dispatch({
      type: SEARCH,
      payload: { active }
    });
  };
};

export function toggleShare(active) {
  return dispatch => {
    dispatch({
      type: SHARE,
      payload: { active }
    });
  };
};

export function toggleSplash(active) {
  return dispatch => {
    if(active) {
      localStorage.removeItem('recurrentUser');
    } else {
      localStorage.setItem('recurrentUser', true);
    }

    dispatch({
      type: SPLASH,
      payload: { active }
    });
  };
};

export function search(location) {
  return dispatch => {
    fetchWithTimeout(`http://nominatim.openstreetmap.org/search/${location}?format=json&limit=1`, requestsTimeout)
      .then(response => response.json())
      .then(response => {
        if(response.length && response[0].boundingbox &&
          response[0].boundingbox.length) {
          dispatch({
            type: SEARCH,
            payload: {
              active: false,
              boundingBox: response[0].boundingbox
            }
          });
        } else {
          dispatch({
            type: SEARCH,
            payload: { error: 'The location couln\'t be determined. Please try another.' }
          });
        }
      })
      .catch(response => {
        dispatch({
          type: SEARCH,
          payload: { error: 'An error occured while searching. Please try again.' }
        });
      });
  };
};

export function setSearchError(error) {
  return {
    type: SEARCH,
    payload: { error }
  };
};

export function deleteSearchBoundingBox() {
  return dispatch => {
    dispatch({
      type: SEARCH,
      payload: { boundingBox: null }
    });
  };
};
