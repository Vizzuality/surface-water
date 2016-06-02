'use strict';

import React, {Component} from 'react';
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group';

class App extends Component {

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="about-page"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          {
            React.cloneElement(this.props.children, {
              key: this.props.location.pathname.split('/')[1]
            })
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default App;
