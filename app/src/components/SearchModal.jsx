'use strict';

import React, {Component} from 'react';
import { Modal, Message } from '../containers';

import styles from '../../styles/components/search-modal.scss';

class SearchModal extends Component {

  componentDidMount() {
    this.refs.input.focus();
  }

  onKeyPress(e) {
    e.charCode === 13 && this.search(e.target.value);
  }

  search(str) {
    if(str.length) this.props.search(str.trim());
  }

  render() {
    return (
      <Modal close={this.props.close}>
        <div className={styles.content}>
          <h1>Where would you like to explore?</h1>
          { this.props.error && <Message type="error" classes={[ styles.message ]}>{this.props.error}</Message> }
          <div className={styles['input-container']}>
            <input type="text" placeholder="E.g.: Address, city, country…" onKeyPress={this.onKeyPress.bind(this)} ref="input" />
            <svg title="Search" onClick={() => this.search(this.refs.input.value)}>
              <use xlinkHref="#searchIcon" x="0" y="0" />
            </svg>
          </div>
        </div>
      </Modal>
    );
  }

}

export default SearchModal;
