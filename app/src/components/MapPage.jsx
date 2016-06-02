'use strict';

import React, {Component} from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';
import {Map, Dashboard, Footer, LoadingSpinner, ErrorModal, SearchModal, ShareModal, SplashModal } from '../containers';

import logo from '../../assets/logo2x_negative.png';
import styles from '../../styles/components/map-page.scss';

class MapPage extends Component {

  render() {
    return (
      <div>
        <a href={`${location.origin}${location.pathname}`}>
          <img src={logo} alt="The Earth Genome" className={styles.logo} />
        </a>

        <ReactCSSTransitionGroup
          transitionName="loading-spinner"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          { this.props.loading && <LoadingSpinner key="spinner" /> }
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
          transitionName="modal"
          transitionAppear={true}
          transitionAppearTimeout={200}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          { this.props.error && <ErrorModal text={this.props.error} key="error" /> }
          { this.props.searchModal && <SearchModal key="search" /> }
          { this.props.shareModal && <ShareModal key="share" /> }
          { this.props.splashModal && <SplashModal key="splash" /> }
        </ReactCSSTransitionGroup>

        <Map
          zoom={this.props.zoom}
          latLng={[this.props.lat, this.props.lng]}
          basemap={this.props.basemap}
          selectedArea={this.props.area}
          year={this.props.year}
          setSelectedArea={this.props.setSelectedArea}
          setLatLng={this.props.setLatLng}
          setBasemap={this.props.setBasemap}
          setZoom={this.props.setZoom}
          fetchData={this.props.fetchData}
        />
        <Dashboard
          year={this.props.year}
          selectedArea={this.props.area}
          setSelectedArea={this.props.setSelectedArea}
          setYear={this.props.setYear}
        />
        <Footer goTo={this.props.goTo} />
      </div>
    );
  }

}

export default MapPage;
