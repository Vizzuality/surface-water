'use strict';

import {connect} from 'react-redux';
import MapSearchControl from '../components/MapSearchControl';
import { toggleSearch } from '../actions/map';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openSearch: () => dispatch(toggleSearch(true))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSearchControl);
