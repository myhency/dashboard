import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Col, Table, Button } from 'reactstrap';
import Sweetalert from 'sweetalert2-react';


export default class supplyChain extends Component {
  constructor(props) {
    super(props);

    this.state={
      accountName: undefined,
      accountRole: undefined,
      accountArr: [],
      accountSelected: undefined,
      newAccountPopup: false,
      newProjectPopup: false
    }
  }

  togglekNewAccount = () => {
    this.setState({
      newAccountPopup: !this.state.newAccountPopup
    });
  }

  render() {
    const { accountName, accountRole } = this.state;

    return (
      <Fragment>
        <ContentRow>
          <ContentCol xl={3} lg={6} md={12} sm={12} xs={12}>
            <ContentCard>
              <span style={{fontSize:'1.2em', lineHeight:3}}>Current Demo Account</span>
              <Table bordered>
                <tbody>
                  <tr style={{borderCollapse: '0'}}>
                    <td style={{width: '60%'}}>Account Name:</td>
                    <td style={{width: '40%'}}>{accountName}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>Role:</td>
                    <td>{accountRole}</td>
                  </tr>
                </tbody>
              </Table>
              <br/><br/><br/>
              <span style={{fontSize:'1.2em', lineHeight:3}}>Demo Account List</span>
              <Table bordered style={{textAlign: 'center'}}>
                <thead>
                  <tr>
                    <th>Account Name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{width: '50%'}}></td>
                    <td style={{width: '50%'}}>{accountName}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td></td>
                    <td>{accountRole}</td>
                  </tr>
                </tbody>
              </Table>
              <ContentCol right>
                <Button color='primary' onClick={this.togglekNewAccount}>
                  Create a Demo Account
                </Button>
                <Sweetalert
                  show={this.state.newAccountPopup}
                  onConfirm={()=>this.togglekNewAccount}
                  showCancleButton
                />
              </ContentCol>
            </ContentCard>
          </ContentCol>
          <ContentCol ContentCol xl={9} lg={6} md={12} sm={12} xs={12}>
            <ContentCard>
              <ContentRow style={{height: '500'}}>  <ContentCol md={6}>
                  <span style={{fontSize:'1.2em', lineHeight:3}}>Projects</span>
                </ContentCol>
                <ContentCol right md={6} verticalCenter>
                  <Button outline >
                    Create New Project
                  </Button>
                </ContentCol>
              </ContentRow>
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Desired price</th>
                    <th>Desired delivery date</th>
                    <th>Specification</th>
                    <th>Bid</th>
                  </tr>
                </thead>
              </Table>
            </ContentCard>
          </ContentCol>
        </ContentRow>
      </Fragment>
    )
  }
}
