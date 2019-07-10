import React, { Component } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { carbonAmountIn } from '../../../utils/carbon';

import GraphHeader from './GraphHeader';
import GraphCircle from './GraphCircle';
import GraphFooter from './GraphFooter';

import './Graph.css';

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      selectedYearIndex: 0
    };
  }

  componentDidMount() {
    const { years, formula, surface } = this.props;
    this.setGraphData(years, formula, surface);
  }

  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;
    this.setGraphData(newProps.years, newProps.formula, newProps.surface);
  }

  setGraphData(years, formula, surface) {
    let data = [];

    for (let i = 0; i < years; i++) {
      data[i] = {
        'carbon': carbonAmountIn(i+1, formula, surface),
        'year': i+1
      };
    }

    this.setState({
      data
    });
    this.selectYear(data.length);
  }

  selectYear(year) {
    this.setState({
      selectedYearIndex: year - 1
    });
  }

  getDateIn(years) {
    return new Date(
      new Date().setFullYear(
        new Date().getFullYear() + years
      )
    );
  }

  render() {
    const { className, userSurface , me } = this.props;
    const { data, selectedYearIndex } = this.state;

    /** TODO: Loading state */
    if (!data) return false;

    return (
      <div className={cx(className, 'carbon-graph')}>

        <GraphHeader
          carbon={data[selectedYearIndex].carbon}
          className="carbon-graph__header"
          year={this.getDateIn(selectedYearIndex+1)}
          me={me}
        />

        <div className="carbon-graph__graph">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} >
              <Tooltip
                cursor={{ stroke: '#D8E0E6' }}
                content={() => { return false; }}
              />
              <XAxis
                tickLine={{stroke: 'white'}}
                minTickGap={0}
                tickSize={24}
                axisLine={false}
                tick={{fontSize: '11px', fill: '#9AABB8'}}
                tickFormatter={year => {
                  return year % 2 === 0 ? year + 1 : '';
                }}
              />
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#D8E0E6"
              />
              <Line
                className="carbon-graph__line"
                type="monotone"
                dataKey="carbon"
                isAnimationActive={false}
                dot={
                  <GraphCircle
                    selectYear={this.selectYear.bind(this)}
                    selectedYearIndex={selectedYearIndex}
                    maxYearsIndex={data.length-1}
                  />
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <GraphFooter
          getDateIn={this.getDateIn.bind(this)}
          data={data}
          userSurface={userSurface}
        />

      </div>
    );
  }
}

Graph.propTypes = {
  className: PropTypes.string,
  formula: PropTypes.string.isRequired,
  surface: PropTypes.number.isRequired,
  userSurface: PropTypes.number,
  years: PropTypes.number.isRequired,
  me: PropTypes.bool,
};

export default Graph;
