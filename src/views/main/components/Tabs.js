import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Badge } from 'reactstrap';
import { FiAlertTriangle, FiAnchor, FiArchive } from 'react-icons/fi';
import classnames from 'classnames';
import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';

class Tabs extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            activeTab2: '2'
        };
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggle2(tab) {
        if (this.state.activeTab2 !== tab) {
            this.setState({
                activeTab2: tab
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Row>
                    <ContentCol xl="6" lg="6" md="12" sm="12" xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                    Tab1{' '}<Badge color="success">new</Badge>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                    Other Tab
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                >
                                    Last Tabs{' '}<Badge color="danger">3</Badge>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <ContentCard style={{borderTop:'0px'}}>
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                            <TabPane tabId="2">
                                <ContentCard style={{borderTop:'0px'}}>
                                    2. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                            <TabPane tabId="3">
                                <ContentCard style={{borderTop:'0px'}}>
                                    3. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                        </TabContent>
                    </ContentCol>

                    <ContentCol xl="6" lg="6" md="12" sm="12" xs="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab2 === '1' })}
                                onClick={() => { this.toggle2('1'); }}
                                >
                                    <FiAlertTriangle size="17"/>{' '}Tab1
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab2 === '2' })}
                                onClick={() => { this.toggle2('2'); }}
                                >
                                    <FiAnchor size="17"/>{' '}Other Tab
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab2 === '3' })}
                                onClick={() => { this.toggle2('3'); }}
                                >
                                    <FiArchive size="17"/>{' '}Last Tabs
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab2}>
                            <TabPane tabId="1">
                                <ContentCard style={{borderTop:'0px'}}>
                                    1. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                            <TabPane tabId="2">
                                <ContentCard style={{borderTop:'0px'}}>
                                    2. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                            <TabPane tabId="3">
                                <ContentCard style={{borderTop:'0px'}}>
                                    3. No comfort do written conduct at prevent manners on. Celebrated contrasted discretion him sympathize her collecting occasional. Do answered bachelor occasion in of offended no concerns. Supply worthy warmth branch of no ye. Voice tried known to as my to. Though wished merits or be. Alone visit use these smart rooms ham. No waiting in on enjoyed placing it inquiry. 
                                </ContentCard>
                            </TabPane>
                        </TabContent>
                    </ContentCol>
                </Row>
            </Fragment>
        );
      }
}

export default Tabs;