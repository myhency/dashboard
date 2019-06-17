import React, { Component, Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Col } from 'reactstrap';
import { FaSlidersH } from 'react-icons/fa';
import { FiBox, FiSliders } from 'react-icons/fi';
import { MdTimer,MdHourglassEmpty } from 'react-icons/md';
import { TiKeyOutline } from 'react-icons/ti';
import { Bar, Line } from 'react-chartjs-2';
import _ from 'lodash';
import moment from 'moment';
import io from 'socket.io-client';

import Fetch from 'utils/Fetch.js';
import D3component from './nodenetwork/d3component';

let socket;

class Monitoring extends Component {

    constructor(props) {
        super(props);
    
        this.state={
          blockNo: undefined,
          gasLimit: undefined,
          gasUsed: undefined,
          timestamp: undefined,
          avgBlockTime: undefined,
          timePass: [],                 // average block time 계산
          node: [],
          pendingTx: [],                // key가 hash, value가 시간
          d3card : undefined,
          nodeStatus: [],
          passSec: undefined,
          difficulty: undefined,
          txPerBlock: [],            // transaction per block 
          tbpLabels: [],            // transaction per block label
          miningBlock: [],             // recent mining block info
          uncleState: false,            // uncle state
        };

        socket = io.connect(process.env.REACT_APP_BAAS_SOCKET);
        window.addEventListener('resize', this.updatePosition.bind(this));

    }

    componentDidMount() {
        this.getDashboardInfo();
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

        socket.on('pendingTransaction', (data) => {
            let pendingTimeTx = [];
            let prevList = this.state.pendingTx;
            
            // 최근에 온게 리스트 앞쪽에 오도록
            for(var i = data.length-1; i>=0; i--) {
                let txHash = data[i];
                let temp = {'time': 0, 'hash': txHash};
                var index = _.indexOf(prevList, _.find(prevList, { 'hash': txHash }));
                if(index >= 0 ) {
                    temp.time = prevList[index].time +1;
                }
                pendingTimeTx.push(temp);
            }
            this.setState({
                pendingTx: pendingTimeTx
            })
        });

        socket.on('blockMiner', (data) => {
            this.setState({
                miningBlock: data
            });
            console.log(this.state.miningBlock);
        });

        socket.on('uncle', (data) => {
            this.setState({
                uncleState: data
            });
            console.log(this.state.uncleState);
        });

        //1초에 한번씩 백엔드에 요청
        this.intervalId_getInfo = setInterval(this.getDashboardInfo, 1000);
        this.intervalId_getCurrentTime = setInterval(this.getCurrentTime, 1000); 
        this.intervalId_getPendingTx = setInterval(() => socket.emit("requestPendingTx"), 1000);

        
        // window.addEventListener('resize', this.updatePosition.bind(this));
        this.setState({
            d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
        });
        
        console.log(this.state.d3card);

    }

    componentWillUnmount() {
        socket.disconnect();
        clearInterval(this.intervalId_getInfo);
        clearInterval(this.intervalId_getCurrentTime);
        clearInterval(this.getPendingTx);
        window.removeEventListener('resize', this.updatePosition.bind(this));
    }

    getDashboardInfo = () => {
        if(this.state.timePass.length > 0)
            this.updateDashboardInfo();
        else
            this.getFirstInfo();
    }

