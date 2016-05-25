'use strict';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import MapPage from '../components/MapPage';

/* Used to update the URL */
const setUrl = (params, nextParams) => {
  params = Object.assign({}, params, nextParams);

  let url = `${params.lat}/${params.lng}/${params.zoom}`;
  if(params.area) {
    url += `?area=${params.area}`;
    if(params.year) url += `&year=${params.year}`;
  }

  return push(`/map/${url}`);
};

const mapStateToProps = (state, ownProps) => {
  let props = {
    zoom: ownProps.params.zoom,
    lat: ownProps.params.lat,
    lng: ownProps.params.lng
  };

  if(ownProps.location.query && Object.keys(ownProps.location.query).length) {
    return Object.assign(props, {
      area: ownProps.location.query.area.split(',').map(n => +n),
      year: ownProps.location.query.year}
    );
  }

  return props;
};

const mapDispatchToProps = (dispatch, { params, location }) => {
  params = Object.assign({}, params, location.query);
  return {
    setSelectedArea: area => dispatch(setUrl(params, { area })),
    setZoom: zoom => dispatch(setUrl(params, { zoom })),
    setLatLng: latLng => dispatch(setUrl(params, { lat: latLng.lat, lng: latLng.lng }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
