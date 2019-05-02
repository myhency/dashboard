import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { FiHeart, FiActivity, FiUser, FiDatabase } from 'react-icons/fi';

class Home extends Component {
    render() {
        return (
            <Fragment>
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
                <ContentRow>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard inverse backgroundColor='#e06377' borderColor='#e06377'>
                        {/* <ContentCard> */}
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiHeart size={100} color="#fff" />
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>HITS</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>9,482</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard inverse backgroundColor='#8B9DC3' borderColor='#8B9DC3'>
                        {/* <ContentCard> */}
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiUser size={100} color="#fff"/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Users</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>940</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard inverse backgroundColor='#339AED' borderColor='#339AED'>
                        {/* <ContentCard> */}
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiActivity size={100} color='#fff'/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Progress</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>50 %</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                    <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                        <ContentCard inverse backgroundColor='#34A853' borderColor='#34A853'>
                        {/* <ContentCard> */}
                            <ContentRow>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'center'}}>
                                    <FiDatabase size={100} color='#fff'/>
                                </Col>
                                <Col xl={6} lg={6} md={6} sm={6} xs={6} style={{textAlign:'left'}}>
                                    <span style={{fontSize:'1.6rem'}}>Database</span><br/>
                                    <span style={{fontSize:'2.6rem', fontWeight:'bold'}}>940 KB</span>
                                </Col>
                            </ContentRow>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
                <ContentRow>
                    <ContentCol xl={6} lg={6} md={12} sm={12} xs={12}>
                        <ContentCard title="Sales Chart">
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
                    <ContentCol xl={6} lg={6} md={12} sm={12} xs={12}>
                        <ContentCard title="Bordered Table">
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Car</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>kwonssy02</td>
                                        <td>Tom</td>
                                        <td>28</td>
                                        <td>Santafe</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>johnf</td>
                                        <td>John Doson</td>
                                        <td>23</td>
                                        <td>Tucson</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>watchApple</td>
                                        <td>Steve</td>
                                        <td>50</td>
                                        <td>Avante</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>sin</td>
                                        <td>Gang</td>
                                        <td>12</td>
                                        <td>Sorento</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        );
    }
}

export default Home;