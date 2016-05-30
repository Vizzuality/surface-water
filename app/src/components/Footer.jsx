'use strict';

import React, {Component} from 'react';

import styles from '../../styles/components/footer.scss';

/* We use rot13 to avoid bots spamming the email */
const contactEmail = 'qna@rnegutrabzr.bet';

class Footer extends Component {

  decodeRot13(str) {
    return str.replace(/[a-zA-Z]/g, c => {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }

  render() {
    return (
      <div className={styles.footer}>
        <ul className={styles.menu}>
          <li className={styles['menu-item'] + ' ' + styles['menu-item-highlight']}>Know more</li>
          <li className={styles['menu-item']}><a href={`mailto:${this.decodeRot13(contactEmail)}`}>Contact</a></li>
          <li className={styles['menu-item']}>A data visualisation by <a href="http://www.vizzuality.com" target="_blank" rel="noreferrer"><svg className={styles['vizzuality-logo']}><use xlinkHref="#vizzualityIcon" x="0" y="0" /></svg></a></li>
        </ul>
        <img className={styles.share} />
      </div>
    );
  }

}

export default Footer;
