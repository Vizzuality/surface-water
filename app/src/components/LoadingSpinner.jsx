'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/loading-spinner.scss';

class LoadingSpinner extends Component {

  render() {
    return <div className={styles.spinner}>
      <div className={styles.cube1}></div>
      <div className={styles.cube2}></div>
    </div>;
  }

}

export default LoadingSpinner;
