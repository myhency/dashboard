import React, { Component, Fragment } from 'react'
import { Table, Button, Badge } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Fetch from 'utils/Fetch.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setInfo } from 'store/modules/currentInfo';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

class BlockInfo extends Component {
  constructor(props) {
    super(props);

    this.state={
      passSec: undefined,
      blockNo: this.props.match.params.blockNo,
      blockHash: undefined,
      difficulty: undefined,
      gasLimit: undefined,
      gasUsed: undefined,
      timestamp: undefined,
      transcationCount: undefined,
      miner: undefined,
      blockReward: undefined,
      parentHash: undefined,
      nonce: undefined,
      relatedTransaction: [],
      totalDifficulty: undefined,
      size: undefined,
      extraData: undefined,
      nextblock: [],
      preblock: []
    };
    
  }

  componentDidMount() {
    this.getBlockInfo();
  }

  getBlockInfo = () => {
    // console.log(this.state.blockNo);

    this.props.dispatch(setInfo('# ' + this.state.blockNo));

    Fetch.GET('/api/block/'+this.state.blockNo)
    .then(res => {
      //update 안할 때
      if(res === undefined){
        return;
      }

      this.setState({
        passSec: 0,
        blockHash: res.block_hash,
        difficulty: res.difficulty,
        gasLimit: res.gas_limit,
        gasUsed: res.gas_used,
        timestamp: res.timestamp,
        transcationCount: res.transaction_count,
        miner: res.miner,
        blockReward: res.reward,
        parentHash: res.parent_hash,
        nonce: res.nonce,
        relatedTransaction: res.related_transaction,
        totalDifficulty: res.total_difficulty,
        size: res.size,
        extraData: res.extra_data,
        nextblock: res.next_block,
        preblock: res.pre_block
      });
    })
    .catch(error => {
        console.log(error);
    })
  }

  //prop이 바뀜을 catch
  static getDerivedStateFromProps(props, state) {
    let { blockNo } = state;

    if (props.match.params.blockNo !== blockNo) {
      blockNo = props.match.params.blockNo
    }
    return {
      ...state,
      blockNo
    }
  }

  //state 바뀐 후 function call
  componentDidUpdate(prevProps, prevState) {
    if (prevState.blockNo !== this.state.blockNo) {
      this.getBlockInfo();
    }
  }

  mvBlock = (string) => {
    let nBlockNo = string === 'next' ? Number(this.state.blockNo)+1 : Number(this.state.blockNo)-1;
    this.props.history.push('/main/scanner/block/'+ nBlockNo);
  }

  goList = () => {
    this.props.history.push('/main/scanner/block');
  }

