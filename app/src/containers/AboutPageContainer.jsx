'use strict';

import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { goTo } from '../actions/map';
import AboutPage from '../components/AboutPage';

const mapStateToProps = (state, { params, location }) => {
  return {
    history: state.map.history
  };
};

const mapDispatchToProps = (dispatch, { params, location }) => {
  return {
    goBack: () => dispatch(goBack()),
    goTo: page => dispatch(goTo(params, page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
