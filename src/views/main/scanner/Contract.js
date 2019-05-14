import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import classnames from 'classnames';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { setInfo } from 'store/modules/currentInfo';

import Tx from 'views/main/scanner/Contract_tx.js';
import Code from 'views/main/scanner/Contract_code.js';
import Event from 'views/main/scanner/Contract_event.js';

class Contract extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        }
    }

    componentDidMount() {
        this.getContractInfo();
        this.getContractTransaction();
    }

    getContractInfo(){

    }

    getContractTransaction(){
        this.props.dispatch(setInfo(this.props.match.params.contract));
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
              <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                <ContentCard style={{padding: '0'}}>
                    <Table style={{margin: '0'}}>
                        <thead>
                            <tr>
                                <th colSpan='2' >Contract Overview</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{width: '40%'}}>Balance:</td>
                                <td style={{width: '60%'}}>0 Ether</td>
                            </tr>
                            <tr>
                                <td>Transactions:</td>
                                <td>19 txs</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>
              </ContentCol>
              <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                <ContentCard style={{padding: '0'}}>
                    <Table style={{margin: '0'}}>
                        <thead>
                            <tr>
                                <th colSpan='2' >Contract Overview</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{width: '40%'}}>Balance:</td>
                                <td style={{width: '60%'}}>0 Ether</td>
                            </tr>
                            <tr>
                                <td>Transactions:</td>
                                <td>19 txs</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>
              </ContentCol>
          </ContentRow>
          <ContentRow>
              <ContentCol>  
                <Nav tabs>
                    <NavItem style={{ width: '33%' }}>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                            Transactions
                        </NavLink>
                    </NavItem>
                    <NavItem style={{ width: '33%' }}>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                            Code
                        </NavLink>
                    </NavItem>
                    <NavItem style={{ width: '34%' }}>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                            Events
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent 
                activeTab={this.state.activeTab} 
                style={{ height: '500px'}}>
                    <TabPane tabId='1'><Tx/></TabPane>
                    <TabPane tabId='2'><Code/></TabPane>
                    <TabPane tabId='3'><Event/></TabPane>
                </TabContent>
              </ContentCol>
          </ContentRow>
      </Fragment>
    )
  }
}

export default connect(null)(Contract);