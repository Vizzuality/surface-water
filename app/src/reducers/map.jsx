import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR} from '../constants';

const initialState = {
  selectedArea: null,
  mode: null,
  zoom: 2,
  latLng: [40.432416, -3.701031],
  year: null /* TODO: see with the api */
};

export default function(state = initialState, action) {
    /* TODO: polyfill the Object.assign */
    switch (action.type) {
        case SELECTED_AREA:
          return Object.assign({}, state, { selectedArea: action.payload });
        case MODE:
          return Object.assign({}, state, { mode: action.payload });
        case ZOOM:
          return Object.assign({}, state, { zoom: action.payload });
        case LATLNG:
          return Object.assign({}, state, { latLng: action.payload });
        case YEAR:
          return Object.assign({}, state, { year: action.payload });
        default:
            return state;
    }
};
