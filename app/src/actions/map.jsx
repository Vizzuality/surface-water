import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION, LOADING, ERROR, DATA, SEARCH} from '../constants';
import { push } from 'react-router-redux';
import 'whatwg-fetch';

export function updateURL(params, nextParams) {
  params = Object.assign({}, params, nextParams);

  let url = `${params.lat}/${params.lng}/${params.zoom}`;
  if(params.area) {
    url += `?area=${params.area}`;
    if(params.year) {
      url += `&year=${params.year}`;
    }
  }

  return push(`/map/${url}`);
};

export function setSelectedArea(area) {
  return dispatch => {
    dispatch({
      type: SELECTED_AREA,
      payload: area
    });
  }
};

export function setMode(mode) {
  return dispatch => {
    dispatch({
      type: MODE,
      payload: mode
    });
  }
};

export function setZoom(zoom) {
  return dispatch => {
    dispatch({
      type: ZOOM,
      payload: zoom
    });
  }
};

export function setLatLng(latLng) {
  return dispatch => {
    dispatch({
      type: LATLNG,
      payload: latLng
    });
  }
};

export function setYear(year) {
  return dispatch => {
    dispatch({
      type: YEAR,
      payload: year
    });
    dispatch(updateURL({ year }));
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

export function fetchData(routerParams, rectangleBounds, year) {
  return (dispatch, getState) => {
    const state = getState().map;

    dispatch({
      type: LOADING,
      payload: true
    });

    if(!rectangleBounds) rectangleBounds = state.selectedArea;
    const rectangleLatLng = [
      [ rectangleBounds[1], rectangleBounds[0] ],
      [ rectangleBounds[1], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[0] ]
    ];
    const coords = `[${rectangleLatLng.map(arr => `[${arr.toString()}]`).toString()}]`;

    let yearlyPercentage, geometries;
    fetch(`http://waterapp.enviro-service.appspot.com/water/series?coords=${coords}&begin=1999-01-01`)
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
      /* We fetch the geometries
       * NOTE: we need to do it after in order to have the last year with data
       * in case the user hasn't selected a year yet */
      .then(() => {
        /* TODO: change as soon as the API is fixed for 2013 and 2014 */
        const lastYearWithDate = 2012; //yearlyPercentage[yearlyPercentage.length - 1].year

        let year = year || routerParams.year;
        if(!year) {
          year = lastYearWithDate;
          dispatch(updateURL(routerParams, { year }));
        }

        return fetch(`http://vizz.water-test.appspot.com/water?coords=${coords}&date=${year}-01-01`);
      })
      .then(response => response.json())
      /* We parse the data */
      .then(response => geometries = response.result.features)
      .then(() => {
        dispatch({
          type: DATA,
          payload: { yearlyPercentage, geometries }
        });
      })
      .catch(response => {
        let error;
        if(!year) {
          error = 'There was an error doing the analysis of the are you’ve selected. Please try again.';
        } else {
          error = 'There was an error doing the analysis of the are you’ve selected. Please try again.';
        }

        dispatch({
          type: ERROR,
          payload: error
        });
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

export function toggleSearch(active) {
  return dispatch => {
    dispatch({
      type: SEARCH,
      payload: { active }
    });
  };
};

export function search(location) {
  return dispatch => {
    fetch(`http://nominatim.openstreetmap.org/search/${location}?format=json&limit=1`)
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

export function deleteSearchBoundingBox() {
  return dispatch => {
    dispatch({
      type: SEARCH,
      payload: { boundingBox: null }
    });
  };
}
