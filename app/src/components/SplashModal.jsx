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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus ex interdum nulla feugiat vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <Button color="primary" text="uppercase" click={() => this.props.close()}>Explore the map</Button>
        </div>
      </Modal>
    );
  }

}

export default SplashModal;
