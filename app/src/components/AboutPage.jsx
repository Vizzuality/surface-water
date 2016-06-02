'use strict';

import React, {Component} from 'react';
import { Link } from 'react-router';
import { Button } from '../containers';

import logo from '../../assets/logo2x.png';
import styles from '../../styles/components/about-page.scss';

class AboutPage extends Component {

  scrollTop() {
    return new Promise((resolve, reject) => {
      let position = window.scrollY;
      const duration = 150;
      /* We assume 60 FPS, but the duration can vary depending on the actual
       * performance */
      const steps = Math.round(duration / 16.67);
      const delta = position / steps;
      const scroll = () => {
        const newPosition = position - delta > 0 ? position - delta : 0;
        scrollTo(0, newPosition);
        position = newPosition;
        if(position > 0) requestAnimationFrame(scroll);
        else resolve();
      };
      requestAnimationFrame(scroll);
    });
  }

  goBack() {
    this.scrollTop().then(() => {
      if(this.props.history) return this.props.goBack();
      this.props.goTo('/');
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <a href={`${location.origin}${location.pathname}`}>
          <img src={logo} alt="The Earth Genome" className={styles.logo} />
        </a>
        <svg className={styles['close-button']} onClick={this.goBack.bind(this)}><use xlinkHref="#closeIcon" x="0" y="0" /></svg>
        <div className={styles.content}>
          <h1>About this project</h1>
          <p className={styles.intro}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus ex interdum nulla feugiat vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
          <h2>What does the data means?</h2>
          <p>Mauris rutrum augue et velit facilisis faucibus quis nec mi. Aenean placerat, dui ut pulvinar lobortis, ligula nulla finibus orci, ut molestie sapien eros sed nisi. Nunc sollicitudin nunc non justo lobortis mattis. Aenean at ullamcorper neque. Nullam velit diam, consequat sed arcu sed, varius molestie dolor.<br/>Donec vel elementum odio. Nulla a nibh quis turpis elementum finibus id non eros. Curabitur porttitor, odio eu mollis porta, nulla sem congue sapien, vestibulum blandit augue sem id mi. Proin congue fringilla est id efficitur. Maecenas pulvinar facilisis ante, vitae congue nulla semper ac. Mauris dapibus mollis odio a facilisis. Proin dapibus metus in risus egestas hendrerit. Praesent egestas ipsum elit, ac accumsan lectus consequat sit amet. Donec facilisis sem quis mauris dapibus, ut imperdiet massa porta.</p>
          <h2>Why is this important?</h2>
          <p>Vestibulum ultrices odio quis magna aliquet imperdiet. Phasellus suscipit non augue quis condimentum. Suspendisse quis massa in odio maximus faucibus bibendum non felis. Integer congue libero at odio placerat molestie. In porttitor purus sapien, ac viverra nunc venenatis eget.<br/>Aenean ullamcorper semper nunc ac consectetur. Nulla ornare gravida nibh, in feugiat lacus sagittis quis. Nunc interdum facilisis nibh, eget tristique eros tempor quis. Donec at nibh nec arcu facilisis imperdiet ut sed leo. Pellentesque aliquam massa sit amet tortor auctor sollicitudin. Morbi in justo et leo varius tincidunt. Curabitur convallis libero ut nisi convallis egestas. Curabitur ornare porta erat at pulvinar. Proin consectetur, tortor nec hendrerit dictum, magna orci ultrices ipsum, quis aliquet turpis enim id velit. Vivamus condimentum vitae erat sed faucibus. In molestie, purus quis ornare blandit, dui purus ultrices tortor, quis maximus ligula augue ac turpis. Proin venenatis faucibus justo nec volutpat. Nunc efficitur dolor quis massa tempus rhoncus.</p>
            <Button color="primary" text="uppercase" classes={[ styles.button ]} click={this.goBack.bind(this)}>Explore the map</Button>
        </div>
      </div>
    );
  }

}

export default AboutPage;
