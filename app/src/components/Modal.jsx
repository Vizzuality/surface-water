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
    let closeButton = (
      <svg className={styles['close-button']} title="Close this modal" onClick={() => this.props.close()}>
        <use xlinkHref="#closeIcon" x="0" y="0" />
      </svg>
    );
    if(this.props.closeButton === false) closeButton = '';

    return (
      <div className={styles.overlay}  onClick={this.onClickOverlay.bind(this)}>
        <div className={`${styles.modal} ${this.props.background === 'bright' ? styles['-bright'] : ''} ${this.props.size === 'small' ? styles['-small'] : ''}`}>
          { closeButton }
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
  close: React.PropTypes.func.isRequired,
  /**
   * Define whether the close button should be available
   * Values: true or false
   * Default: true
   */
  closeButton: React.PropTypes.bool,
  /**
   * Define the background color
   * Values: "dark", "bright"
   * Default: "dark"
   */
  background: React.PropTypes.string,
  /**
   * Define the size of the modal
   * Values: "normal" or "small"
   * Default: "normal"
   */
  size: React.PropTypes.string
};


export default Modal;
