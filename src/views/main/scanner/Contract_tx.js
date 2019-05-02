import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table } from 'reactstrap';

export default class Contract_tx extends Component {
  render() {
    return (
        <ContentCard style={{margin: '0', border: 0}}>
            <br/>
            <span>Latest 25 transactions from a total 164,647 transactions.<br/><br/></span>
            <Table bordered>
                <thead style={{backgroundColor:'skyblue', textAlign: 'center'}}>
                  <tr>
                    <th>TxHash</th>
                    <th>Block</th>
                    <th>Age</th>
                    <th>From</th>
                    <th> </th>
                    <th>To</th>
                    <th>Value</th>
                    <th>[TxFee]</th>
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
