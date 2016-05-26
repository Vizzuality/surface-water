import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION, LOADING, ERROR, GEO_DATA, SEARCH} from '../constants';

const initialState = {
  selectedArea: null,
  mode: null,
  zoom: 2,
  latLng: [40.432416, -3.701031],
  year: 1999,
  action: null,
  yearsRange: [1999, 2012],
  loading: false,
  error: null,
  geoData: null,
  search: {
    active: false,
    boundingBox: null,
    error: null
  }
};

export default function(state = initialState, action) {
    /* TODO: polyfill the Object.assign */
    switch (action.type) {
        case MODE:
          return Object.assign({}, state, { mode: action.payload });
        case ACTION:
          return Object.assign({}, state, { action: action.payload });
        case LOADING:
          return Object.assign({}, state, { loading: action.payload });
        case ERROR:
          return Object.assign({}, state, { error: action.payload });
        case GEO_DATA:
          return Object.assign({}, state, { geoData: action.payload });
        case SEARCH:
          const search = Object.assign({}, state.search);
          for(let k in action.payload) {
            search[k] = action.payload[k];
          }
          return Object.assign({}, state, { search });
        default:
            return state;
    }
};
