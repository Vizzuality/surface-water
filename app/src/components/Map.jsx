'use strict';

import React, {Component} from 'react';
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

import styles from '../../styles/components/map.scss';

class Map extends Component {

  componentDidMount() {
    this.initMap();
    this.initDrawer();
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.mode !== nextProps.mode) {
      switch(nextProps.mode) {
        case 'drawing':
          this.drawing.enable();
          break;

        default:
          this.drawing.disable();
      }
    }
  }

  initMap() {
    this.map = L.map(this.refs.map, {
      zoom: this.props.zoom,
      center: this.props.latLng
    });

    L.tileLayer(`http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}${window.devicePixelRatio >= 2 ? '@2x' : ''}.png`, {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
      noWrap: true,
      minZoom: 2
    }).addTo(this.map);

    this.setMapListeners();
  }

  setMapListeners() {
    this.map.on('dragend', () => this.props.setLatLng(this.map.getCenter()));
    this.map.on('zoomend', () => this.props.setZoom(this.map.getZoom()));
    this.map.on('draw:created', e => this.saveDrawing(e.layer));
  }

  initDrawer() {
    this.drawnLayer = new L.FeatureGroup()
      .addTo(this.map);

    /* If the URL already contains an area, we paint it */
    if(this.props.selectedArea) {
      const southWest = this.props.selectedArea.slice(0, 2);
      const northEast = this.props.selectedArea.slice(2, 4);

      new L.Rectangle(new L.LatLngBounds(southWest, northEast))
        .addTo(this.drawnLayer);
    }

    /* We init the Leaflet Draw plugin */
    new L.Control.Draw({
      edit: {
        featureGroup: this.drawnLayer
      }
    });

    this.drawing = new L.Draw.Rectangle(this.map);
    this.editing = new L.EditToolbar.Edit(this.map, {featureGroup:this.drawnLayer});
  }

  saveDrawing(geo) {
    this.drawnLayer.addLayer(geo);

    const southWest = geo.getBounds().getSouthWest();
    const northEast = geo.getBounds().getNorthEast();

    const selectedArea = Object.keys(southWest).map(k => southWest[k])
      .concat(Object.keys(northEast).map(k => northEast[k]));

    this.props.setSelectedArea(selectedArea);
    this.props.setMode(null);
  }

  render() {
    return <div className={styles.map} ref="map"></div>;
  }

}

export default Map;
