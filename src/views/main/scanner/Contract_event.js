import React, { Component } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table } from 'reactstrap';

export default class Contract_event extends Component {
  render() {
    return (
      <ContentCard style={{margin: '0', border: 0}}>
        <br/>
        <span>Latest 25 transactions from a total 164,647 transactions.<br/></span>
        <span>Tip: Event Logs are used by developers/external UI providers for keeping track of contract actions and for auditing.<br/><br/></span>
        <Table bordered>
            <thead style={{backgroundColor:'skyblue', textAlign: 'center'}}>
              <tr>
                <th>TxHash | Block | Age</th>
                <th>Method</th>
                <th>Event Logs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>7352776</td>
                <td>Miner 어쩌구저쩌구</td>
                <td>2.03195 Eth</td>
              </tr>
            </tbody>
        </Table>
      </ContentCard>
    )
  }
}
