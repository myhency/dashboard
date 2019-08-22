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
import * as d3 from "d3";
import swal from 'sweetalert2';


import Fetch from 'utils/Fetch.js';
import jQuery from "jquery";


window.$ = window.jQuery = jQuery;

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
            timePass: [],                 // average block time 계산
            node: [],
            pendingTx: [],                // key가 hash, value가 시간
            cardPosition: undefined,
            passSec: undefined,
            difficulty: undefined,
            txPerBlock: [],            // transaction per block 
            tbpLabels: [],            // transaction per block label
            miningBlock: [],             // recent mining block info
            nodeState: {},       // node state json => disconnect, fork, connect
            angle: 0,      // 그림 회전 각도, 여기부터 d3쪽에서 사용할 state
            numOfNodes: 0,
            simulation: {},
            xcenter: 0,
            ycenter: 0,
            nodeImgSize: 0,
            socketError: false
        };

        socket = io.connect('/socket');
        window.addEventListener('resize', this.updatePosition);


    }

    componentDidMount() {
        this.getCurrentTime();

        // web socket 연결 
        socket.on('connect', () => {
            socket.emit("requestNodeList")
            this.setState({
                socketError: false
            })
        });

        socket.on('connect_error', (error) => {
            if (!this.state.socketError) {
                this.setState({
                    socketError: true
                })
                swal.fire(
                    'Node Monitoring Server error!',
                    'Please check your server status',
                    'error'
                );
            }
        })

        // 처음에 노드 리스트 왔을 때 
        socket.on('responseNodeList', (data) => {
            let nodeState = {};
            // 첫 state는 red(disconncet)로 초기화
            for (var i = 0; i < data.length; i++) {
                nodeState[data[i].id] = 'disconnect'
            }
            this.setState({
                node: data,
                nodeState: nodeState
            })

            this.updatePosition();
        });

        socket.on('nodeStatus', (data) => {
            let changeState = this.state.nodeState;
            let isFork = false;

            // connect이 와도 다른 애들이 fork면 fork로 표시
            jQuery.each(changeState, function (id, state) {
                if (state === 'fork') {
                    isFork = true;
                    return;
                }
            });

            if (isFork && data.status === 'connect')
                changeState[data.id] = 'fork';
            else
                changeState[data.id] = data.status;

            this.setState({
                nodeState: changeState
            })
            this.updateNode();
        });

        socket.on('pendingTransaction', (data) => {
            let pendingTimeTx = [];
            let prevList = this.state.pendingTx;
            // 최근에 온게 리스트 뒤쪽에 오도록
            for (var i = data.length - 1; i >= 0; i--) {
                let txHash = data[i];
                let temp = { 'time': 0, 'hash': txHash };
                var index = _.indexOf(prevList, _.find(prevList, { 'hash': txHash }));
                if (index >= 0) {
                    temp.time = prevList[index].time + 1;
                }
                pendingTimeTx.push(temp);
            }
            this.setState({
                pendingTx: pendingTimeTx
            })
        });

        socket.on('blockMiner', (data) => {
            this.miningNode(data);
        });

        socket.on('uncle', (data) => {
            let changeState = this.state.nodeState;
            let node = this.state.node;

            // disconnect인 경우 바꾸지 않음
            for (var i = 0; i < node.length; i++) {
                changeState[node[i].id] = changeState[node[i].id] === 'disconnect' ? 'disconnect' :
                    data.value ? 'fork' : 'connect'
            }

            this.setState({
                nodeState: changeState
            });
            this.updateNode();
        });

        //1초에 한번씩 백엔드에 요청
        this.getFirstInfo();
        this.intervalId_getInfo = setInterval(this.updateDashboardInfo, 3000);
        this.intervalId_getCurrentTime = setInterval(this.getCurrentTime, 1000);
        this.intervalId_getPendingTx = setInterval(() => socket.emit("requestPendingTx"), 1000);

        this.setState({
            cardPosition: ReactDOM.findDOMNode(this.svgCard).getBoundingClientRect()
        });

        setInterval(() => {
            this.updateTime();          // 그림을 몇초마다 리프레쉬할지 정함
        }, 10);

    }

    componentWillUnmount() {
        socket.disconnect();
        clearInterval(this.intervalId_getInfo);
        clearInterval(this.intervalId_getCurrentTime);
        clearInterval(this.getPendingTx);
        window.removeEventListener('resize', this.updatePosition);
    }

    // 첫번째는 최대 60개까지 불러옴
    getFirstInfo = () => {
        Fetch.GET('/api/block/?page_size=61&page=1')
            .then(res => {
                let newTime = [];
                let tpb = [];
                let labels = [];

                for (var i = res.results.length - 1; i > 0; i--) {
                    newTime.push(moment(res.results[i - 1].timestamp).diff(res.results[i].timestamp, 'seconds'));
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

    // 두번째 부터는 하나씩 값 갖고오기
    updateDashboardInfo = () => {
        Fetch.GET('/api/block/?page_size=2&page=1')
            .then(res => {
                let bestBlock = res.results[0];
                // update 안할 때
                if (this.state.blockNo === bestBlock.number) {
                    return;
                }

                let timePass = this.state.timePass.slice();
                let txPerBlock = this.state.txPerBlock.slice();
                let tbpLabels = this.state.tbpLabels.slice();

                if (this.state.timePass.length >= 60) {
                    timePass.splice(0, 1);
                    txPerBlock.splice(0, 1);
                    tbpLabels.splice(0, 1);
                }

                timePass.push(moment(bestBlock.timestamp).diff(res.results[1].timestamp, 'seconds'));
                txPerBlock.push(bestBlock.transaction_count);
                tbpLabels.push(bestBlock.number);

                let avgBlockTime = _.meanBy(timePass).toFixed(3);

                this.setState({
                    blockNo: bestBlock.number,
                    gasLimit: bestBlock.gas_limit,
                    gasUsed: bestBlock.gas_used,
                    timestamp: bestBlock.timestamp,
                    avgBlockTime: avgBlockTime,
                    timePass: timePass,
                    passSec: 0,
                    txPerBlock: txPerBlock,
                    tbpLabels: tbpLabels,
                    difficulty: bestBlock.difficulty
                });

            })
            .catch(error => {
                console.log(error);
            })
    }

    // pass sec 처리
    getCurrentTime = () => {
        if (this.state.passSec === undefined) {
            return;
        } else {
            this.setState({
                passSec: this.state.passSec + 1
            });
        }
    }

    // window resize 
    updatePosition = () => {
        if (this.state.node.length > 0) {
            if (ReactDOM.findDOMNode(this.svgCard) === undefined)
                return;
            let cardPosition = ReactDOM.findDOMNode(this.svgCard).getBoundingClientRect();
            this.setState({
                numOfNodes: this.state.node.length,
                simulation: d3.forceSimulation()
                    .force("link", d3.forceLink().id(function (d) { return d.id; }))
                    .force('charge', d3.forceManyBody()
                        .strength((-25000) / this.state.node.length)
                        .theta(0.1)
                    )
                    .force("center", d3.forceCenter()
                        .x(cardPosition.width / 2)
                        .y(cardPosition.height / 2)), // center of the picture
                xcenter: cardPosition.width / 2,      // rotational center of the picture
                ycenter: cardPosition.height / 2,
                nodeImgSize: cardPosition.width * cardPosition.height * 0.0009 / this.state.node.length,
                cardPosition: cardPosition
            })

            this.drawFrame();
            this.updateNode();
        }
    }

    updateNode = () => {
        let nodeState = this.state.nodeState;
        let disconnectNode = [];

        // 노드 색 변경
        jQuery.each(nodeState, function (id, state) {
            let color = state === 'fork' ? 'yellow' : 'green';
            // discconnect 일때는 무조건 red
            if (state === 'disconnect') {
                color = 'red';
                disconnectNode.push(id);
            }
            let changeNodeImg = '/img/blockchain_' + color + '.svg';

            // node image 태그 가져오기
            let imageTag = d3.select(`image[id='${id}']`);
            // 노드 이미지 변경
            imageTag.attr("href", changeNodeImg);
        })

        // 먼저 선을 다 살리고
        d3.selectAll(`line[src]`).attr("style", "display:true");

        // disconnect인 것들 선을 없앰
        disconnectNode.forEach(id => {
            d3.selectAll(`line[src='${id}']`).attr("style", "display:none");
            d3.selectAll(`line[target='${id}']`).attr("style", "display:none");
        })

    }

    miningNode = (data) => {
        let miner = data.miner;

        // node image 태그 가져오기
        let imageTag = d3.select(`image[id='${miner}']`);

        var blinkNode = setInterval(function () {
            imageTag.attr("style", "opacity:0.7");
            setTimeout(() => {
                imageTag.attr("style", "opacity:1");
            }, 150);
        }, 300);

        setTimeout(function () {
            clearTimeout(blinkNode);
        }, 1000);

    }

    // d3 움직임 정도
    updateTime() {
        this.setState({
            angle: this.state.angle + 0.07     //그림을 얼마만큼 회전시킬지 정함
        });
        if (this.state.angle > 360) {    //그림이 한 바퀴 다 돌면 다시 0도 부터 시작함
            this.setState({
                angle: 0
            });
        }
        this.moveNodes('g', this.state.angle)
        this.moveNodes('g.images', this.state.angle)
        this.moveNodes('g.labels', this.state.angle)
    }

    // d3 움직이기
    moveNodes(type, pAngle) {
        let xcenter = this.state.xcenter;
        let ycenter = this.state.ycenter;
        const transform = `rotate(${pAngle},${xcenter},${ycenter})`
        this.svg.select(type)
            .attr('transform', () => transform)
    }

    // d3 그리기
    drawFrame() {
        let State = this.state;

        let links = [];
        for (var i = 0; i < State.node.length; i++) {          // 노드 개수별로 선긋기
            for (var j = i + 1; j < State.node.length; j++) {
                links.push({ source: State.node[i].id, target: State.node[j].id, value: 1 });
            }
        }

        let nodes = _.map(State.node, (node) => {
            return { id: node.id, group: 1, img: "/img/blockchain_green.svg" };
        });

        this.svg.selectAll('*').remove();

        let link = this.svg.append("g")
            .attr("class", "stroke")
            .style("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("src", function (l) { return l.source })
            .attr("target", function (l) { return l.target });

        let node = this.svg.append("g")
            .attr("class", "images")
            .selectAll("g.images")
            .data(nodes)
            .enter().append("image")
            .attr("id", function (d) { return d.id; })
            .attr("xlink:href", function (d) { return d.img; })
            .attr("width", State.nodeImgSize)
            .attr("height", State.nodeImgSize);

        // let label = this.svg.append("g")
        //     .attr("class", "labels")
        //     .selectAll("text")
        //     .data(nodes)
        //     .enter().append("text")
        //     .attr("class", "label")
        //     .attr("class", "fa")
        //     .attr('font-size', function (d) { return '20px' })
        //     .text(function (d) { return d.id });



        State.simulation
            .nodes(nodes)
            .on("tick", ticked);

        State.simulation
            .force("link")
            .links(links);

        let nodeG = State.nodeImgSize * 0.5; //node image 무게중심 구하기
        // let labelGX = State.nodeImgSize * 0.05; //node image 무게중심 구하기
        // let labelGY = State.nodeImgSize * 0.13; //node image 무게중심 구하기



        // mouseover시 tooltip에 node 정보 추가
        node.on('mouseover', function (d) {
            d3.select("#tooltip")
                .style("right", "0px")
                .style("top", "0px")
                .select('#info')
                .html(tooltipText(d, State));

            d3.select("#tooltip").classed("hidden", false);
        })
            .on('mouseout', function () {
                d3.select("#tooltip").classed("hidden", true);
            })

        function tooltipText(d, stateParam) {
            let info;
            let myNode = stateParam.node[d.id - 1];
            let myStatus = stateParam.nodeState[d.id];

            info = '<p>id: ' + myNode.id + '</p>'
                + '<p>ip: ' + myNode.ip + '</p>'
                + '<p>port: ' + myNode.port + '</p>'
                + '<p>status: ' + myStatus + '</p>';


            return info;
        }


        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("x", function (d) { return d.x - nodeG; })
                .attr("y", function (d) { return d.y - nodeG; });

            // label
            //     .attr("x", function (d) { return d.x - labelGX; })
            //     .attr("y", function (d) { return d.y - labelGY; })
            //     .style("font-size", "16px").style("fill", "#000");
        }
    }



    render() {
        const { blockNo, avgBlockTime, gasLimit, gasUsed, passSec, difficulty,
            tbpLabels, txPerBlock, timePass, pendingTx } = this.state;

        // pending Transaction Table 
        var rows = [];
        pendingTx.forEach((txInfo) => {
            rows.push(
                <tr key={txInfo.hash}>
                    <td>{txInfo.time}s ago</td>
                    <td className="ellipsis">{txInfo.hash}</td>
                </tr>
            );
        });
        for (var i = 0; i < 5 - pendingTx.length; i++) {
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
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <img alt="BEST BLOCK" src="/img/best_block.svg" width="90px" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title' >BEST BLOCK</span><br />
                                    <span className='dash-upper-line-card-value' style={{ color: '#B648F6' }}># {blockNo === undefined ? '' : blockNo}</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <img alt="LAST BLOCK" src="/img/last_block.svg" width="90px" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title' >LAST BLOCK</span><br />
                                    <span className='dash-upper-line-card-value' style={{ color: '#0F9EDB' }}>{passSec === undefined ? '' : passSec} s ago</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <img alt="AVG BLOCK TIME" src="/img/avg_block_time.svg" width="90px" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title'>AVG BLOCK TIME</span><br />
                                    <span className='dash-upper-line-card-value' style={{ color: '#7BCC3A' }}>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                    <img alt="DIFFICULTY" src="/img/difficulty.svg" width="90px" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                    <span className='dash-upper-line-card-title'>DIFFICULTY</span><br />
                                    <span className='dash-upper-line-card-value' style={{ color: '#FFD162' }}>{difficulty === undefined ? '' : difficulty} H</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentCard imgBackground={true} ref={(ref) => { this.svgCard = ref; }}>
                            <svg width="100%" height="450"//width="620" height="450"  //켄버스 크기
                                ref={handle => (this.svg = d3.select(handle))}>
                            </svg>
                            <div id="tooltip" className="hidden">
                                <p><strong>Node information</strong></p>
                                <p><span id="info"></span></p>
                            </div>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                        <ContentRow>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} noMarginBottom={true}>
                                <ContentCard>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                            <img alt="GAS USED" src="/img/gas_used.svg" width="90px" />
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                            <span className='dash-upper-line-card-title'>GAS USED</span><br />
                                            <span className='dash-upper-line-card-value' style={{ color: '#FD8900' }}>{gasUsed === undefined ? '' : gasUsed} gas</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                            <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                                <ContentCard>
                                    <ContentRow>
                                        <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{ textAlign: 'center' }}>
                                            <img alt="GAS LIMIT" src="/img/gas_limit.svg" width="90px" />
                                        </Col>
                                        <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{ textAlign: 'left', lineHeight: 2 }}>
                                            <span className='dash-upper-line-card-title'>GAS LIMIT</span><br />
                                            <span className='dash-upper-line-card-value' style={{ color: '#F74B4B' }}>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                        </Col>
                                    </ContentRow>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                        <ContentRow>
                            <ContentCol>
                                <ContentCard style={{ height: '289px' }} bodyNoPaddingBottom={true} className="scrollbar" id="style-2">
                                    <Col style={{ textAlign: 'left', marginBottom: '10px' }}>
                                        <span className='dash-upper-line-card-title'>Pending Transactions</span>
                                    </Col>
                                    <div style={{ maxHeight: '230px', overflowY: 'auto', width: '100%' }}>
                                        <Table striped style={{ width: '100%', tableLayout: 'fixed' }}>
                                            <thead style={{ textAlign: 'center' }}>
                                                <tr>
                                                    <th style={{ width: '15%' }}>Pending..</th>
                                                    <th style={{ width: '85%' }}>txHash</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows}
                                            </tbody>
                                        </Table>
                                        {pendingTx.length === 0 &&
                                            <div style={{
                                                display: 'block',
                                                position: 'absolute',
                                                left: '38%',
                                                top: '50%',
                                                color: 'white'
                                            }}>No Pending Transactions</div>}
                                    </div>
                                </ContentCard>
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} noMarginBottom={true}>
                        <ContentCard>
                            <span className='dash-upper-line-card-title'>Transaction Per Block</span><br /><br />
                            <div> {/* IE 대응 */}
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
                                                    gridLines: {
                                                        display: false,
                                                        color: 'white'
                                                    },
                                                    ticks: {
                                                        display: false
                                                    }
                                                }
                                            ],
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        suggestedMin: 0,
                                                        suggestedMax: 5,
                                                        interval: 1,
                                                        display: false
                                                    },
                                                    gridLines: {
                                                        display: false,
                                                        color: 'white'
                                                    }
                                                }
                                            ]
                                        }
                                    }}
                                    legend={{
                                        display: false
                                    }}
                                />
                            </div>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} noMarginBottom={true}>
                        <ContentCard>
                            <span className='dash-upper-line-card-title'>Block Generation Time</span><br /><br />
                            <div> {/* IE 대응 */}
                                <Line
                                    data={{
                                        labels: tbpLabels,
                                        datasets: [
                                            {
                                                label: "Block Generation Time",
                                                data: timePass,
                                                borderColor: '#FFD162',
                                                borderWidth: 2,
                                                pointRadius: 1,
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
                                                        display: false,
                                                        color: 'white'
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
                                                        suggestedMax: 30,
                                                        display: false
                                                    },
                                                    gridLines: {
                                                        display: false,
                                                        color: 'white'
                                                    }
                                                }
                                            ]
                                        },
                                    }}
                                    legend={{
                                        display: false
                                    }}
                                />
                            </div>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Monitoring;