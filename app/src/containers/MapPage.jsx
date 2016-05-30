'use strict';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { updateURL, fetchData, emptyData } from '../actions/map';
import MapPage from '../components/MapPage';

const mapStateToProps = (state, { params, location }) => {
  let props = {
    zoom: +params.zoom,
    lat: +params.lat,
    lng: +params.lng,
    loading: state.map.loading,
    error: state.map.error,
    searchModal: state.map.search.active
  };

  if(location.query && Object.keys(location.query).length) {
    return Object.assign(props, {
      area: location.query.area.split(',').map(n => +n),
      year: +location.query.year
    });
  }

  return props;
};

const mapDispatchToProps = (dispatch, { params, location }) => {
  params = Object.assign({}, params, location.query);
  return {
    setSelectedArea: area => dispatch(updateURL(params, { area })),
    setZoom: zoom => dispatch(updateURL(params, { zoom })),
    setLatLng: latLng => dispatch(updateURL(params, { lat: latLng.lat, lng: latLng.lng })),
    fetchData: (rectangleBounds, year) => dispatch(fetchData(params, rectangleBounds, year))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
