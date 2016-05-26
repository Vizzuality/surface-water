'use strict';

import React, {Component} from 'react';
import { Message } from '../containers';

import styles from '../../styles/components/search-modal.scss';

class SearchModal extends Component {

  onKeyPress(e) {
    if(e.charCode === 13) {
      this.search(e.target.value);
    }
  }

  search(str) {
    if(str.length) this.props.search(str.trim());
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
          Where would you like to explore?
          { this.props.error && <Message type="error" classes={[ styles.message ]}>{this.props.error}</Message> }
          <div className={styles['input-container']}>
            <input type="text" placeholder="E.g.: Address, city, country…" onKeyPress={this.onKeyPress.bind(this)} ref="input" />
            <svg title="Search" onClick={() => this.search(this.refs.input.value)}>
              <use xlinkHref="#searchIcon" x="0" y="0" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

}

export default SearchModal;
