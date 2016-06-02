'use strict';

import {connect} from 'react-redux';
import SearchModal from '../components/SearchModal';

import { toggleSearch, search, setSearchError } from '../actions/map';

const mapStateToProps = state => {
  return {
    error: state.map.search.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    close: () => dispatch(toggleSearch(false)),
    search: str => dispatch(search(str)),
    removeError: () => dispatch(setSearchError(null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
