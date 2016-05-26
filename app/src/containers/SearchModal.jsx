'use strict';

import {connect} from 'react-redux';
import SearchModal from '../components/SearchModal';

import { toggleSearch, search } from '../actions/map';

const mapStateToProps = state => {
  return {
    error: state.map.search.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(toggleSearch(false)),
    search: str => dispatch(search(str))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
