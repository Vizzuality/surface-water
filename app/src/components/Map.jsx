'use strict';

import React, {Component} from 'react';
import L from 'leaflet';
import leafletDraw from 'leaflet-draw';
import 'leaflet.sync';
import { formatPercentage } from '../helpers/utils';

import { MapSearchControl } from '../containers';

import styles from '../../styles/components/map.scss';
import stylesPopup from '../../styles/components/map-popup.scss';

const rectangleStyles = {
  color: '#f1d500',
  weight: 2,
  opacity: 1,
  fill: false
};

const waterStyles = {
  color: '#004d6b',
  weight: 1,
  opacity: 1,
  fillColor: '#009fdd',
  fillOpacity: 1,
  clickable: false
};

const noDataError = 'It seems there\'s no data for the selected area.';

class Map extends Component {

  componentDidMount() {
    this.initBasemaps();
    this.initMap();
    this.initMinimap();
    this.setMapListeners();
    this.initDrawer();
  }

  componentDidUpdate(previousProps) {
    if(this.props.mode !== previousProps.mode) {
      switch(this.props.mode) {
        case 'drawing':
          this.drawing.enable();
          break;

        case 'editing':
          this.editing.enable();
          this.hidePopup();
          this.deleteWaterGeos();
          break;

        default:
          previousProps.mode === 'drawing' && this.drawing.disable();
          previousProps.mode === 'editing' && this.editing.disable();
      }
    }

    if(this.props.action !== previousProps.action) {
      switch(this.props.action) {
        case 'save':
          this.applyEditing();
          break;

        case 'cancel':
          this.undoEditing();
          break;
      }
      this.props.setAction(null);
    }

    if(previousProps.selectedArea && !this.props.selectedArea) {
      this.deleteDrawing();
      this.deleteWaterGeos();
    }

    if((!previousProps.data || !previousProps.data.geos ||
      !previousProps.data.yearlyPercentage) && this.props.data.geos &&
      this.props.data.yearlyPercentage) {
      this.renderWaterGeos();
    }

    if(!previousProps.mapBoundingBox && this.props.mapBoundingBox) {
      this.map.fitBounds([
        [ this.props.mapBoundingBox[0], this.props.mapBoundingBox[2] ],
        [ this.props.mapBoundingBox[1], this.props.mapBoundingBox[3] ]
      ], { animate: true });
      /* The map doesn't trigger a dragend event when using fitBounds */
      this.props.setLatLng(this.map.getCenter())
      this.props.resetBoundingBox();
    }
  }

