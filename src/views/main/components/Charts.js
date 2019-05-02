import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Alert } from 'reactstrap';
  
class Charts extends Component {
    render() {
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol>
                        <Alert color="info">
                            Reference here: http://www.chartjs.org/docs/latest/
                        </Alert>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={6} xs={12}>
                        <ContentCard title="Line Chart">
                            <Line
                                data={{
                                    labels: [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July"
                                    ],
                                    datasets: [
                                        {
                                            label: "First dataset",
                                            data: [
                                                20, 4, 8, 5, 15, 5, 9
                                            ],
                                            // fill: false,
                                            // backgroundColor: '#b7d7e8',
                                            borderColor: '#87bdd8',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#87bdd8',
                                            pointBorderColor: '#fff',
                                            pointBorderWidth: 1
                                        },
                                        {
                                            label: "Second dataset",
                                            data: [
                                                8, 2, 15, 9, 6, 5, 1
                                            ],
                                            // fill: false,
                                            // backgroundColor: '#e06377',
                                            borderColor: '#c83349',
                                            borderWidth: 2,
                                            pointBackgroundColor: '#c83349',
                                            pointBorderColor: '#fff',
                                            pointBorderWidth: 1
                                        }
                                    ]
                                }}
                                
                                options={{
                                    responsive: true,
                                    scales: {
                                        xAxes: [
                                            {
                                                display: true,
                                                scaleLabel: {
                                                    show: true,
                                                    labelString: 'Month'
                                                }
                                            }
                                        ],
                                        yAxes: [
                                            {
                                                display: true,
                                                scaleLabel: {
                                                    show: true,
                                                    labelString: 'Value'
                                                },
                                                ticks: {
                                                    suggestedMin: 0,
                                                    suggestedMax: 10
                                                }
                                            }
                                        ]
                                    }
                                }}

                                // legend={false}
                            />
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={6} xs={12}>
                        <ContentCard title="Bar Chart">
                            <Bar
                                data={{
                                    labels: [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July"
                                    ],
                                    datasets: [
                                        {
                                            label: "First dataset",
                                            data: [
                                                1,2,3,4,5,6,7
                                            ],
                                            backgroundColor: '#b7d7e8',
                                            borderColor: '#87bdd8',
                                            borderWidth: 1,
                                            // hoverBackgroundColor: '',
                                            // hoverBorderColor: '',
                                            // hoverBorderWidth: 1
                                        },
                                        {
                                            label: "Second dataset",
                                            data: [
                                                5,2,3,4,5,6,7
                                            ],
                                            backgroundColor: '#e06377',
                                            borderColor: '#c83349',
                                            borderWidth: 1,
                                            // hoverBackgroundColor: '',
                                            // hoverBorderColor: '',
                                            // hoverBorderWidth: 1
                                        }
                                    ]
                                }}
                                
                                options={{
                                    responsive: true,
                                    scales: {
                                        xAxes: [
                                            {
                                                display: true,
                                                scaleLabel: {
                                                    show: true,
                                                    labelString: 'Month'
                                                }
                                            }
                                        ],
                                        yAxes: [
                                            {
                                                display: true,
                                                scaleLabel: {
                                                    show: true,
                                                    labelString: 'Value'
                                                },
                                                ticks: {
                                                    suggestedMin: 0,
                                                    suggestedMax: 10
                                                }
                                            }
                                        ]
                                    }
                                }}

                                // legend={false}
                            />
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={6} xs={12}>
                        <ContentCard title="Dougnut Chart">
                            <Doughnut
                                data={{
                                    labels: [
                                        "Green",
                                        "Yellow",
                                        "Red"
                                    ],
                                    datasets: [
                                        {
                                            data: [
                                                150, 33, 91
                                            ],
                                            backgroundColor: ['#96ceb4', '#ffcc5c', '#ff6f69'],
                                            borderColor: ['#96ceb4', '#ffcc5c', '#ff6f69'],
                                            borderWidth: [1],
                                            // hoverBackgroundColor: [],
                                            // hoverBorderColor: [],
                                            // hoverBorderWidth: []
                                        }
                                    ]
                                }}
                                
                                options={{
                                    // cutoutPercentage: 50,
                                    // rotation: 0,
                                    // circumference: 0,
                                    // animation: {
                                    //     animateRotate: true,
                                    //     animateScale: false
                                    // }
                                }}

                                // legend={false}
                            />
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Charts;