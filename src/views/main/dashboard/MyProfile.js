import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';



class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xs="auto">
                        <ContentRow >
                            <img alt="copy" src={'/img/frame.png'} />
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <h4 style={{ color: 'white' }}>James</h4>
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Button>Edit Profile</Button>
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
                                            <p style={{ color: 'lightyellow' }}>James</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Role</h5>
                                            <p style={{ color: 'lightyellow' }}>Admin</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Name</h5>
                                            <p style={{ color: 'lightyellow' }}>James</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Email</h5>
                                            <p style={{ color: 'lightyellow' }}>james@gmail.com</p>

                                        </ContentCol>
                                    </ContentRow>
                                </ContentCard>
                            </TabPane>
                        </TabContent>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default MyProfile;
