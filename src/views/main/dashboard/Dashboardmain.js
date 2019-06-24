import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Col } from 'reactstrap';
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
        //   node: [],        // 
        //   angle: 0,      // 그림 회전 각도, 여기부터 d3쪽에서 사용할 state
        //   numOfNodes: 0,
        //   simulation: {},
        //   xcenter: 0,
        //   ycenter: 0,
        //   nodeImgSize: 0,
        //   cardPosition: undefined
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
        
        // setInterval(() => {
        //     // this.updateTime();          // 그림을 몇초마다 리프레쉬할지 정함
        // }, 10);
        
        // console.log(this.state.d3card);

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

            for(var i = res.results.length-1; i> 0; i--) {
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
                tbpLabels: labels,
                difficulty: bestBlock.difficulty,
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
        Fetch.GET('/api/block/?page_size=2&page=1')
        .then(res => {
            let bestBlock = res.results[0];
            // update 안할 때
            if(this.state.blockNo === bestBlock.number) {
                return;
            }

            let newTime = this.state.timePass;
            let tpb = this.state.txPerBlock;
            let labels = this.state.tbpLabels;
            
            newTime.splice(0,1);
            tpb.splice(0,1);
            labels.splice(0,1);

            console.log(moment(bestBlock.timestamp).diff(res.results[1].timestamp,'seconds'));
            newTime.push(moment(bestBlock.timestamp).diff(res.results[1].timestamp,'seconds'));
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
                tbpLabels: labels,
                difficulty: bestBlock.difficulty
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
        pendingTx.map((txInfo) => {
            rows.push(
                <tr key={txInfo.index}>
                    <td>{txInfo.time}s ago</td>
                    <td>{txInfo.hash}</td>
                </tr>
            );
        });
        for(var i = 0; i < 5-pendingTx.length; i++) {
            rows.push( 
                <tr key={i}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>)
        }

        // Transaction per Block Color
        var tpbColor = [];
        tpbColor = txPerBlock.map((value) => value > 20 ? '#F74B4B' : value > 10 ? '#FD8900' : value > 5 ? '#FFD162' : value > 2 ? '#7BCC3A' : '#0F9EDB');

        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    {/* <FiBox size={100} color="#0F9EDB" /> */}
                                    <img src="/img/best_block.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span className='dash-upper-line-card-title' >BEST BLOCK</span><br />
                                    <span className='dash-upper-line-card-value' style={{color: '#B648F6'}}># {blockNo === undefined ? '' : blockNo}</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    {/* <MdHourglassEmpty size={100} color="#8B9DC3"/> */}
                                    <img src="/img/last_block.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    {/* <span class='dash-upper-line-card' style={{fontSize:'0.9rem', color:"#FFFFFF"}}>BEST BLOCK</span><br/> */}
                                    <span className='dash-upper-line-card-title' >LAST BLOCK</span><br/>
                                    <span className='dash-upper-line-card-value' style={{color: '#0F9EDB'}}>{passSec === undefined ? '' : passSec} s ago</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    {/* <MdTimer size={100} color='#339AED'/> */}
                                    <img src="/img/avg_block_time.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span className='dash-upper-line-card-title'>AVG BLOCK TIME</span><br/>
                                    <span className='dash-upper-line-card-value' style={{color: '#7BCC3A'}}>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    {/* <TiKeyOutline size={100} color='#34A853' /> */}
                                    <img src="/img/difficulty.svg" width="90px"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span className='dash-upper-line-card-title'>DIFFICULTY</span><br/>
                                    <span className='dash-upper-line-card-value' style={{color: '#FFD162'}}>{difficulty === undefined ? '' : difficulty} H</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentCard imgBackground={true}>
                            <D3component ref='D3' cardPosition={d3card} node={node}/>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentRow>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                                <ContentCard>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <img src="/img/gas_price.svg" width="90px"/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span className='dash-upper-line-card-title'>GAS PRICE</span><br/>
                                            <span className='dash-upper-line-card-value' style={{color: '#FD8900'}}>{gasUsed === undefined ? '' : gasUsed} gwei</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                                <ContentCard>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                            <img src="/img/gas_limit.svg" width="90px"/>
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                            <span className='dash-upper-line-card-title'>GAS LIMIT</span><br/>
                                            <span className='dash-upper-line-card-value' style={{color: '#F74B4B'}}>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                        <ContentRow>
                            <ContentCol>
                                <ContentCard style={{height: '325px'}}>
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
                <ContentRow>
                    <ContentCol xl={6} noMarginBottom={true}>
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
                    <ContentCol xl={6} noMarginBottom={true}>
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
                                            borderColor: '#FFD162',
                                            borderWidth: 2,
                                            pointRadius: 0,
                                            pointHoverBorderWidth: 1
                                        }
                                    ]
                                }}
                                height={40}
                                options={{
                                    scales: {
                                        xAxes: [
                                            {
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
                                                display: true,
                                                ticks: {
                                                    suggestedMin: 0,
                                                    suggestedMax: 60
                                                },
                                                gridLines: {
                                                    display:false,
                                                    color:'white'
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