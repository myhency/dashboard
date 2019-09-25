import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import Fetch from 'utils/Fetch';



class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',

            id: '',
            name: '',
            role: '',
            email: ''
        };
        this.fetchData();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    onclickEdit = () => {
        this.props.history.push('/admin/editprofile' );
    }

    fetchData = () => {
        this.setState({ 
            loading: true 
        });
        Fetch.GET(`/node/admin/profile`)
        .then(res => {
            this.setState({
                id: res.id,
                name: res.name,
                role: res.role,
                email: res.email
            })
        })
        .catch(error => {
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        const { id, name, email, role } = this.state;
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xs="auto">
                        <ContentRow >
                            <img alt="copy" src={'/img/frame.png'} />
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <h4 style={{ color: 'white' }}>{name}</h4>
                        </ContentRow>
                    </ContentCol>
                    <ContentCol>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}>
                                    Overview
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '0' })}
                                    onClick={() => { this.toggle('0'); }}>
                                    Wallet
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <ContentCard>
                                    <ContentRow>
                                        <ContentCol>
                                            <h5 style={{ color: 'white' }}>User account</h5>
                                            <p style={{ color: 'lightyellow' }}>{id}</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Role</h5>
                                            <p style={{ color: 'lightyellow' }}>{role}</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Name</h5>
                                            <p style={{ color: 'lightyellow' }}>{name}</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Email</h5>
                                            <p style={{ color: 'lightyellow' }}>{email}</p>

                                        </ContentCol>
                                    </ContentRow>
                                </ContentCard>
                            </TabPane>
                        </TabContent>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <ContentCol>
                                <Button 
                                    onClick={this.onclickEdit}>Edit Password
                                </Button>                               
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default MyProfile;
