import React, { Component } from "react";
import propTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { url_TransactionPerBlock } from "components/CustomChart/Properties.js";
import ContentCard from 'components/ContentCard';

import Fetch from "utils/Fetch.js";

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        xAxesValues: [],
        yAxesValues: []
      },
      ...props
    };

    this.intervalId = -1;
  }

  componentDidMount() {
    const { resource, interval } = this.state;

    this.getData();
    this.intervalId = setInterval(() => this.getData(resource), interval*1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const {
      title,
      category,
      interval,
      chartData
    } = this.state;

    let data = {
      labels: chartData.xAxesValues,
      datasets: chartData.yAxesValues
    };

    return (
      <div>
        <ContentCard
          dark
          marginShortd
          // height={"200px"}
          titleSize={"16px"}
          title={title}
          // category={category}
          children={
            <Bar
              height={110}
              data={data}
              options={this.props.options} />
          }
        />
      </div>
    );
  }

  getSeries = (url) => {
    let chartData = {
      xAxesValues: [],
      yAxesValues: []
    };

    Fetch.GET(url)
    .then(res => {
      const value = [];
      const label = [];

      for(var index=0; index<res.results.length; index++){
        value.push(res.results[index].transaction_count);
        label.push(res.results[index].number);
      }

      //Label 생성(X축 단위값)
      chartData.xAxesValues = label;

      //Series 생성(그래프의 점 Y축)
      let r = 244//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'r'));
      let g = 134//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'g'));
      let b = 66//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'b'));

      let backgroundColorList = [];
      for(var index=0; index<value.length; index++) {
        if(value[index] > this.props.criticalValue) {
          backgroundColorList.push(this.props.criticalColor);
        }else {
          backgroundColorList.push(this.props.color);
        }
      }

      chartData.yAxesValues.push({
        label: '',
        fill: true,
        lineTension: 0.1,
        // backgroundColor: 'rgba('+r+','+g+','+b+',0.6)',
        backgroundColor: backgroundColorList,
        borderWidth: 1,
        // borderColor: 'rgba('+r+','+g+','+b+',1)',
        borderColor: backgroundColorList,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba('+r+','+g+','+b+',1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: 'rgba('+r+','+g+','+b+',1)',
        pointHoverBorderColor: 'rgba('+r+','+g+','+b+',1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data:value });

      this.setState({ chartData });
    })
    .catch( (error) => {
      console.log(error.message);
    });
  }

  getData = () => {
    let query = url_TransactionPerBlock;
    this.getSeries(query);
  }
}

export default BarChart;
