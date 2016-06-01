'use strict';

import { connect } from 'react-redux';
import { toggleShare } from '../actions/map';

import Footer from '../components/Footer';

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    toggleShare: active => dispatch(toggleShare(active))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
