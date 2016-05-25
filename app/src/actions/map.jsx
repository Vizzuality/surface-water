import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR} from '../constants';


export function setSelectedArea(area) {
  return function(dispatch) {
    dispatch({
        type: SELECTED_AREA,
        payload: area
    });
  }
};

export function setMode(mode) {
  return function(dispatch) {
    dispatch({
        type: MODE,
        payload: mode
    });
  }
};

export function setZoom(zoom) {
  return function(dispatch) {
    dispatch({
        type: ZOOM,
        payload: zoom
    });
  }
};

export function setLatLng(latLng) {
  return function(dispatch) {
    dispatch({
        type: LATLNG,
        payload: latLng
    });
  }
};

export function setYear(year) {
  return function(dispatch) {
    dispatch({
        type: YEAR,
        payload: year
    });
  }
};
