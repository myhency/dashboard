import React, { Component, Fragment } from 'react'
import { Table, Input, Badge } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import { FaCopy } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import Fetch from 'utils/Fetch.js';
import { Link } from 'react-router-dom';
import moment from 'moment';

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
    Fetch.GET('/api/transaction/'+this.state.TxHash)
    .then(res => {
      //update 안할 때
      if(res === undefined){
        return;
      }

      this.setState({
        passSec: 0,
        status: res.status,
        relatedBlock: res.related_block.number,
        timestamp: res.timestamp,
        txFrom: res.transaction_from,
        txTo : res.transaction_to,
        value: res.value,
        gasLimit: res.gas,
        gasUsedByTx: res.gas * res.gas_price,
        gasPrice: res.gas_price,
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
        <ContentCard detailCard={true} noMarginBottom={true}>
          <Table bordered style={{height: '30px', marginBottom: '0px'}}>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Transaction Hash:
                </td>
                <td style={{width: '80%'}}>
                    {TxHash}
                    <span className="copyicon" data-tip='Copy'>
                    <CopyToClipboard text={TxHash}> 
                        <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                    </span>
                    <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Status:
                </td>
                <td>{status}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Block:
                </td>
                <td><Link to={`/main/scanner/block/${relatedBlock}`}>{relatedBlock}</Link></td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Timestamp:
                </td>
                <td><img src='/img/clock.svg' height='15px'/>&nbsp;{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; From:
                </td>
                <td>
                  <Link to={`/main/scanner/address/${txFrom}`}>{txFrom}</Link>
                  <span data-tip='Copy' className="copyicon">
                    <CopyToClipboard text={txFrom}> 
                      <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; To:
                </td>
                <td>
                  <Link to={`/main/scanner/address/${txTo}`}>{txTo}</Link>
                  <span data-tip='Copy' className="copyicon">
                    <CopyToClipboard text={txTo}> 
                      <FaCopy style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip/>
                </td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Value:
                </td>
                <td><h5>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black'}}> 
                    {value} Eth
                 </Badge>
                </h5></td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Transaction Fee:
                </td>
                <td><h5>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black'}}> 
                    {txFee} Eth
                 </Badge>
                </h5></td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Gas Limit:
                </td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Gas Used by Transaction:
                </td>
                <td>{gasUsedByTx} ({gasUsedByTx/gasLimit*100}%)</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Gas Price:
                </td>
                <td><h5>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#E3AE71', color: 'black'}}> 
                    {gasPrice} Eth
                  </Badge>
                </h5>({gasPrice*10^9} Gwei)</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Nonce:
                </td>
                <td>{nonce}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Input Data:
                </td>
                <td><Input readOnly type="textarea" value={txInput} rows={5}/></td>
              </tr>
            </tbody>
          </Table>
        </ContentCard>
      </Fragment>
    )
  }
}
