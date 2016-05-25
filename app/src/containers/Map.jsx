'use strict';

import {connect} from 'react-redux';
import Map from '../components/Map';
import {setSelectedArea, setZoom, setLatLng, setMode} from '../actions/map';

const mapStateToProps = (state, stateRouter) => {
  return {
    mode: state.map.mode
  };
};

/* The setters must only change attributes stored in the store and not the one
 * stored in the router */
const mapDispatchToProps = (dispatch) => {
  return {
    setMode: mode => dispatch(setMode(mode))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
