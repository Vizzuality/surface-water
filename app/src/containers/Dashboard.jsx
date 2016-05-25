'use strict';

import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import {setMode} from '../actions/map';

const mapStateToProps = (state) => {
  return {
    mode: state.map.mode
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setMode: mode => dispatch(setMode(mode))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
