import React, { Component, Fragment } from 'react'
import { Table, Input } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import { FaCopy } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import Fetch from 'utils/Fetch.js';
import { Link } from 'react-router-dom';


export default class TxInfo extends Component {

  constructor(props){
      super(props);

      this.state=({
          TxHash: this.props.match.params.transactionHash,
          passSec: undefined,
          status: undefined,
          relatedBlock: undefined,
          timestamp: undefined,
          txFrom: undefined,
          txTo : undefined,
          value: undefined,
          txFee: undefined,
          gasLimit: undefined,
          gasUsedByTx: undefined,
          gasPrice: undefined,
          nonce: undefined,
          txInput: undefined
      })
  }

  componentDidMount() {
    this.getTxInfo();
  }

  getTxInfo = () => {
    Fetch.GET('/api/scanner/transaction/'+this.state.TxHash)
    .then(res => {
      //update 안할 때
      if(res === undefined){
        return;
      }

      this.setState({
        passSec: 0,
        status: res.status,
        relatedBlock: res.related_block_number,
        timestamp: res.timestamp,
        txFrom: res.transaction_from,
        txTo : res.to,
        value: res.value,
        txFee: res.txFee,
        gasLimit: res.gasLimit,
        gasUsedByTx: res.gasUsedByTx,
        gasPrice: res.gasPrice,
        nonce: res.nonce,
        txInput: res.transaction_input
      });
    })
    .catch(error => {
        console.log(error);
    })
  }

  //prop이 바뀜을 catch
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.transactionHash !== state.TxHash) {
      return{
        TxHash: props.match.params.transactionHash
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.TxHash !== this.state.TxHash) {
      this.getTxInfo();
    }
  }

  
  render() {
    const { TxHash, passSec, status, relatedBlock, timestamp, txFrom, txTo, value,
      txFee, gasLimit, gasUsedByTx, gasPrice, nonce, txInput} = this.state;

    return (
      <Fragment>
        <ContentCard style={{paddingLeft: '150px', paddingRight: '150px'}}>
          <Table bordered style={{height: '30px'}}>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>Transaction Hash:</td>
                <td style={{width: '80%'}}>
                    {TxHash}
                    <span data-tip='Copy'>
                    <CopyToClipboard text={TxHash}> 
                        <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                    </span>
                    <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>Block:</td>
                <td><Link to={`/main/scanner/block/${+relatedBlock}`}>{relatedBlock}</Link></td>
              </tr>
              <tr>
                <td>Timestamp:</td>
                <td>{timestamp}</td>
              </tr>
              <tr>
                <td>From:</td>
                <td>
                  {txFrom}
                  <span data-tip='Copy'>
                    <CopyToClipboard text={txFrom}> 
                      <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>To:</td>
                <td>
                  {txTo}
                  <span data-tip='Copy'>
                    <CopyToClipboard text={txTo}> 
                      <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>Value:</td>
                <td>{value} Ether</td>
              </tr>
              <tr>
                <td>Transaction Fee:</td>
                <td>{txFee} Ether</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td>Gas Used by Transaction:</td>
                <td>{gasUsedByTx} ({gasUsedByTx/gasLimit*100}%)</td>
              </tr>
              <tr>
                <td>Gas Price:</td>
                <td>{gasPrice} Ether ({gasPrice*10^9} Gwei)</td>
              </tr>
              <tr>
                <td>Nonce:</td>
                <td>{nonce}</td>
              </tr>
              <tr>
                <td>Input Data:</td>
                <td><Input readOnly type="textarea" placeholder={txInput} rows={5}/></td>
              </tr>
            </tbody>
          </Table>
        </ContentCard>
      </Fragment>
    )
  }
}
