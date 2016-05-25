import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION} from '../constants';


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
