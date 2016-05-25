'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/button.scss';

class Button extends Component {

  render() {
    let classes = [ styles.button ];

    if(this.props.fixed) classes.push(styles['-fixed']);
    if(this.props.color === 'primary') classes.push(styles['-highlighted']);
    if(this.props.color === 'white') classes.push(styles['-white']);
    if(this.props.text === 'uppercase') classes.push(styles['-uppercase']);
    if(this.props.classes && this.props.classes.length) classes = classes.concat(this.props.classes);

    return <div className={classes.join(' ')} onClick={this.props.click}>{this.props.children}</div>;
  }

}

Button.propTypes = {
  /**
   * Define if the width of the button is fixed or not
   * Default: false
   */
  fixed:   React.PropTypes.bool,
  /**
   * Define the background color of the button
   * Values: "white", "primary" or "secondary"
   * Default: "secondary"
   */
  color:   React.PropTypes.string,
  /**
   * Define the styling of the text
   * Values: "uppercase" or "normal"
   * Default: "normal"
   */
  text:    React.PropTypes.string,
  /**
   * Define the additional classes to attach
   */
  classes: React.PropTypes.array,
  /**
   * Define click handler
   */
  click:   React.PropTypes.func
};

export default Button;
