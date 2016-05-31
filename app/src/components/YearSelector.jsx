'use strict';

import React, {Component} from 'react';
import { Button } from '../containers';
import { formatPercentage, debounce } from '../helpers/utils';
import d3 from 'd3';

import styles from '../../styles/components/year-selector.scss';

class YearSelector extends Component {

  componentDidMount() {
    this.renderChart();
    window.onresize = debounce(this.renderChart.bind(this), 100);
  }

  renderChart() {
    this.refs.svg.innerHTML = '';

    const containerBounds = this.refs.svg.getBoundingClientRect();
    const container = d3.select(this.refs.svg);
    const xScale = d3.scale.linear()
      .domain(d3.extent(this.props.data.map(o => o.year)))
      .range([ 60, containerBounds.width - 60 ]);
    const yScale = d3.scale.linear()
      .domain(d3.extent(this.props.data.map(o => o.percentage)))
      .range([ containerBounds.height - 37, 10 ]);
    /* If the width of the container is lower than 550px, we only display half
     * of the ticks */
    const displayedTicks = this.props.data
      .filter((v, i) => containerBounds.width <= 550 ? (i % 2) : true);
    const xAxis = d3.svg.axis()
      .scale(xScale)
      .tickSize(0)
      .tickValues(displayedTicks.map(o => o.year))
      .tickFormat(d3.format('d'));
    const line = d3.svg.line()
      .interpolate('linear')
      .x(d => xScale(d.year))
      .y(d => yScale(d.percentage));

    container.datum(this.props.data);

    const d3Axis = container.append('g')
      .attr('class', styles.axis)
      .attr('transform', `translate(0, ${containerBounds.height - 25})`);

    /* We want the line to be the whole width so we add a line behind the
     * axis */
    d3Axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', containerBounds.width)
      .attr('y2', 0);

    d3Axis.call(xAxis);

    d3Axis.selectAll('circle')
      .data(displayedTicks)
      .enter()
      .append('circle')
      .attr('class', d => d.year === this.props.year ? styles['-active'] : '')
      .attr('r', 5)
      .attr('cx', d => xScale(d.year))
      .attr('cy', 0);

    const d3Graph = container.append('g')
      .attr('class', styles.graph);

    d3Graph.append('path')
      .attr('d', line);

    /* We append an invisible rectangle to handle the interaction on the graph
     * and to display the correct cursor */
    let focusedYear = null;
    const interactionContainer = d3Graph.append('rect')
      .attr('x', xScale(xScale.domain()[0]))
      .attr('y', yScale(yScale.domain()[1]))
      .attr('width', xScale(xScale.domain()[1]) - xScale(xScale.domain()[0]))
      .attr('height', yScale(yScale.domain()[0]) - yScale(yScale.domain()[1]) + 7)
      .on('mousemove', () => {
        const mouse = d3.mouse(interactionContainer[0][0]);
        const bisector = d3.bisector(d =>  d.year).left;
        const year = xScale.invert(mouse[0]);
        const left = this.props.data[bisector(this.props.data, year) - 1];
        const right = this.props.data[bisector(this.props.data, year)];
        const d = year - left.year < right.year - year ? left : right;

        /* Optimization to reduce the number of calculations */
        if(focusedYear === d.year && this.isPopupVisible()) return;
        focusedYear = d.year;

        const focusCircle = d3Graph.selectAll('circle')
          .data([ d ], d => d.year);

        focusCircle
          .enter()
          .insert('svg:circle', 'rect')
          .attr('class', styles['focus-circle'])
          .attr('r', 3)
          .attr('cx', d => xScale(d.year))
          .attr('cy', d => yScale(d.percentage));

        focusCircle
          .exit()
          .remove();

        const focusCirclePos = focusCircle[0][0].getBoundingClientRect();
        this.showPopup([focusCirclePos.left + 3, focusCirclePos.top], d);
      })
      .on('mouseout', () => {
        d3Graph.selectAll('circle').remove();
        this.hidePopup();
      });
  }

  /**
   * Show the popup at the specified position with the passed data
   * @param  {Array} position absolute left and top positions
   * @param  {Object} data    year and percentage
   */
  showPopup(position, data) {
    if(!this.popup) {
      this.popup = document.createElement('div');
      this.popup.classList.add(styles.popup);
      document.body.appendChild(this.popup);
    }

    this.popup.style.transform = `translate(calc(${position[0]}px - 50%), calc(${position[1]}px - 100% - 12px))`;

    this.popup.innerHTML = `
      ${data.year}<br/>
      ${formatPercentage(data.percentage)} covered in water
    `;

    this.popup.classList.remove(styles['-hidden']);
  }

  /**
   * Hide the popup
   */
  hidePopup() {
    if(this.popup) this.popup.classList.add(styles['-hidden']);
  }

  /**
   * Return whether the popup is visible or not
   * @return {Boolean} true if visible, false otherwise
   */
  isPopupVisible() {
    return !this.popup.classList.contains(styles['-hidden']);
  }

  render() {
    return (
      <div className={styles.container}>
        <Button classes={[ styles.button ]} click={() => {}}>
          <svg className={`${styles.icon} ${styles['-left']}`}>
            <use xlinkHref="#arrowIcon" x="0" y="0" />
          </svg>
        </Button>
        <svg ref="svg">
        </svg>
        <Button classes={[ styles.button ]} click={() => {}}>
          <svg className={`${styles.icon} ${styles['-right']}`}>
            <use xlinkHref="#arrowIcon" x="0" y="0" />
          </svg>
        </Button>
      </div>
    );
  }

}

export default YearSelector;
