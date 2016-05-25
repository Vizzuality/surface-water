'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/footer.scss';

class Footer extends Component {

  render() {
    return (
      <div className={styles.footer}>
        <ul className={styles.menu}>
          <li className={styles['menu-item'] + ' ' + styles['menu-item-highlight']}>Know more</li>
          <li className={styles['menu-item']}>Contact</li>
          <li className={styles['menu-item']}>A data visualisation by <img/></li>
        </ul>
        <img className={styles.share} />
      </div>
    );
  }

}

export default Footer;
