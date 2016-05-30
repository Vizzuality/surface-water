'use strict';

import React, {Component} from 'react';
import Button from '../containers/button';

import styles from '../../styles/components/error-modal.scss';

class ErrorModal extends Component {

  onClickOverlay(e) {
    if(e.target === e.currentTarget) this.props.close();
  }

  render() {
    return (
      <div className={styles.overlay}  onClick={this.onClickOverlay.bind(this)}>
        <div className={styles.modal}>
          <h1 className={styles.title}>We are sorry</h1>
          <div>{this.props.text}</div>
          <Button classes={[ styles.button ]} color="white" text="uppercase" click={() => this.props.close()}>Ok</Button>
        </div>
      </div>
    );
  }

}

ErrorModal.propTypes = {
  /**
   * Define if the text content of the modal
   * Required
   */
  text:   React.PropTypes.string.isRequired,
};

export default ErrorModal;
