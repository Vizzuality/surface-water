'use strict';

import {connect} from 'react-redux';
import Dashboard from '../components/Dashboard';
import {setMode, setAction} from '../actions/map';

const mapStateToProps = state => {
  return {
    mode: state.map.mode,
    yearlyPercentage: state.map.data.yearlyPercentage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMode: mode => dispatch(setMode(mode)),
    setAction: action => dispatch(setAction(action))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
