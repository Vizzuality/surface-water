'use strict';

import {connect} from 'react-redux';
import ShareModal from '../components/ShareModal';

import { toggleShare } from '../actions/map';

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(toggleShare(false))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
