'use strict';

import {connect} from 'react-redux';
import SplashModal from '../components/SplashModal';

import { toggleSplash, search } from '../actions/map';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(toggleSplash(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashModal);
