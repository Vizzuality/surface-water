'use strict';

import React, {Component} from 'react';
import {Button} from '../containers';

import styles from '../../styles/components/dashboard.scss';

class Dashboard extends Component {


  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.intro}>
          <Button classes={[ styles['intro-button'] ]} color="primary" click={() => this.props.setMode('drawing')}><img/></Button>
          <p className={styles['intro-text']}>Draw a bounding box to start</p>
        </div>
      </div>
    );
  }

}

export default Dashboard;
