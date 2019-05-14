import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Col } from 'reactstrap';
import { FiBox } from 'react-icons/fi';
import { MdTimer,MdHourglassEmpty } from 'react-icons/md';
import { TiKeyOutline } from 'react-icons/ti';
import _ from 'lodash';
import moment from 'moment';

import Fetch from 'utils/Fetch.js';
import CustomChart from 'components/CustomChart/CustomChart.js';
import { chartContents } from 'components/CustomChart/Properties.js';


class Monitoring extends Component {

    constructor(props) {
        super(props);
    
        this.state={
          blockNo: undefined,
          gasLimit: undefined,
          gasUsed: undefined,
          timestamp: undefined,
          avgBlockTime: undefined,
          timePass: []
        };
    }

    componentDidMount() {
        this.getBestBlockInfo();
        this.getCurrentTime();

        //1초에 한번씩 백엔드에 요청
        this.intervalId_getBestBlockInfo = setInterval(this.getBestBlockInfo, 1000);
        this.intervalId_getCurrentTime = setInterval(this.getCurrentTime, 1000);  
    }

    componentWillUnmount() {
        clearInterval(this.intervalId_getBestBlockInfo);
        clearInterval(this.intervalId_getCurrentTime);
    }

    getBestBlockInfo = () => {
        Fetch.GET("/api/block/?page_size=10&page=1")
        .then(res => {
            let bestBlock = res.results[0];

            // update 안할 때
            if(this.state.blockNo === bestBlock.number) {
                return;
            }

            let newTime = this.state.timePass;
            if(newTime.length == 10){
                newTime.splice(0,1);
            }
            newTime.push(moment(res.results[0].timestamp).diff(res.results[1].timestamp,'seconds'));
            let avgBlockTime = _.meanBy(newTime);
            console.log(newTime);

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
        if(this.state.passSec === undefined) {
          return;
        }else {
          this.setState({
            passSec: this.state.passSec + 1
          });
        }
      }

    render() {
        const { blockNo, avgBlockTime, gasLimit, gasUsed } = this.state;
        
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center', overflow: 'hidden'}}>
                                    <FiBox size={100} color="#e06377" />
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'0.8rem'}}>BEST BLOCK</span><br/>
                                    <span style={{fontSize:'1.5rem', fontWeight:'bold'}}># {blockNo === undefined ? '' : blockNo}</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <MdTimer size={100} color='#339AED'/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'1.0rem'}}>AVG BLOCK TIME</span><br/>
                                    <span style={{fontSize:'2.0rem', fontWeight:'bold'}}>{avgBlockTime} s</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#8B9DC3' borderColor='#3B5998'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <MdHourglassEmpty size={100} color="#8B9DC3"/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'1.0rem'}}>GAS PRICE</span><br/>
                                    <span style={{fontSize:'2.0rem', fontWeight:'bold'}}>{gasUsed === undefined ? '' : gasUsed} gwei</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={4} lg={4} md={4} sm={4} xs={4} style={{textAlign:'center'}}>
                                    <TiKeyOutline size={100} color='#34A853'/>
                                </Col>
                                <Col xl={8} lg={8} md={8} sm={8} xs={8} style={{textAlign:'left', lineHeight:2}}>
                                    <span style={{fontSize:'1.0rem'}}>GAS LIMIT</span><br/>
                                    <span style={{fontSize:'1.5rem', fontWeight:'bold'}}>{gasLimit === undefined ? '' : gasLimit} gas</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12} >
                        <ContentCard >
                            <ContentRow>
                                <ContentCol>
                                </ContentCol>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
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
                        <ContentRow>
                            <ContentCol xl={12}>
                                {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                                <CustomChart
                                    title='Transactions Per Block'
                                    category='During 5 min'
                                    content={chartContents.barDifficulty}
                                    interval={10} />
                                {/* <ContentCard>
                                    <ContentRow>
                                        <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                            <span style={{fontSize:'1.0rem'}}>Transaction Per Block</span><br/>
                                            <CustomChart
                                                category='During 5 min'
                                                content={chartContents.barDifficulty}
                                                interval={10}
                                                // color='green'
                                                // criticalValue={10}
                                                // criticalColor='blue'
                                            />
                                        </Col>
                                    </ContentRow> 
                                </ContentCard>*/}
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Monitoring;