'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/modal.scss';

class Modal extends Component {

  componentDidMount() {
    this.onKeyPress = e => {
      if(e.keyCode === 27) {
        this.props.close();
        e.preventDefault();
      }
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
          { this.props.children }
        </div>
      </div>
    );
  }

}

Modal.propTypes = {
  /**
   * The callback method when closing the modal
   */
  close:   React.PropTypes.func.isRequired
};


export default Modal;
