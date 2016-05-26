'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/message.scss';

class Message extends Component {

  render() {
    const classes = [ styles['message'] ].concat(this.props.classes || []);
    if(this.props.type === 'error') classes.push(styles['-error']);

    const check = <svg className={styles.icon}>
        <use xlinkHref="#checkIcon" x="0" y="0" />
      </svg>;

    return (
      <div className={ classes.join(' ') }>
        {(!this.props.type || this.props.type !== 'error') && check}
        {this.props.children}
      </div>
    );
  }

}

Message.propTypes = {
  /**
   * Define the type of message
   * Values: "info" or "error"
   * Default: "info"
   */
  type: React.PropTypes.string,
  /**
   * Define the additional classes to attach
   */
  classes: React.PropTypes.array
};

export default Message;
