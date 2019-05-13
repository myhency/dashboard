import React, { Component, Fragment } from 'react'
import { Table, Button } from 'reactstrap';
import ContentCard from 'components/ContentCard';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Fetch from 'utils/Fetch.js';
import { Link } from 'react-router-dom';

export default class BlockInfo extends Component {
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
    if (props.match.params.blockNo !== state.blockNo) {
      return{
        blockNo: props.match.params.blockNo
      };
    }
    return null;
  }

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
        <ContentCard style={{paddingLeft: '150px', paddingRight: '150px'}}>
          <Table bordered style={{height: '30px'}}>
            <tbody>
              <tr>
                <td style={{width: '20%'}}>Block Height:</td>
                <td style={{width: '80%'}}>
                  {blockNo}
                  {preblock.length === 0 ?
                  <Button color="link" style={{width: '48px'}}/> :
                  <Button 
                    variant='primary'
                    onClick={()=> this.mvBlock('previos')} 
                    style={{marginLeft: '10px', padding: '0'}}>
                    <FaAngleLeft style={{marginLeft: '10px', marginRight: '10px'}}/>
                  </Button> }
                  {nextblock.length === 0 ? null :
                  <Button 
                    variant='primary'
                    onClick={()=> this.mvBlock('next')} 
                    style={{marginLeft: '10px', padding: '0'}}>
                    <FaAngleRight style={{marginLeft: '10px', marginRight: '10px'}}/>
                  </Button> }
                </td>
              </tr>
              <tr>
                <td>TimeStamp:</td>
                <td>{timestamp}</td>
              </tr>
              <tr>
                <td>Transactions:</td>
                <td>{transcationCount}</td>
              </tr>
              <tr>
                <td>Mined by:</td>
                <td><Link to={`/main/scanner/address/${miner}`}>{miner}</Link></td>
              </tr>
              <tr>
                <td>Block Reward:</td>
                <td>{blockReward}</td>
              </tr>
              <tr>
                <td>Difficulty:</td>
                <td>{difficulty}</td>
              </tr>
              <tr>
                <td>Total Difficulty:</td>
                <td>{totalDifficulty}</td>
              </tr>
              <tr>
                <td>Size:</td>
                <td>{size}</td>
              </tr>
              <tr>
                <td>Gas Used:</td>
                <td>{gasUsed}</td>
              </tr>
              <tr>
                <td>Gas Limit:</td>
                <td>{gasLimit}</td>
              </tr>
              <tr>
                <td>Extra Data:</td>
                <td>{extraData}</td>
              </tr>
              <tr>
                <td>Hash:</td>
                <td>{blockHash}</td>
              </tr>
              <tr>
                <td>Parent Hash:</td>
                <td>{parentHash}</td>
              </tr>
              <tr>
                <td>Nonce:</td>
                <td>{nonce}</td>
              </tr>
            </tbody>
          </Table>
        </ContentCard>
      </Fragment>
    )
  }
}
