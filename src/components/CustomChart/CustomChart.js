import React, { Component } from "react";
import propTypes from 'prop-types';
import BarChart from './BarChart';
import LineChart from './LineChart';


class CustomChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: '<div />'
    };

    this.childCharts = {
      'lineChart'   : LineChart,
      'barChart'  : BarChart
    };
  }

  componentDidMount() {
    let chart = this.drawingChildChart(this.props.content);
    this.setState({ chart });
  }

  render() {
    return (
      <div>
        {this.state.chart}
      </div>
    );
  }

  drawingChildChart = (content) => {
    let Chart = this.childCharts[content.content];

    return (
      <Chart
        title={this.props.title}
        category={this.props.category}
        resource={content.resource}
        interval={this.props.interval}
        options={this.props.content.options}
        color={this.props.color}
        criticalValue={this.props.criticalValue}
        criticalColor={this.props.criticalColor}
      />
    );
  }
}

CustomChart.propTypes = {
  title             : propTypes.string,
  category          : propTypes.string.isRequired,
  content          : propTypes.object.isRequired,
  interval          : propTypes.number.isRequired,
  color             : propTypes.string,
  criticalValue     : propTypes.number,
  criticalColor     : propTypes.string
}

CustomChart.defaultProps = {
  interval: 0
}

export default CustomChart;
