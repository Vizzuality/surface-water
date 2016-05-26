import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION, LOADING, ERROR, GEO_DATA} from '../constants';
import 'whatwg-fetch';


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

export function fetchGeo(rectangleBounds, year) {
  return dispatch => {
    dispatch({
      type: LOADING,
      payload: true
    });

    const rectangleLatLng = [
      [ rectangleBounds[1], rectangleBounds[0] ],
      [ rectangleBounds[1], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[2] ],
      [ rectangleBounds[3], rectangleBounds[0] ]
    ];

    const coords = `[${rectangleLatLng.map(arr => `[${arr.toString()}]`).toString()}]`;

    fetch(`http://vizz.water-test.appspot.com/water?coords=${coords}&date=${year}-01-01`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: GEO_DATA,
          payload: response.result.features
        });
      })
      .catch(response => {
        dispatch({
          type: ERROR,
          payload: 'There was an error doing the analysis of the are you’ve selected. Please try again.'
        });
      })
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
