import React, { Component, Fragment } from 'react';
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
          pendingTx: [],
          d3card : undefined,
          nodeStatus: [],
          passSec: undefined,
          difficulty: undefined,
          txPerBlock: [],            // transaction per block 
          tbpLabels: [],            // transaction per block label
        };

        socket = io.connect(process.env.REACT_APP_BAAS_SOCKET);

    }

    componentDidMount() {
        this.getDashboardInfo();
        this.getCurrentTime();

        // web socket 연결 
        socket.on('connect', function() {
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
        this.intervalId_getInfo = setInterval(this.getDashboardInfo, 1000);
        this.intervalId_getCurrentTime = setInterval(this.getCurrentTime, 1000); 
        
        window.addEventListener('resize', this.updatePosition.bind(this));
        this.setState({
            d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
        });
        

    }

    componentWillUnmount() {
        socket.disconnect();
        clearInterval(this.intervalId_getInfo);
        clearInterval(this.intervalId_getCurrentTime);
        window.removeEventListener();
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
                console.log(res.results[i].number);
                console.log(moment(res.results[i-1].timestamp).diff(res.results[i].timestamp,'seconds'));
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

        })
        .catch(error => {
            console.log(error);
        })
    }

    getCurrentTime = () => {
        if(this.state.passSec === undefined) {
          return;
        }else {
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
        this.setState({
            d3card: ReactDOM.findDOMNode(this.refs['D3']).getBoundingClientRect()
        });
    }

    
    render() {
        const { blockNo, avgBlockTime, gasLimit, gasUsed, passSec, difficulty, 
            d3card, node, tbpLabels, txPerBlock, timePass } = this.state;
        console.log('render');

        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <FiBox size={100} color="#e06377" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span class='dash-upper-line-card' >BEST BLOCK</span><br/>
                                    <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}># {blockNo === undefined ? '' : blockNo}</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <MdHourglassEmpty size={100} color="#8B9DC3"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span style={{fontSize:'0.9rem',color:"#FFFFFF"}} >LAST BLOCK</span><br/>
                                    <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}>{passSec === undefined ? '' : passSec} s ago</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <MdTimer size={100} color='#339AED'/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'0.9rem',color:"#FFFFFF"}}>AVG BLOCK TIME</span><br/>
                                    <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard style={{maxHeight: '130px'}}>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <TiKeyOutline size={100} color='#34A853'/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'0.9rem',color:"#FFFFFF"}}>DIFFICULTY</span><br/>
                                    <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}>{difficulty === undefined ? '' : difficulty} H</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} >
                        <ContentCard >
                            <D3component ref='D3' cardPosition={d3card} node={node}/>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                        <ContentRow>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                <ContentCard style={{maxHeight: '130px'}}>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <MdHourglassEmpty size={100} color="#8B9DC3"/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span style={{fontSize:'0.9rem',color:"#FFFFFF"}}>GAS PRICE</span><br/>
                                            <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}>{gasUsed === undefined ? '' : gasUsed} gwei</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                                <ContentCard style={{maxHeight: '130px'}}>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <TiKeyOutline size={100} color='#34A853'/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span style={{fontSize:'0.9rem',color:"#FFFFFF"}}>GAS LIMIT</span><br/>
                                            <span style={{fontSize:'1.75rem', fontWeight:'bold',color:"#FFFFFF"}}>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                        <ContentRow>
                            <ContentCol>
                                <ContentCard>
                                    <Col style={{textAlign:'left', marginBottom: '10px'}}>
                                        <span style={{fontSize:'1.0rem'}}>Pending Transactions</span>
                                    </Col>
                                    <Col>
                                        <Table bordered>
                                            <thead style={{backgroundColor:'skyblue', textAlign: 'center'}}>
                                                <tr>
                                                    <th style={{width:'20%'}}>Pending..</th>
                                                    <th style={{width:'80%'}}>txId</th>
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
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6}>
                        <span style={{fontSize:'1rem',color:"#FFFFFF"}}>Transaction Per Block</span><br/><br/>
                        <Bar
                            data={{
                                labels: tbpLabels,
                                datasets: [
                                    {
                                        label: "Transaction Per Block",
                                        data: txPerBlock,
                                        // fill: false,
                                        // backgroundColor: '#b7d7e8',
                                        pointBackgroundColor: '#87bdd8',
                                        pointBorderColor: '#fff',
                                        pointBorderWidth: 0.0001,
                                        borderColor: '#ffffff',
                                        borderWidth: 1.5
                                    }
                                ]
                            }}
                            height={50}
                            options={{
                                scales: {
                                    xAxes: [
                                        {
                                            display: true,
                                            scaleLabel: {
                                                show: true,
                                                labelString: 'Block number'
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            display: true,
                                            scaleLabel: {
                                                show: false,
                                                labelString: 'Transaction count'
                                            },
                                            ticks: {
                                                suggestedMin: 0,
                                                suggestedMax: 5,
                                                interval: 1
                                            }
                                        }
                                    ]
                                }
                            }}
                            legend={false}
                        />
                    </ContentCol>
                    <ContentCol xl={6}>
                        <span style={{fontSize:'1rem',color:"#FFFFFF"}}>Block Generation Time</span><br/><br/>
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
                                        pointBackgroundColor: '#87bdd8',
                                        pointBorderColor: '#fff',
                                        pointBorderWidth: 0.0001
                                    }
                                ]
                            }}
                            height={50}
                            options={{
                                scales: {
                                    xAxes: [
                                        {
                                            display: true,
                                            scaleLabel: {
                                                show: true,
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
                                }
                            }}
                            legend={false}
                        />
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Monitoring;