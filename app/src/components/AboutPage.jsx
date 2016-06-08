'use strict';

import React, {Component} from 'react';
import { generateContactEmail } from '../helpers/utils';
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

          <div className={styles.intro}>
            <p>
              <a href="http://earthgenome.org">The Earth Genome&#39;s</a> mission is to provide environmental information that <b>changes decisions</b>. This project, alone, <i>will not</i> change decisions. More information must be blended in order to provide material insights to a specific decision maker -- groundwater levels, well locations, agricultural patterns. The data embodied in this surface water project is meant to be a component of a decision support tool.
            </p>
            <p>
              Another Earth Genome project, <a href="http://gist.earthgenome.org">GIST</a>, is a fully formed decision support tool -- one that assembles multiple data sets into a compact, actionable number. The web app makes it easy to assess the value of wetland restoration in Texas. Surface water is a component of the final product.
            </p>
            <p>
              The web application is meant to demonstrate the value of easy access and intuitive design for environmental information. The frontend was built by Vizzuality and the backend was built by The Earth Genome. We communicated only by <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">RESTful web APIs</a>, so that any third-party app developer can also easily use the data. It’s insane that a web developer could easily and programmatically access Justin Bieber’s latest tweet, but could not access the extent of surface water or the intensity of deforestation with the same ease -- until now.
            </p>
          </div>

          <h2>Where does the data come from?</h2>

          <p>
            The surface water extent is constructed on the fly for the supplied area, using Landsat 7 annual composite imagery. The service is available globally at 30-meter resolution from 1999 through 2012. More specifically, the coverage percentage is calculated at 30-meter resolution but the polygon extent has been resampled to 200-meter resolution for web performance. The detection algorithm is adapted from <a href="http://www.sciencedirect.com/science/article/pii/S0034425713002873">a peer-reviewed publication</a> in Remote Sensing of the Environment. The algorithm has its limitations for certain regions. If you are interested in a more in-depth, customized data set, please <a href={`mailto:${generateContactEmail()}`}>contact us</a>.
          </p>

          <p>
            The basemap highlights the static extent of water in blue. These boundaries represent the water bodies that you would see in Google or Apple Maps. They don’t change. Water is fluid and changes constantly. This project shows the dynamic extent of water, tracking surface water as it changes with climate, human, and weather forces.
          </p>

          <h2>How do I use the site?</h2>

          <p>
            Navigate to an area of interest. Draw a bounding box. Wait for a few seconds. The average extent of water in 2012 will appear in dark blue. The annual percentage of water will appear as a time series graph below, from 1999-2012. Click the arrows or the years below the time series to cycle through the years.
          </p>

          <h2>And then what?</h2>

          <p>
            This web app is just the beginning. You can either use the APIs for your own application, generate a dataset for a given set of administrative boundaries, or build a custom instance of the web app with increased spatial resolution and temporal frequency. If you are interested in any of these services, please <a href={`mailto:${generateContactEmail()}`}>contact us</a>.
          </p>

          <Button color="primary" text="uppercase" classes={[ styles.button ]} click={this.goBack.bind(this)}>Explore the map</Button>
        </div>
      </div>
    );
  }

}

export default AboutPage;
