'use strict';

import React, {Component} from 'react';
import { Button } from '../containers';

import styles from '../../styles/components/splash-modal.scss';

class SplashModal extends Component {

  componentDidMount() {
    this.onKeyPress = e => {
      e.preventDefault();
      e.keyCode === 27 && this.props.close();
    }
    document.addEventListener('keypress', this.onKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onKeyPress);
  }

  onClickOverlay(e) {
    if(e.target === e.currentTarget) this.props.close();
  }

  render() {
    return (
      <div className={styles.overlay}  onClick={this.onClickOverlay.bind(this)}>
        <div className={styles.modal}>
          <svg className={styles['close-button']} title="Close this modal" onClick={() => this.props.close()}>
            <use xlinkHref="#closeIcon" x="0" y="0" />
          </svg>
          <h1>Water Detection from NASA Landsat data</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus ex interdum nulla feugiat vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <Button color="primary" text="uppercase" click={() => this.props.close()}>Explore the map</Button>
        </div>
      </div>
    );
  }

}

export default SplashModal;