    getFirstInfo = () => {
        Fetch.GET('/api/block/?page_size=61&page=1')
        .then(res => {
            let newTime = [];
            let tpb = [];
            let labels = [];
            for(var i = 1; i<61; i++) {
                newTime.push(moment(res.results[i-1].timestamp).diff(res.results[i].timestamp,'seconds'));
                tpb.push(res.results[i].transaction_count);
                labels.push(res.results[i].number);
            }
            
            let avgBlockTime = _.meanBy(newTime).toFixed(3);
            
            let bestBlock = res.results[0];
            this.setState({
                blockNo: bestBlock.number,
                gasLimit: bestBlock.gas_limit,
                gasUsed: bestBlock.gas_used,
                timestamp: bestBlock.timestamp,
                avgBlockTime: avgBlockTime,
                timePass: newTime,
                passSec: 0,
                txPerBlock: tpb,
                tbpLabels: labels
            });

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

    updateDashboardInfo =() => {
        Fetch.GET('/api/block/?page_size=1&page=1')
        .then(res => {
            let bestBlock = res.results[0];

            // update 안할 때
            if(this.state.blockNo === bestBlock.number) {
                return;
            }

            let newTime = this.state.timePass;
            let tpb = this.state.txPerBlock;
            let labels = this.state.labels;
            
            newTime.splice(0,1);
            tpb.splice(0,1);
            labels.splice(0,1);

            newTime.push(moment(newTime[newTime.length-1]).diff(bestBlock.timestamp,'seconds'));
            tpb.push(bestBlock.transaction_count);
            labels.push(bestBlock.number);
            
            let avgBlockTime = _.meanBy(newTime).toFixed(3);
            
            this.setState({
                blockNo: bestBlock.number,
                gasLimit: bestBlock.gas_limit,
                gasUsed: bestBlock.gas_used,
                timestamp: bestBlock.timestamp,
                avgBlockTime: avgBlockTime,
                timePass: newTime,
                passSec: 0,
                txPerBlock: tpb,
                tbpLabels: labels
            });

        })
        .catch(error => {
            console.log(error);
        })
    }

    updatePosition() {
        if (ReactDOM.findDOMNode(this.refs['D3']) !== null) {

            this.setState({
                d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
            });
        }
        
    }
    
    render() {
        const { blockNo, avgBlockTime, gasLimit, gasUsed, passSec, difficulty, 
            d3card, node, tbpLabels, txPerBlock, timePass, pendingTx } = this.state;
        
        // pending Transaction Table 
        var rows = [];
        pendingTx.map((txInfo, index) => {
            rows.push(
                <tr key={index}>
                    <td>{txInfo.time}s ago</td>
                    <td>{txInfo.hash}</td>
                </tr>
            );
        });
        for(var i = 0; i < 5-pendingTx.length; i++) {
            rows.push( 
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>)
        }

        // Transaction per Block Color
        var tpbColor = [];
        tpbColor = txPerBlock.map((value) => value > 20 ? '#F74B4B' : value > 10 ? '#FD8900' : value > 5 ? '#FFD162' : value > 2 ? '#7BCC3A' : '#0F9EDB');
        
        // Block Generation Time color
        var bgtColor = [];
        bgtColor = timePass.map((value) => value > 3600 ? 'red' : value > 600 ? 'orange' : '0F9EDB');


        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    {/* <FiBox size={100} color="#0F9EDB" /> */}
                                    <img src="/img/best_block.svg" width="90px"/>
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
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    {/* <MdHourglassEmpty size={100} color="#8B9DC3"/> */}
                                    <img src="/img/last_block.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span className='dash-upper-line-card-title' >LAST BLOCK</span><br/>
                                    <span className='dash-upper-line-card-value'>{passSec === undefined ? '' : passSec} s ago</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    {/* <MdTimer size={100} color='#339AED'/> */}
                                    <img src="/img/avg_block_time.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span className='dash-upper-line-card-title'>AVG BLOCK TIME</span><br/>
                                    <span className='dash-upper-line-card-value'>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard style={{ maxHeight: '130px' }}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    {/* <TiKeyOutline size={100} color='#34A853' /> */}
                                    <img src="/img/difficulty.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span className='dash-upper-line-card-title'>DIFFICULTY</span><br/>
                                    <span className='dash-upper-line-card-value'>{difficulty === undefined ? '' : difficulty} H</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentCard>
                            <D3component ref='D3' cardPosition={d3card} node={node} />
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentRow>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                <ContentCard style={{maxHeight: '130px'}}>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <img src="/img/gas_price.svg" width="90px"/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span className='dash-upper-line-card-title'>GAS PRICE</span><br/>
                                            <span className='dash-upper-line-card-value'>{gasUsed === undefined ? '' : gasUsed} gwei</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                                <ContentCard style={{maxHeight: '130px'}}>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <img src="/img/gas_limit.svg" width="90px"/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span className='dash-upper-line-card-title'>GAS LIMIT</span><br/>
                                            <span className='dash-upper-line-card-value'>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                        <ContentRow>
                            <ContentCol noMarginBottom={true}>
                                <ContentCard style={{height: '330px', overflow: 'auto'}}>
                                    <Col style={{ textAlign: 'left', marginBottom: '10px' }}>
                                        <span className='dash-upper-line-card-title'>Pending Transactions</span>
                                    </Col>
                                    <Col>
                                        <Table bordered >
                                            <thead style={{ backgroundColor: 'skyblue', textAlign: 'center' }}>
                                                <tr>
                                                    <th style={{width:'15%'}}>Pending..</th>
                                                    <th style={{width:'85%'}}>txHash</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { rows }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
                <ContentRow style={{marginTop: '5px'}}>
                    <ContentCol xl={6}>
                        <ContentCard>
                            <span className='dash-upper-line-card-title'>Transaction Per Block</span><br/><br/>
                            <Bar
                                data={{
                                    labels: tbpLabels,
                                    datasets: [
                                        {
                                            label: "Transaction Per Block",
                                            data: txPerBlock,
                                            backgroundColor: tpbColor,
                                            borderColor: tpbColor,
                                            borderWidth: 1.5,
                                            pointBackgroundColor: '#87bdd8',
                                            pointBorderColor: '#fff',
                                            pointBorderWidth: 2,
                                        }
                                    ]
                                }}
                                height={40}
                                options={{
                                    scales: {
                                        xAxes: [
                                            {
                                                // display: false,
                                                gridLines: {
                                                    display:false,
                                                    color:'white'
                                                },
                                                ticks: {
                                                    display: false
                                                }
                                            }
                                        ],
                                        yAxes: [
                                            {
                                                // display: false,
                                                ticks: {
                                                    suggestedMin: 0,
                                                    suggestedMax: 5,
                                                    interval: 1
                                                },
                                                gridLines: {
                                                    display:false,
                                                    color:'white'
                                                }
                                            }
                                        ]
                                    }
                                }}
                                legend={{
                                    display: false
                                }}
                            />
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6}>
                        <ContentCard>
                            <span className='dash-upper-line-card-title'>Block Generation Time</span><br/><br/>
                            <Line
                                data={{
                                    labels: tbpLabels,
                                    datasets: [
                                        {
                                            label: "Block Generation Time",
                                            data: timePass,
                                            // fill: false,
                                            // backgroundColor: '#b7d7e8',
                                            borderColor: '#87bdd8',
                                            borderWidth: 2,
                                            pointRadius: 0,
                                            pointHoverBorderWidth: 1
                                        }
                                    ]
                                }}
                                height={30}
                                options={{
                                    scales: {
                                        xAxes: [
                                            {
                                                display: false,
                                                scaleLabel: {
                                                    show: false,
                                                    labelString: 'Block number'
                                                }
                                            }
                                        ],
                                        yAxes: [
                                            {
                                                display: true,
                                                scaleLabel: {
                                                    show: false,
                                                    labelString: 'Generation time'
                                                },
                                                ticks: {
                                                    suggestedMin: 0,
                                                    suggestedMax: 500
                                                }
                                            }
                                        ]
                                    },
                                }}
                                legend={{
                                    display: false
                                }}
                            />
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Monitoring;