'use strict';

import React, {Component} from 'react';
import { Modal, Button } from '../containers';

import styles from '../../styles/components/error-modal.scss';

class ErrorModal extends Component {

  render() {
    return (
      <Modal close={this.props.close} background="bright" closeButton={false} size="small">
        <div className={styles.content}>
          <h1 className={styles.title}>We are sorry</h1>
          <div>{this.props.text}</div>
          <Button classes={[ styles.button ]} color="white" text="uppercase" click={() => this.props.close()}>Ok</Button>
        </div>
      </Modal>
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
