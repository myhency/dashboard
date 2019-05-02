import React, { Component } from "react";
import propTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import moment from 'moment';
// import { url_cpu, url_mem } from "components/CustomChart/Properties.jsx";

import Fetch from "utils/Fetch.js";

class LineChart extends Component {
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

    // this.getData(resource);
    // this.intervalId = setInterval(() => this.getData(resource), interval*1000);
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
        <div
          dark
          marginShort
          // height={"400px"}
          titleSize={"16px"}
          title={title}
          // category={category}
          content={
            <Line
              height={160}
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


    Fetch.GET(url, (text) => {
      const series = text[0]['series'];
      // returned json
      // {
      //   colums:["time", "host", "usage_idle"],
      //   name:"cpu",
      //   tags:{host: "10.20.28.131"},
      //   values:[
      //     ["2018-05-28T01:31:30Z", "10.20.28.131", 78.10665986224856],
      //     ["2018-05-28T01:31:40Z", "10.20.28.131", 77.77777777751346]
      //   ]
      // }

      //Label 생성(X축 단위값)
      series.map((label, index) => {
        if ( index === 0 ) {
          label.values.map((v, index) => {
            chartData.xAxesValues.push(moment(v[0]).format('HH:mm:ss'));
            return;
          });
        }
        else return;
      });


      //Series 생성(그래프의 점 Y축)
      let r = 244//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'r'));
      let g = 134//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'g'));
      let b = 66//RgbGenerator.hashCode(RgbGenerator.SHA256(series.label+'b'));

      series.map((series, index) => {
        let data = [];

        series.values.map((v) => { data.push(100-v[2]) });

        chartData.yAxesValues.push({
          label: series.tags.host,
          fill: false,
          lineTension: 0.3,
          backgroundColor: 'rgba('+r+','+g+','+b+',0.6)',
          borderWidth: 3,
          borderColor: 'rgba('+r+','+g+','+b+',0.6)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba('+r+','+g+','+b+',1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 0,
          pointHoverRadius: 0,
          pointHoverBackgroundColor: 'rgba('+r+','+g+','+b+',1)',
          pointHoverBorderColor: 'rgba('+r+','+g+','+b+',1)',
          pointHoverBorderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
          data });

          r = r-245;
          b = b+245;
      });

      this.setState({ chartData });
    })
    .catch( (error) => {
      console.log(error.message);
    });
  }

//   getData = (resource) => {
//     let query = resource === 'cpu' ? url_cpu : url_mem;
//     this.getSeries(query);
//   }
}

LineChart.propTypes = {
  title: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
  resource: propTypes.string.isRequired,
  interval: propTypes.number.isRequired, //second
  options: propTypes.object.isRequired
}

export default LineChart;
