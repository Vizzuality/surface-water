'use strict';

import React, {Component} from 'react';
import {Map, Dashboard, Footer, LoadingSpinner, ErrorModal, SearchModal } from '../containers';

import logo from '../../assets/logo2x_negative.png';
import styles from '../../styles/components/map-page.scss';

class MapPage extends Component {

  render() {
    return (
      <div>
        <a href={`${location.origin}${location.pathname}`}>
          <img src={logo} alt="The Earth Genome" className={styles.logo} />
        </a>
        { this.props.loading && <LoadingSpinner/> }
        { this.props.error && <ErrorModal text={this.props.error} /> }
        { this.props.searchModal && <SearchModal /> }
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
