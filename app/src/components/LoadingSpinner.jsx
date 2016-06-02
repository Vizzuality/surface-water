'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/loading-spinner.scss';

class LoadingSpinner extends Component {

  render() {
    return (
      <div className={styles.overlay}>
        <div className={styles.spinner}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

}

export default LoadingSpinner;
