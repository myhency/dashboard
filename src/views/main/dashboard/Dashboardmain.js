import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Col } from 'reactstrap';
import { FiBox } from 'react-icons/fi';
import { MdTimer, MdHourglassEmpty } from 'react-icons/md';
import { TiKeyOutline } from 'react-icons/ti';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import io from 'socket.io-client';

import Fetch from 'utils/Fetch.js';
import D3component from './nodenetwork/d3component';

let socket;

class Monitoring extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blockNo: undefined,
            gasLimit: undefined,
            gasUsed: undefined,
            timestamp: undefined,
            avgBlockTime: undefined,
            timePass: [],
            node: [],
            pendingTx: [],
            d3card: undefined,
            nodeStatus: []
        };

        socket = io.connect(process.env.REACT_APP_BAAS_SOCKET);
        window.addEventListener('resize', this.updatePosition.bind(this));

    }

    componentDidMount() {
        this.getBestBlockInfo();
        this.getCurrentTime();
        this.updatePosition();

        // web socket 연결 
        socket.on('connect', function () {
            socket.emit("requestNodeList")
        });

        socket.on('responseNodeList', (data) => {
            this.setState({
                node: data
            })
            console.log(this.state.node);
        });

        socket.on('nodeStatus', (data) => {
            this.setState({
                nodeStatus: data
            })
            console.log(this.state.nodeStatus);
        });


        //1초에 한번씩 백엔드에 요청
        this.intervalId_getBestBlockInfo = setInterval(this.getBestBlockInfo, 1000);
        this.intervalId_getCurrentTime = setInterval(this.getCurrentTime, 1000);


        // this.setState({
        //     d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
        // });



    }

    componentWillUnmount() {
        socket.disconnect();
        clearInterval(this.intervalId_getBestBlockInfo);
        clearInterval(this.intervalId_getCurrentTime);
        // window.removeEventListener('resize', this.updatePosition.bind(this));
    }

    getBestBlockInfo = () => {
        Fetch.GET('/api/block/?page_size=10&page=1')
            .then(res => {
                let bestBlock = res.results[0];

                // update 안할 때
                if (this.state.blockNo === bestBlock.number) {
                    return;
                }

                let newTime = this.state.timePass;
                if (newTime.length == 10) {
                    newTime.splice(0, 1);
                }
                newTime.push(moment(res.results[0].timestamp).diff(res.results[1].timestamp, 'seconds'));
                let avgBlockTime = _.meanBy(newTime);
                //console.log(newTime);

                this.setState({
                    blockNo: bestBlock.number,
                    gasLimit: bestBlock.gas_limit,
                    gasUsed: bestBlock.gas_used,
                    timestamp: bestBlock.timestamp,
                    avgBlockTime: avgBlockTime,
                    timePass: newTime
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    getCurrentTime = () => {
        if (this.state.passSec === undefined) {
            return;
        } else {
            this.setState({
                passSec: this.state.passSec + 1
            });
        }
    }

    updatePosition() {
        if (ReactDOM.findDOMNode(this.refs['D3']) !== null) {

            this.setState({
                d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
            });
        }
        console.log('Resize!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.log(this.state.d3card);
    }


    render() {
        const { blockNo, avgBlockTime, gasLimit, gasUsed, d3card, node } = this.state;
        console.log('render');

        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <FiBox size={100} color="#e06377" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span className='dash-upper-line-card-title' >BEST BLOCK</span><br />
                                    <span className='dash-upper-line-card-value'># {blockNo === undefined ? '' : blockNo}</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <MdTimer size={100} color='#339AED' />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title'>AVG BLOCK TIME</span><br />
                                    <span className='dash-upper-line-card-value'>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#8B9DC3' borderColor='#3B5998'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <MdHourglassEmpty size={100} color="#8B9DC3" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title'>GAS PRICE</span><br />
                                    <span className='dash-upper-line-card-value'>{gasUsed === undefined ? '' : gasUsed} gwei</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <TiKeyOutline size={100} color='#34A853' />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title'>GAS LIMIT</span><br />
                                    <span className='dash-upper-line-card-value'>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} >
                        <ContentCard >
                            <D3component ref='D3' cardPosition={d3card} node={node} />
                        </ContentCard>
                        {/* {console.log(ReactDOM.findDOMNode(this.refs['D3']).getClientRects())} */}
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                        <ContentRow>
                            <ContentCol>
                                <ContentCard>
                                    <Col style={{ textAlign: 'left', marginBottom: '10px' }}>
                                        <span className='dash-upper-line-card-title'>Pending Transactions</span>
                                    </Col>
                                    <Col>
                                        <Table bordered>
                                            <thead style={{ backgroundColor: 'skyblue', textAlign: 'center' }}>
                                                <tr>
                                                    <th style={{ width: '20%' }}>Pending..</th>
                                                    <th style={{ width: '80%' }}>txId</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            </tbody>
                                            <tbody>
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                        <ContentRow>
                            <ContentCol xl={12}>
                                {/* <CustomChart
                                    title='Transactions Per Block'
                                    category='During 5 min'
                                    content={chartContents.barDifficulty}
                                    interval={10} /> */}
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

                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Monitoring;