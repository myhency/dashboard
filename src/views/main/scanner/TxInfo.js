import React, { Component, Fragment } from 'react'
import { Table, Input, Badge, Button } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import Fetch from 'utils/Fetch.js';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Validation from 'utils/Validation';
import Decimal from 'decimal.js';

export default class TxInfo extends Component {

  constructor(props){
      super(props);

      this.state=({
          TxHash: this.props.match.params.transactionHash,
          passSec: undefined,
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

      let txFee = Decimal.mul(res.gas_used, res.gas_price);

      this.setState({
        passSec: 0,
        relatedBlock: res.related_block.number,
        timestamp: res.timestamp,
        txFrom: res.transaction_from,
        txTo : res.transaction_to,
        value: res.value,
        txFee: txFee.toNumber(),
        gasLimit: res.gas,
        gasUsed: res.gas_used,
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
    const { TxHash, relatedBlock, timestamp, txFrom, txTo, value,
      txFee, gasLimit, gasPrice, gasUsed, nonce, txInput} = this.state;

    const CopyImg = '/img/copy.svg';

    return (
      <Fragment>
        <ContentCard detailCard={true} noMarginBottom={true}>
          <ContentRow>
            <ContentCol style={{textAlign: 'right'}}>
              <Button onClick={() => this.props.history.push('/main/scanner/transaction')} className='btn-outline-primary'>
                To List
              </Button>
            </ContentCol>
          </ContentRow>
          <Table bordered style={{height: '30px', marginBottom: '0px'}}>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='txHash'
                  data-tip={"A TxHash or transaction hash is a unique 66 <br/> characters identifier that is generated whenever a <br/>transaction is executed."}/>
                  <ReactTooltip id='txHash' multiline={true}/>
                   &nbsp; Transaction Hash:
                </td>
                <td style={{width: '80%'}}>
                    {TxHash}
                    <span className="copyicon" data-tip='Copy' data-for='hashCopy' >
                    <CopyToClipboard text={TxHash} onCopy={() => { this.setState({copied: true}) }}>
                      <img alt="copy" src={CopyImg} height='18px' style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                    </span>
                    <ReactTooltip id='hashCopy' getContent={(dataTip) => {if(this.state.copied) return 'Copied'; else return 'Copy';}} afterHide={() => {this.setState({copied: false}) }}/>
                </td>
              </tr>
              {/* <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='status'
                  data-tip={"The status of the transaction."}/>
                  <ReactTooltip id='status' multiline={true}/>
                   &nbsp; Status:
                </td>
                <td>{status}</td>
              </tr> */}
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='relatedBlock'
                  data-tip={"The number of the block in which the transaction <br/>was recorded. Block confirmation indicate how <br/>many blocks since the transaction is mined."}/>
                  <ReactTooltip id='relatedBlock' multiline={true}/>
                   &nbsp; Block:
                </td>
                <td><Link to={`/main/scanner/block/${relatedBlock}`}>{relatedBlock}</Link></td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='timestamp'
                  data-tip={"The date and time at which a transaction is mined."}/>
                  <ReactTooltip id='timestamp' multiline={true}/>
                   &nbsp; Timestamp:
                </td>
                <td><img alt="clock" src='/img/clock.svg' height='15px'/>&nbsp;{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='txFrom'
                  data-tip={"The sending party of the transcation (could be <br/>from a contract address)."}/>
                  <ReactTooltip id='txFrom' multiline={true}/>
                   &nbsp; From:
                </td>
                <td>
                  <Link to={`/main/scanner/address/${txFrom}`}>{txFrom}</Link>
                  <span data-tip='Copy' className="copyicon" data-for='fromCopy' >
                    <CopyToClipboard text={txFrom} onCopy={() => { this.setState({copied: true}) }}> 
                      <img alt="copy" src={CopyImg} height='18px' style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip id='fromCopy' getContent={(dataTip) => {if(this.state.copied) return 'Copied'; else return 'Copy';}} afterHide={() => {this.setState({copied: false}) }}/>
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='txTo'
                  data-tip={"The receiving party of the transaction (could be a <br/>contract address)."}/>
                  <ReactTooltip id='txTo' multiline={true}/>
                   &nbsp; To:
                </td>
                <td>
                  <Link to={`/main/scanner/address/${txTo}`}>{txTo}</Link>
                  <span data-tip='Copy' className="copyicon" data-for='toCopy'>
                    <CopyToClipboard text={txTo} onCopy={() => { this.setState({copied: true}) }}> 
                      <img alt="copy" src={CopyImg} height='18px' style={{marginLeft: '10px'}}/>
                    </CopyToClipboard>
                  </span>
                  <ReactTooltip id='toCopy' getContent={(dataTip) => {if(this.state.copied) return 'Copied'; else return 'Copy';}} afterHide={() => {this.setState({copied: false}) }}/>
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='value'
                  data-tip={"The value being transacted in Ether."}/>
                  <ReactTooltip id='value' multiline={true}/>
                   &nbsp; Value:
                </td>
                <td>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black', fontSize: '1.1rem'}}> 
                    {Validation.noExponents(value)} Eth
                 </Badge>
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='txFee'
                  data-tip={"Amount paid to the miner for processing the <br/>transaction."}/>
                  <ReactTooltip id='txFee' multiline={true}/>
                   &nbsp; Transaction Fee:
                </td>
                <td>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black', fontSize: '1.1rem'}}> 
                    {Validation.noExponents(txFee)} Eth
                 </Badge>
                </td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='gasLimit'
                  data-tip={"Maximum amount of gas provided for the <br/>transaction. For normal Eth transfers, the value is <br/>21,000. For contract this value is higher and <br/>bound by block gas limit."}/>
                  <ReactTooltip id='gasLimit' multiline={true}/>
                   &nbsp; Gas Limit:
                </td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='gasUsedByTx'
                  data-tip={"The exact units of gas that was used for the transaction."}/>
                  <ReactTooltip id='gasUsedByTx' multiline={true}/>
                   &nbsp; Gas Used by Transaction:
                </td>
                <td>{gasUsed} ({gasUsed/gasLimit*100}%)</td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='gasPrice'
                  data-tip={"Cost per unit of gas specified for the transaction, <br/>in Ether and Gwei. The higher the gas price the <br/>higher chance of getting included in a block."}/>
                  <ReactTooltip id='gasPrice' multiline={true}/>
                   &nbsp; Gas Price:
                </td>
                <td>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#E3AE71', color: 'black', fontSize: '1.1rem'}}> 
                    {Validation.noExponents(gasPrice*Math.pow(10,9))} Gwei
                  </Badge> {' '}
                ({Validation.noExponents(gasPrice)} Eth)</td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='nonce'
                  data-tip={"Sequential running number for an address, <br/> beginning with 0 for the first transaction. For <br/>example, if the nonce of a transaction is 10, it <br/>would be the 11th transaction sent from the <br/>sender's address."}/>
                  <ReactTooltip id='nonce' multiline={true}/>
                   &nbsp; Nonce:
                </td>
                <td>{nonce}</td>
              </tr>
              <tr>
                <td>
                  <img alt="info" src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='txInput'
                  data-tip={"Additional information that is required for the transaction."}/>
                  <ReactTooltip id='txInput' multiline={true}/>
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
