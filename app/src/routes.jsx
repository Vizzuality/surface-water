import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppContainer from './containers/app';
import MapPageContainer from './containers/mapPage';
import {Router, Route, IndexRedirect} from 'react-router';

class Routes extends Component{
  render(){
    return <Router history={this.props.history}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to={`map/${this.props.latLng.join('/')}/${this.props.zoom}/${this.props.year}`}/>
        <Route path="map/:lat/:lng/:zoom/:year" component={MapPageContainer} />
      </Route>
    </Router>;
  }
}
let mapStateToProps = (state) => ({
  zoom: state.map.zoom,
  latLng: state.map.latLng,
  year: state.map.year
});

let mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
