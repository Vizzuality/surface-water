'use strict';

import React, {Component} from 'react';
import {Button} from '../containers';

import styles from '../../styles/components/dashboard.scss';

class Dashboard extends Component {

  onClickFirstButton() {
    if(this.props.mode === 'editing') {
      this.props.setAction('cancel');
      this.props.setMode(null);
    } else {
      this.props.setSelectedArea(null);
    }
  }

  onClickSecondButton() {
    if(this.props.mode === 'editing') {
      this.props.setAction('save');
      this.props.setMode(null);
    } else {
      this.props.setMode('editing');
    }
  }

  render() {
    const intro = <div className={styles.intro}>
        <Button classes={[ styles.button ]} color="primary" click={() => this.props.setMode('drawing')}>
          <svg className={styles.icon}><use xlinkHref="#drawIcon" x="0" y="0" title="Draw" /></svg>
        </Button>
        <p className={styles.text}>Draw a bounding box to start</p>
      </div>;

    const tools = <div className={styles.tools}>
        <Button
          classes={[ styles.button ]}
          click={this.onClickFirstButton.bind(this)}
        >
          Cancel
        </Button>
        <Button
          classes={[ styles.button ]}
          click={this.onClickSecondButton.bind(this)}
        >
          {this.props.mode === 'editing' ? 'Save' : 'Edit'}
        </Button>
      </div>;

    return (
      <div className={styles.dashboard}>
        {this.props.selectedArea ? tools : intro}
      </div>
    );
  }

}

export default Dashboard;
