import React, { Component, Fragment } from 'react'
import { Table, Button, Badge } from 'reactstrap';
import ContentCard from 'components/ContentCard';
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

  render() {
    const { passSec, difficulty, gasLimit, gasUsed, timestamp, parentHash, miner, blockReward,
      nonce, totalDifficulty, size, extraData, blockNo, transcationCount, blockHash,
      preblock, nextblock} = this.state;
    
    return (
      <Fragment>
        <ContentCard detailCard={true} >
          <Table bordered>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Block Height: 
                </td>
                <td style={{width: '80%'}}>
                  {blockNo}
                  {preblock.length === 0 ?
                  <Button color="link" style={{width: '48px'}}/> :
                  <Button 
                    onClick={()=> this.mvBlock('previos')} 
                    style={{marginLeft: '10px', padding: '0', paddingBottom: '1px', backgroundColor: '#76B344'}}>
                    <FaAngleLeft style={{marginLeft: '10px', marginRight: '10px', height: '15px', backgroundColor: '#76B344', color: 'black'}}/>
                  </Button> }
                  {nextblock.length === 0 ? null :
                  <Button 
                    variant='primary'
                    onClick={()=> this.mvBlock('next')} 
                    style={{marginLeft: '10px', padding: '0', paddingBottom: '1px', backgroundColor: '#76B344'}}>
                    <FaAngleRight style={{marginLeft: '10px', marginRight: '10px', height: '15px', backgroundColor: '#76B344', color: 'black'}}/>
                  </Button> }
                </td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; TimeStamp: 
                </td>
                <td><img src='/img/clock.svg' height='15px'/>&nbsp;{moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Transactions:
                  </td>
                <td>{transcationCount}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Mined by:
                </td>
                <td><Link to={`/main/scanner/address/${miner}`}>{miner}</Link></td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
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
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Difficulty:
                </td>
                <td>{difficulty}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Total Difficulty:
                </td>
                <td>{totalDifficulty}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Size:
                </td>
                <td>{size}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Gas Used:
                </td>
                <td>{gasUsed}</td>
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
                   &nbsp; Extra Data:
                </td>
                <td>{extraData}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Hash:
                </td>
                <td>{blockHash}</td>
              </tr>
              <tr>
                <td>
                  <img src='/img/information.svg' height='18px' 
                  style={{marginTop: '9px', marginBottom: '9px'}} 
                  data-tip={"block height"}/>
                  <ReactTooltip/>
                   &nbsp; Parent Hash:
                </td>
                <td>{parentHash}</td>
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
            </tbody>
          </Table>
        </ContentCard>
      </Fragment>
    )
  }
}

export default connect(null)(BlockInfo);