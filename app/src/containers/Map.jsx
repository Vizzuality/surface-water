'use strict';

import {connect} from 'react-redux';
import Map from '../components/Map';
import {setMode, setAction, fetchGeo} from '../actions/map';

const mapStateToProps = (state, stateRouter) => {
  return {
    mode: state.map.mode,
    action: state.map.action,
    data: state.map.geoData
  };
};

/* The setters must only change attributes stored in the store and not the one
 * stored in the router */
const mapDispatchToProps = (dispatch) => {
  return {
    setMode: mode => dispatch(setMode(mode)),
    setAction: action => dispatch(setAction(action)),
    fetchData: (rectangleBounds, year) => dispatch(fetchGeo(rectangleBounds,year))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
