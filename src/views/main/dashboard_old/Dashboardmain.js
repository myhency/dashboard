import React, { Component, Fragment } from 'react';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import { Button } from 'reactstrap';
import ReactTable from 'react-table';
import EthNodeList from 'views/main/dashboard/EthNodeList';
import { Table, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { FiHeart, FiActivity, FiUser, FiDatabase } from 'react-icons/fi';



class Dashboardmain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [    
                {
                    "nodeName": "hello",
                    "nodeIp": "1.1.1.1",
                    "nodeStatus": "hello",
                    "bootNode": "hello",
                    "miningNode": "hello",
                    "nodeTinyGraph": "hello",
                },
                {
                    "nodeName": "hello2",
                    "nodeIp": "2.2.2.2",
                    "nodeStatus": "hello2",
                    "bootNode": "hello2",
                    "miningNode": "hello2",
                    "nodeTinyGraph": "hello2",
                },
                {
                    "nodeName": "hello3",
                    "nodeIp": "3.3.3.3",
                    "nodeStatus": "hello3",
                    "bootNode": "hello3",
                    "miningNode": "hello3",
                    "nodeTinyGraph": "hello3",
                },
                {
                    "nodeName": "hello4",
                    "nodeIp": "4.4.4.4",
                    "nodeStatus": "hello4",
                    "bootNode": "hello4",
                    "miningNode": "hello4",
                    "nodeTinyGraph": "hello4",
                },
            ]
        }
    }

    render() {
        return (
            <div class="dashboardFrame">
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#e06377' borderColor='#c83349'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiHeart size={100} color="#e06377" />
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>HITS</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>9,482</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#8B9DC3' borderColor='#3B5998'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiUser size={100} color="#8B9DC3"/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Users</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>940</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#339AED' borderColor='#3B5998'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiActivity size={100} color='#339AED'/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Progress</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>50 %</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        {/* <ContentCard inverse backgroundColor='#34A853' borderColor='#A4C639'> */}
                        <ContentCard>
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiDatabase size={100} color='#34A853'/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Database</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>940 KB</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <div class="nodeList">
                    <h2>ETH Node List</h2>
                        <EthNodeList data={this.state.data}/>
                </div>
            </div>
        );
    }
}

export default Dashboardmain;