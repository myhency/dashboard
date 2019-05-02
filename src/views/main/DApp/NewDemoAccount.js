import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Row, Col, Button } from 'reactstrap';

export default class NewDemoAccount extends Component {
  render() {
    return (
      <Fragment>
          <ContentCard>
            <span style={{fontSize:'1.2em', lineHeight:3}}>New Demo Account</span>
            <Table bordered>
            <tbody>
                <tr style={{borderCollapse: '0'}}>
                <td style={{width: '30%'}}>Name</td>
                <td style={{width: '70%'}}></td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                <td>Role</td>
                <td></td>
                </tr>
            </tbody>
            </Table>
          </ContentCard>
      </Fragment>
    )
  }
}
