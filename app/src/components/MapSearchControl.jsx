'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/map-search-control.scss';

class MapSearchControl extends Component {

  render() {
    return (
      <div className={styles.control} title="Search an area" onClick={ () => this.props.openSearch() }>
        <svg><use xlinkHref="#searchIcon" x="0" y="0" /></svg>
      </div>
    );
  }

}

export default MapSearchControl;
