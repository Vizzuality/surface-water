'use strict';

import {connect} from 'react-redux';
import Map from '../components/Map';
import {setMode, setAction, deleteSearchBoundingBox, setError} from '../actions/map';

const mapStateToProps = state => {
  return {
    mode: state.map.mode,
    action: state.map.action,
    data: {
      geos: state.map.data.geometries,
      yearlyPercentage: state.map.data.yearlyPercentage
    },
    mapBoundingBox: state.map.search.boundingBox &&
      state.map.search.boundingBox.map(v => +v)
  };
};

/* The setters must only change attributes stored in the store and not the one
 * stored in the router */
const mapDispatchToProps = dispatch => {
  return {
    setMode: mode => dispatch(setMode(mode)),
    setAction: action => dispatch(setAction(action)),
    resetBoundingBox: () => dispatch(deleteSearchBoundingBox()),
    showError: text => dispatch(setError(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
