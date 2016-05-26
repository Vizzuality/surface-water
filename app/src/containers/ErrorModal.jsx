'use strict';

import {connect} from 'react-redux';
import { setError } from '../actions/map';

import ErrorModal from '../components/ErrorModal';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: mode => dispatch(setError(null)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
