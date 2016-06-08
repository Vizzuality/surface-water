'use strict';

import React, {Component} from 'react';
import { Modal, Button } from '../containers';

import styles from '../../styles/components/splash-modal.scss';

class SplashModal extends Component {

  render() {
    return (
      <Modal close={this.props.close}>
        <div className={styles.content}>
          <h1>Water Detection from NASA Landsat data</h1>
          <p>
          
            This tool measures the extent of global surface water at 30-meter resolution, annually from 1999-2012.  If you are interested in real-time water monitoring, please contact us!
          
          </p>
          <Button color="primary" text="uppercase" click={() => this.props.close()}>Explore the map</Button>
        </div>
      </Modal>
    );
  }

}

export default SplashModal;
