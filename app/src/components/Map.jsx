'use strict';

import React, {Component} from 'react';
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';

import styles from '../../styles/components/map.scss';
import stylesPopup from '../../styles/components/map-popup.scss';

const rectangleStyles = {
  color: '#f1d500',
  weight: 2,
  opacity: 1,
  fill: false
};

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

        case 'editing':
          this.editing.enable();
          this.hidePopup();
          break;

        default:
          this.props.mode === 'drawing' && this.drawing.disable();
          this.props.mode === 'editing' && this.editing.disable();
      }
    }

    if(this.props.action !== nextProps.action) {
      switch(nextProps.action) {
        case 'save':
          this.applyEditing();
          break;

        case 'cancel':
          this.undoEditing();
          break;
      }
      this.props.setAction(null);
    }

    if(this.props.selectedArea && !nextProps.selectedArea) {
      this.deleteDrawing();
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

    this.popup = L.popup({
      closeButton: false,
      closeOnClick: false,
      className: stylesPopup['map-popup'],
      minWidth: 300,
      maxWidth: 300
    });

    this.setMapListeners();
  }

  setMapListeners() {
    this.map.on('dragend', () => this.props.setLatLng(this.map.getCenter()));
    this.map.on('zoomend', () => this.props.setZoom(this.map.getZoom()));
    this.map.on('draw:created', e => this.saveRectangle(e.layer));
  }

  initDrawer() {
    this.drawnLayer = new L.FeatureGroup()
      .addTo(this.map);

    /* If the URL already contains an area, we paint it */
    if(this.props.selectedArea) {
      this.createRectangle(this.props.selectedArea);
    }

    /* We init the Leaflet Draw plugin */
    new L.Control.Draw({
      edit: {
        featureGroup: this.drawnLayer
      }
    });

    this.drawing = new L.Draw.Rectangle(this.map, {
      shapeOptions: rectangleStyles
    });
    this.editing = new L.EditToolbar.Edit(this.map, {featureGroup:this.drawnLayer});
  }

  /**
   * Create and add a rectangle to the drawing layer
   * @param  {[type]} rectangleBounds [southWest.lat, southWest.lng,
   *   northEast.lat, northEast.lng]
   */
  createRectangle(rectangleBounds) {
    this.rectangleBounds = rectangleBounds;

    const southWest = rectangleBounds.slice(0, 2);
    const northEast = rectangleBounds.slice(2, 4);

    new L.Rectangle(new L.LatLngBounds(southWest, northEast), rectangleStyles)
      .addTo(this.drawnLayer);

    this.showPopup();
  }

  /**
   * Delete the rectangle present in the drawing layer and remove the popup from
   * the map
   */
  deleteDrawing() {
    /* There's only one layer: the rectangle */
    this.drawnLayer.eachLayer(layer => this.drawnLayer.removeLayer(layer));
    this.hidePopup();
  }

  /**
   * Return the bounds of the passed rectangle
   * @param  {L.Rectangle} rectangle
   * @return {Array}       bounds    [southWest.lat, southWest.lng,
   *   northEast.lat, northEast.lng]
   */
  getRectangleBounds(rectangle) {
    const southWest = rectangle.getBounds().getSouthWest();
    const northEast = rectangle.getBounds().getNorthEast();

    return Object.keys(southWest).map(k => southWest[k])
      .concat(Object.keys(northEast).map(k => northEast[k]));
  }

  /**
   * Add the passed rectangle to the drawing layer, add its bounds into the
   * URL and unset the mode
   * @param  {L.Rectangle} rectangle
   */
  saveRectangle(rectangle) {
    this.rectangleBounds = this.getRectangleBounds(rectangle);
    this.drawnLayer.addLayer(rectangle);
    this.props.setSelectedArea(this.rectangleBounds);
    this.props.setMode(null);
    this.showPopup();
  }

  /**
   * Add the bounds of the rectangle present in the drawing layer into the URL
   * and unset the mode
   */
  applyEditing() {
    /* There's only one layer: the rectangle */
    let rectangle;
    this.drawnLayer.eachLayer(l => rectangle = l);

    this.rectangleBounds = this.getRectangleBounds(rectangle);
    this.showPopup();
    this.props.setSelectedArea(this.rectangleBounds);
    this.props.setMode(null);
  }

  /**
   * Restore the previous rectangle in the drawing layer and unset the mode
   */
  undoEditing() {
    this.deleteDrawing();
    this.createRectangle(this.rectangleBounds);
    this.props.setMode(null);
  }

  /**
   * Add the popup at the bottom of the rectangle on the map
   */
  showPopup() {
    this.popup
      .setLatLng([ this.rectangleBounds[0], (this.rectangleBounds[1] + this.rectangleBounds[3]) / 2 ])
      .setContent('Rectangle')
      .openOn(this.map);
  }

  /**
   * Remove the popup from the map
   */
  hidePopup() {
    this.map.removeLayer(this.popup);
  }

  render() {
    return <div className={styles.map} ref="map"></div>;
  }

}

export default Map;