  initBasemaps() {
    this.terrainBasemapMap = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}${window.devicePixelRatio >= 2 ? '@2x' : ''}.png?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mst-trail.812c1ba5',
      accessToken: 'pk.eyJ1IjoibXN0LXRyYWlsIiwiYSI6ImNpb3ZhYW83dzAwNjV3OWtqY2psb2tmY28ifQ.M9Apjn7kvtfpMwbSf9kNYA',
      noWrap: true,
      minZoom: 2
    });

    this.satelliteBasemapMap = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}${window.devicePixelRatio >= 2 ? '@2x' : ''}.png?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mstg.e176fba3',
      accessToken: 'pk.eyJ1IjoibXN0ZyIsImEiOiJjaWs4ajl2N2MwMDF3d2JsdzNrYmc3bm1wIn0.sD0TMuradtGVcjaPuwZOwA',
      noWrap: true,
      minZoom: 2
    });

    this.terrainBasemapMinimap = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}${window.devicePixelRatio >= 2 ? '@2x' : ''}.png?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mst-trail.812c1ba5',
      accessToken: 'pk.eyJ1IjoibXN0LXRyYWlsIiwiYSI6ImNpb3ZhYW83dzAwNjV3OWtqY2psb2tmY28ifQ.M9Apjn7kvtfpMwbSf9kNYA',
      noWrap: true,
      minZoom: 2
    });

    this.satelliteBasemapMinimap = L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}${window.devicePixelRatio >= 2 ? '@2x' : ''}.png?access_token={accessToken}`, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mstg.e176fba3',
      accessToken: 'pk.eyJ1IjoibXN0ZyIsImEiOiJjaWs4ajl2N2MwMDF3d2JsdzNrYmc3bm1wIn0.sD0TMuradtGVcjaPuwZOwA',
      noWrap: true,
      minZoom: 2
    });
  }

  initMap() {
    this.map = L.map(this.refs.map, {
      zoom: this.props.zoom,
      center: this.props.latLng,
      zoomControl: false
    });

    L.control.zoom({ position: 'topright' }).addTo(this.map);

    this.map.addLayer(this[`${this.props.basemap}BasemapMap`]);

    this.popup = L.popup({
      closeButton: false,
      closeOnClick: false,
      className: stylesPopup['map-popup'],
      minWidth: 300,
      maxWidth: 300
    });

    this.waterLayer =  L.geoJson().addTo(this.map);
  }

  initMinimap() {
    this.positionMinimap();

    this.minimap = L.map(this.refs.minimap, {
      zoom: this.props.zoom,
      center: this.props.latLng,
      zoomControl: false
    });

    this.disableInteraction(this.minimap);

    this.minimap.addLayer(this[`${this.props.basemap === 'terrain' ? 'satellite' : 'terrain'}BasemapMinimap`]);

    /* We sync the two maps */
    this.map.sync(this.minimap);
  }

  setMapListeners() {
    this.map.on('dragend', () => this.props.setLatLng(this.map.getCenter()));
    this.map.on('zoomend', () => {
      this.props.setZoom(this.map.getZoom());
      /* Zooming can move the center of the map */
      this.props.setLatLng(this.map.getCenter());
    });
    this.map.on('draw:created', e => this.saveRectangle(e.layer));
  }

  /**
   * Compute and set the position to the minimap
   */
  positionMinimap() {
    const body = document.body.getBoundingClientRect();
    const minimap = this.refs.minimap;
    const scale = 70 / body.width;

    minimap.style.transform = `scale(${scale}) translate(${-70 / scale}px, ${-60 / scale}px)`;
    minimap.style.border = `${2 / scale}px solid #23d0ec`;
  }

  switchLayers() {
    const newBasemap = this.props.basemap === 'terrain' ? 'satellite' : 'terrain';

    this.props.setBasemap(newBasemap);

    this.map.removeLayer(this[`${this.props.basemap}BasemapMap`]);
    this.map.addLayer(this[`${newBasemap}BasemapMap`]);

    this.minimap.removeLayer(this[`${newBasemap}BasemapMinimap`]);
    this.minimap.addLayer(this[`${this.props.basemap}BasemapMinimap`]);
  }

  /**
   * Disable all the interaction a map
   * @param  {Leaflet map} map
   */
  disableInteraction(map) {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
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
   * Create and add a rectangle to the drawing layer and fetch the data
   * @param  {[type]} rectangleBounds [southWest.lat, southWest.lng,
   *   northEast.lat, northEast.lng]
   */
  createRectangle(rectangleBounds) {
    this.rectangleBounds = rectangleBounds;

    const southWest = rectangleBounds.slice(0, 2);
    const northEast = rectangleBounds.slice(2, 4);

    new L.Rectangle(new L.LatLngBounds(southWest, northEast), rectangleStyles)
      .addTo(this.drawnLayer);

    this.props.fetchData(this.rectangleBounds);
  }

  /**
   * Delete the rectangle present in the drawing layer and remove the popup from
   * the map
   */
  deleteDrawing() {
    this.drawnLayer.clearLayers();
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
   * URL, unset the mode and fetch the data
   * @param  {L.Rectangle} rectangle
   */
  saveRectangle(rectangle) {
    this.rectangleBounds = this.getRectangleBounds(rectangle);
    this.drawnLayer.addLayer(rectangle);
    this.props.setSelectedArea(this.rectangleBounds);
    this.props.setMode(null);
    this.props.fetchData(this.rectangleBounds);
  }

  /**
   * Add the bounds of the rectangle present in the drawing layer into the URL,
   * unset the mode and fetch the data
   */
  applyEditing() {
    /* There's only one layer: the rectangle */
    let rectangle;
    this.drawnLayer.eachLayer(l => rectangle = l);

    this.rectangleBounds = this.getRectangleBounds(rectangle);
    this.props.setSelectedArea(this.rectangleBounds);
    this.props.setMode(null);

    this.props.fetchData(this.rectangleBounds);
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
   * @param  {String} content   html inside the popup
   * @param  {String} className optional class name to add to the popup
   */
  showPopup(content, className) {
    this.popup
      .setLatLng([ this.rectangleBounds[0], (this.rectangleBounds[1] + this.rectangleBounds[3]) / 2 ])
      .setContent(content)
      .openOn(this.map);

    /* We update the additional class of the popup */
    if(this.popupAdditionalClass) {
      this.popup._container.classList.remove(this.popupAdditionalClass);
      this.popupAdditionalClass = null;
    }
    if(className) {
      this.popupAdditionalClass = className;
      this.popup._container.classList.add(className);
    }
  }

  /**
   * Remove the popup from the map
   */
  hidePopup() {
    this.map.removeLayer(this.popup);
  }

  /**
   * Generate the content (HTML) of the popup depending on the data
   * @param  {Object} yearlyPercentages the list of percentages for the
   *                                    selected area
   * @return {String}                   HTML content
   */
  getPopupContent(yearlyPercentage) {
    const percentage = yearlyPercentage
      .filter(o => o.year === this.props.year)[0]
      .percentage;

    return `
      <div class="${stylesPopup.number}">
        ${formatPercentage(percentage)}
      </div>
      Of the selected area is covered in water
    `;
  }

  /**
   * Remove the previous water geometries and render the new
   */
  renderWaterGeos() {
    this.deleteWaterGeos();

    this.props.data.geos.forEach(geo => this.waterLayer.addData(geo));
    this.waterLayer.setStyle(waterStyles);

    /* We check whether the percentage is always 0 */
    let noData = true;
    for(let i = 0, j = this.props.data.yearlyPercentage.length; i < j; i++) {
      if(this.props.data.yearlyPercentage[i].percentage > 0) {
        noData = false;
        break;
      }
    }

    if(noData) {
      this.showPopup(noDataError, stylesPopup['-error']);
    } else {
      this.showPopup(this.getPopupContent(this.props.data.yearlyPercentage));
    }

    /* NOTE: we move the rectangle on top of the geometries
     * this.drawnLayer only contains one layer (the rectangle )*/
    this.drawnLayer.eachLayer(l => l.bringToFront());
  }

  /**
   * Remove the water geometries of the map
   */
  deleteWaterGeos() {
    this.waterLayer.clearLayers();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.map} ref="map">
          <MapSearchControl/>
        </div>
        <div className={styles.minimap} ref="minimap" onClick={this.switchLayers.bind(this)}>
        </div>
      </div>
    );
  }

}

export default Map;
