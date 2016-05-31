import {SELECTED_AREA, MODE, ZOOM, LATLNG, YEAR, ACTION, LOADING, ERROR, DATA, SEARCH} from '../constants';

const initialState = {
  selectedArea: null,
  mode: null,
  zoom: 10,
  latLng: [41.67855338051137, -120.43624877929688],
  basemap: 'terrain',
  year: null,
  action: null,
  loading: false,
  error: null,
  data: {
    yearlyPercentage: null,
    geometries: null
  },
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
        case DATA:
          const data = Object.assign({}, state.data);
          for(let k in action.payload) {
            data[k] = action.payload[k];
          }
          return Object.assign({}, state, { data });
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
