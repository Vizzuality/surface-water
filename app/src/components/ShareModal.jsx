'use strict';

import React, {Component} from 'react';
import { Message, Button } from '../containers';

import styles from '../../styles/components/share-modal.scss';

class ShareModal extends Component {

  constructor() {
    super();
    this.state = {};
  }

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

  onClickCopy() {
    this.refs.input.select();
    let error = false;
    try {
      if(!document.execCommand('copy')) error = true;
    } catch(err) {
      error = true;
    }

    this.setState({
      error: error && 'Sorry, the link couldn\'t be copied. Please click on it and copy it manually.',
      copied: !error
    });

    if(!error) setTimeout(() => this.setState({ copied: false }), 1000);
  }

  render() {
    let buttonContent = 'Copy';
    if(this.state.copied) {
      buttonContent = <svg className={styles.icon}><use xlinkHref="#checkIcon" x="0" y="0" /></svg>;
    }

    return (
      <div className={styles.overlay}  onClick={this.onClickOverlay.bind(this)}>
        <div className={styles.modal}>
          <svg className={styles['close-button']} title="Close this modal" onClick={() => this.props.close()}>
            <use xlinkHref="#closeIcon" x="0" y="0" />
          </svg>
          <h1>Share this map</h1>
          Copy the link to share this website
          { this.state.error && <Message type="error" classes={[ styles.message ]}>{this.state.error}</Message> }
          <div className={styles['input-container']}>
            <input type="text" value={location.href} ref="input" readOnly={true} onClick={() => this.refs.input.select()} />
            <Button fixed={true} color="primary" text="uppercase" click={this.onClickCopy.bind(this)} classes={[ styles.button ]}>{buttonContent}</Button>
          </div>
          <ul className={styles['media']}>
            <li>Share on</li>
            <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`} target="_blank" rel="noreferrer"><svg className={styles.icon}><use xlinkHref="#fbIcon" x="0" y="0" /></svg></a></li>
            <li><a href={`https://twitter.com/home?status=${encodeURIComponent(`Water detection: ${location.href}`)}`} target="_blank" rel="noreferrer"><svg className={styles.icon}><use xlinkHref="#twitterIcon" x="0" y="0" /></svg></a></li>
          </ul>
        </div>
      </div>
    );
  }

}

export default ShareModal;
