'use strict';

import {connect} from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    zoom: state.map.zoom,
    latLng: state.map.latLng,
    year: state.map.year
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