  render() {
    const { passSec, difficulty, gasLimit, gasUsed, timestamp, parentHash, miner, blockReward,
      nonce, totalDifficulty, size, extraData, blockNo, transcationCount, blockHash,
      preblock, nextblock} = this.state;
    
    return (
      <Fragment>
        <ContentCard detailCard={true} >
          <ContentRow style={{justifyContent: 'space-between'}}>
            <ContentCol>
              {preblock.length === 0 ?
              <Button color="link" style={{width: '48px'}}/> :
                <Button 
                  onClick={()=> this.mvBlock('previos')} 
                  style={{marginLeft: '10px', padding: '0', paddingBottom: '1px', backgroundColor: '#76B344'}}>
                  <FaAngleLeft style={{marginLeft: '10px', marginRight: '10px', height: '15px', backgroundColor: '#76B344', color: 'black'}}/>
                </Button> }
                <span style={{color: 'white', marginLeft: '10px'}}> {blockNo} </span>
                {nextblock.length === 0 ? null :
                <Button 
                  variant='primary'
                  onClick={()=> this.mvBlock('next')} 
                  style={{marginLeft: '10px', padding: '0', paddingBottom: '1px', backgroundColor: '#76B344'}}>
                  <FaAngleRight style={{marginLeft: '10px', marginRight: '10px', height: '15px', backgroundColor: '#76B344', color: 'black'}}/>
                </Button> }
            </ContentCol>
            <ContentCol style={{textAlign: 'right'}}>
              <Button onClick={() => this.goList()} className='btn-outline-primary'>
                To List
              </Button>
            </ContentCol>
          </ContentRow>
          <Table bordered>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}}
                  data-for='blockHeight'
                  data-tip={"Also known as Block Number. The block height, <br/>which indicateds the length of the blockchain, <br/>increases after the addition of the new block."}/>
                  <ReactTooltip id='blockHeight' multiline={true}/>
                   &nbsp; Block Height: 
                </td>
                <td style={{width: '80%'}}>{blockNo}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='timestamp'
                  data-tip={"The date and time at which a transaction is mined."}/>
                  <ReactTooltip id='timestamp' multiline={true}/>
                   &nbsp; TimeStamp: 
                </td>
                <td><img src='/img/clock.svg' height='15px'/>&nbsp;{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='transcationCount'
                  data-tip={"The number of transactions in the block. Internal <br/>transactions is transactions as a result of contract <br/>execution that involves Ether value."}/>
                  <ReactTooltip id='transcationCount' multiline={true}/>
                   &nbsp; Transactions:
                  </td>
                <td>{transcationCount}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='miner'
                  data-tip={"Miner who successfully include the block onto the blockchain."}/>
                  <ReactTooltip id='miner' multiline={true}/>
                   &nbsp; Mined by:
                </td>
                <td><Link to={`/main/scanner/address/${miner}`}>{miner}</Link></td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='blockReward'
                  data-tip={"For each block, the miner is rewarded with a finite <br/>amount of Ether on top of the fees paid for all <br/>transactions in the block."}/>
                  <ReactTooltip id='blockReward' multiline={true}/>
                   &nbsp; Block Reward:
                </td>
                <td><h5>
                  <Badge style={{paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black'}}> 
                    {blockReward} Eth
                 </Badge>
                </h5></td>
              </tr>
              <tr>
                <td>
                <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='difficulty'
                  data-tip={"The amount of effort required to mine a new block. <br/>The difficulty algorithm may adjust according to <br/>time."}/>
                  <ReactTooltip id='difficulty' multiline={true}/>
                   &nbsp; Difficulty:
                </td>
                <td>{difficulty}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='totalDifficulty'
                  data-tip={"Total difficulty of the chain until this block."}/>
                  <ReactTooltip id='totalDifficulty' multiline={true}/>
                   &nbsp; Total Difficulty:
                </td>
                <td>{totalDifficulty}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='size'
                  data-tip={"The block size is actually determined by the <br/>block's gas limit."}/>
                  <ReactTooltip id='size' multiline={true}/>
                   &nbsp; Size:
                </td>
                <td>{size}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='gasUsed'
                  data-tip={"The total gas used in the block and its percentage <br/>of gas filled in the block."}/>
                  <ReactTooltip id='gasUsed' multiline={true}/>
                   &nbsp; Gas Used:
                </td>
                <td>{gasUsed}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='gasLimit'
                  data-tip={"Total gas limit provieded by all transactions in the block."}/>
                  <ReactTooltip id='gasLimit' multiline={true}/>
                   &nbsp; Gas Limit:
                </td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='extraData'
                  data-tip={"Any data that can be included by the miner in the block."}/>
                  <ReactTooltip id='extraData' multiline={true}/>
                   &nbsp; Extra Data:
                </td>
                <td>{extraData}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='blockHash'
                  data-tip={"Hash of the block header from the previous block."}/>
                  <ReactTooltip id='blockHash' multiline={true}/>
                   &nbsp; Hash:
                </td>
                <td>{blockHash}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='parentHash'
                  data-tip={"The hash of the block from which this block was <br/>generated, also known as its parent block."}/>
                  <ReactTooltip id='parentHash' multiline={true}/>
                   &nbsp; Parent Hash:
                </td>
                <td>{parentHash}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-for='nonce'
                  data-tip={"Block nonce is a value used during mining to <br/>demonstrate proof of work for a block."}/>
                  <ReactTooltip id='nonce' multiline={true}/>
                   &nbsp; Nonce:
                </td>
                <td>{nonce}</td>
              </tr>
            </tbody>
          </Table>
        </ContentCard>
      </Fragment>
    )
  }
}

export default connect(null)(BlockInfo);