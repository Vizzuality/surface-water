import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION} from '../constants';

const initialState = {
  selectedArea: null,
  mode: null,
  zoom: 2,
  latLng: [40.432416, -3.701031],
  year: 1999,
  action: null,
  yearsRange: [1999, 2012]
};

export default function(state = initialState, action) {
    /* TODO: polyfill the Object.assign */
    switch (action.type) {
        case MODE:
          return Object.assign({}, state, { mode: action.payload });
        case ACTION:
          return Object.assign({}, state, { action: action.payload });
        default:
            return state;
    }
};
