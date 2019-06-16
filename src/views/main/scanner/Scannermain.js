import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { 
    Form, FormGroup,
    Input, InputGroup, InputGroupAddon,
    Button, Table,
    Card, CardBody, CardDeck, CardHeader, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, icons } from 'react-icons/fa';
import SweetAlert from 'sweetalert2';

import Fetch from 'utils/Fetch.js';

export default class Scannermain extends Component {

  constructor(props) {
    super(props);

    this.state={
      blocks: [],
      transactions: [],
      link: this.props.location.pathname,
      searchTxt: ''
    };
  }

  componentDidMount() {
    this.getBlock();
    this.getTransaction();
  }

  getBlock = () => {
    Fetch.GET('/api/block/?page_size=10&page=1')
    .then(res => {
      //update안할때
      if(this.state.blocks.length !== 0 && this.state.blocks[0].number === res.results[0].number){
        return;
      }

      this.setState({
        blocks: res.results
      })
    })
  }

  getTransaction = () => {
    Fetch.GET('/api/transaction/?page_size=10&page=1')
    .then(res => {
      //update안할때
      if(this.state.transactions.length !== 0 && this.state.transactions[0].id === res.results[0].id){
        return;
      }

      this.setState({
        transactions: res.results
      })
    })
  }

  search = (item) => {
    console.log('search');
    Fetch.GET(`/api/search/${item}`)
    .then(res =>{
      //잘못된 serach
      if(res.kinds == 'none'){
        SweetAlert.fire(
          'No Data Found!',
          'Please check your input',
          'error'
        );
      }
      else{
        this.props.history.push(`/main/scanner/${res.kinds}/${item}`);
      }

    })
  }

  onClickAll = (string) => {
    this.props.history.push('/main/scanner/'+string);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter' && this.state.searchTxt.length > 0) {
      event.preventDefault();
      console.log('serch');
      this.search(this.state.searchTxt);
    }
  }


  render() {
    return (
      <Fragment>
           <ContentRow>
                <ContentCard style={{width:'100%', paddingLeft:'15px', pddingRight: '15px', marginRight: '25px'}}>
                  <ContentRow>
                    <h3 style={{color:"#FFFFFF"}}>Block Explorer</h3>
                  </ContentRow>
                  <Form>
                    <InputGroup>
                      <Input 
                        id="BlockExplorer" placeholder="Search by Address / Txhash / Block" 
                        onChange={(event) => {this.setState({searchTxt: event.target.value})}}
                        onKeyPress={this.handleKeyPress}/>
                      <InputGroupAddon addonType='append'>
                        <Button type='submit' onClick={()=>this.search(this.state.searchTxt)}>  Search  </Button>
                      </InputGroupAddon> 
                    </InputGroup>  
                  </Form>
                </ContentCard>
            </ContentRow>
            <ContentRow>
              <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                <Card> 
                  <CardHeader tag="h3">Latest Block</CardHeader>
                  <CardBody style={{maxHeight: '560px', overflow: 'auto'}}>
                   <Table bordered style={{tableLayout: 'fixed'}}>
                    <thead style={{backgroundColor:'skyblue', textAlign: 'center'}}>
                      <tr>
                        <th style={{width:'25%'}}>Block #</th>
                        <th style={{width:'59%'}}>Miner</th>
                        <th style={{width:'16%'}}>Eth</th>
                      </tr>
                    </thead>
                    {this.state.blocks.map((block) => {
                      let block_link = `/main/scanner/block/${block.number}`;
                      let miner_link = `/main/scanner/address/${block.miner}`
                      return ( 
                        <tbody key={block.id}>
                          <tr>
                            <td><Link to={block_link}>{block.number}</Link></td>
                            <td className="ellipsis" style={{paddingTop: '10px', paddingBottom: '10px'}}><Link to={miner_link}>{block.miner}</Link></td>
                            <td>{block.gas_used}</td>
                          </tr>
                        </tbody>);
                    })}
                   </Table>
                   </CardBody>
                  <CardFooter>
                    <Button 
                      outline color="primary" type='button'
                      block style={{alignContent: 'bottom'}}
                      onClick={() => {this.onClickAll('block')}}>
                      View All Blocks
                    </Button>
                  </CardFooter>
                </Card>
                </ContentCol>
                <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
                  <Card>
                  <CardHeader tag="h3">Transactions</CardHeader>
                  <CardBody style={{maxHeight: '560px', overflow: 'auto'}}>
                   <Table bordered style={{tableLayout: 'fixed'}}>
                    <thead style={{backgroundColor:'skyblue', textAlign: 'center'}}>
                      <tr>
                        <th style={{width:'20%'}}>tx Id</th>
                        <th style={{width:'64%'}}>From / To</th>
                        <th style={{width:'16%'}}>Eth</th>
                      </tr>
                    </thead>
                    {this.state.transactions.map((tx, i) => {
                      let block_link = `/main/scanner/transaction/${tx.transaction_hash}`;
                      let from_link = `/main/scanner/address/${tx.transaction_from}`;
                      let to_link = `/main/scanner/address/${tx.transaction_to}`;
                      return ( 
                        <tbody key={tx.id}>
                          <tr>
                            <td className="ellipsis"><Link to={block_link}>{tx.transaction_hash}</Link></td>
                            <td>
                              <Table borderless style={{tableLayout: 'fixed', margin: '0', padding: '0'}}>
                                <tbody>
                                  <tr>
                                    <td className="ellipsis"><Link to={from_link}>{tx.transaction_from}</Link></td>
                                    <td style={{width:'10%'}}><FaArrowRight/></td>
                                    <td className="ellipsis"><Link to={to_link}>{tx.transaction_to}</Link></td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td className="ellipsis">{tx.gas * tx.gas_price}</td>
                          </tr>
                        </tbody>);
                    })}
                   </Table>
                  </CardBody>
                  <CardFooter>
                    <Button 
                      outline color="primary" 
                      block type='button'
                      onClick={() => {this.onClickAll('transaction')}}>
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>
              </ContentCol>
           </ContentRow>
      </Fragment>
    )
  }
}