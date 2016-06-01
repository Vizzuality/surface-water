import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppContainer from './containers/app';
import MapPageContainer from './containers/MapPage';
import AboutPageContainer from './containers/AboutPageContainer';
import {Router, Route, IndexRedirect} from 'react-router';

class Routes extends Component{
  render(){
    return <Router history={this.props.history}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to={`map/${this.props.basemap}/${this.props.latLng.join('/')}/${this.props.zoom}`}/>
        <Route path="map/:basemap/:lat/:lng/:zoom" component={MapPageContainer} />
        <Route path="about" component={AboutPageContainer} />
      </Route>
    </Router>;
  }
}

let mapStateToProps = state => ({
  zoom: state.map.zoom,
  latLng: state.map.latLng,
  basemap: state.map.basemap
});

let mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
