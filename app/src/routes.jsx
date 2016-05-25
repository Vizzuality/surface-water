import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppContainer from './containers/app';
import MapPageContainer from './containers/mapPage';
import {Router, Route, IndexRedirect} from 'react-router';

class Routes extends Component{
  render(){
    return <Router history={this.props.history}>
      <Route path="/" component={AppContainer}>
        <IndexRedirect to={`map/${this.props.latLng.join('/')}/${this.props.zoom}`}/>
        <Route path="map/:lat/:lng/:zoom" component={MapPageContainer} />
      </Route>


    </Router>
  }
}
let mapStateToProps = (state) => ({
  zoom: state.map.zoom,
  latLng: state.map.latLng
});

let mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Routes);
