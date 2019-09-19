import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import {
  Form, Input, InputGroup, InputGroupAddon,
  Button, Table, Badge,
  Card, CardBody, CardHeader, CardFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import SweetAlert from 'sweetalert2';

import Fetch from 'utils/Fetch.js';



export default class Scannermain extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }

    Fetch.GET('/api/block/?page_size=6&page=1', headers)
      .then(res => {
        this.setState({
          blocks: res.results
        })
      })
  }

  getTransaction = () => {
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }

    Fetch.GET('/api/transaction/?page_size=6&page=1', headers)
      .then(res => {
        //update안할때
        if (this.state.transactions.length !== 0 && this.state.transactions[0].id === res.results[0].id) {
          return;
        }

        this.setState({
          transactions: res.results
        })
      })
  }

  search = (item) => {
    console.log('aaaaa');
    const headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    }

    Fetch.GET(`/api/search/${item}`, headers)
      .then(res => {
        //잘못된 serach
        if (res.kinds === 'none') {
          SweetAlert.fire(
            'No Data Found!',
            'Please check your input',
            'error'
          );
        }
        else {
          this.props.history.push(`/main/scanner/${res.kinds}/${item}`);
        }

      })
  }

  onClickAll = (string) => {
    this.props.history.push('/main/scanner/' + string);
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.searchTxt.length > 0) {
      event.preventDefault();
      this.search(this.state.searchTxt);
    }
  }


  render() {
    const { blocks, transactions } = this.state;

    // latest block table
    var brows = [];
    blocks.forEach((block) => {
      let block_link = `/main/scanner/block/${block.number}`;
      let miner_link = `/main/scanner/address/${block.miner}`;
      brows.push(
        <tr key={block.id}>
          <td><img alt='block' src='/img/bk.png' height='50px' />&nbsp;&nbsp;&nbsp;<Link to={block_link}>{block.number}</Link></td>
          <td className="ellipsis" style={{ paddingTop: '10px', paddingBottom: '10px' }}><Link to={miner_link}>{block.miner}</Link> </td>
          <td style={{ textAlign: 'right' }}>
            <h5><Badge style={{ paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black' }}>
              {block.reward !== undefined ? block.reward.toFixed(5) : null} Eth
            </Badge></h5>
          </td>
        </tr>
      )
    });

    // latest transaction table
    var trows = [];
    transactions.forEach((tx) => {
      let block_link = `/main/scanner/transaction/${tx.transaction_hash}`;
      let from_link = `/main/scanner/address/${tx.transaction_from}`;
      let to_link = `/main/scanner/address/${tx.transaction_to}`;
      trows.push(
        <tr key={tx.id}>
          <td className="ellipsis"><img alt='transaction' src='/img/tx.png' height='50px' />&nbsp;&nbsp;&nbsp;<Link to={block_link}>{tx.transaction_hash}</Link></td>
          <td>
            <Table borderless style={{ tableLayout: 'fixed', margin: '0', padding: '0' }}>
              <tbody>
                <tr>
                  <td className="ellipsis"><Link to={from_link}>{tx.transaction_from}</Link></td>
                  <td style={{ width: '10%' }}><FaArrowRight /></td>
                  <td className="ellipsis"><Link to={to_link}>{tx.transaction_to}</Link></td>
                </tr>
              </tbody>
            </Table>
          </td>
          <td className="ellipsis" style={{ textAlign: 'right' }}>
            <h5><Badge color='light' style={{ paddingLeft: '10px', backgroundColor: '#9DB38B', color: 'black' }}>
              {(tx.gas * tx.gas_price).toFixed(5)} Eth
            </Badge></h5>
          </td>
        </tr>
      )
    });

    var blen = blocks.length;
    var tlen = transactions.length;

    if (blen > tlen) {
      for (var i = 0; i < blen - tlen; i++) {
        trows.push(
          <tr key={i}>
            <td>&nbsp;</td>
            <td style={{ paddingTop: '10px', paddingBottom: '10px' }}>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        );
      }
    }
    else {
      for (var j = 0; j < tlen - blen; j++) {
        brows.push(
          <tr key={j}>
            <td>&nbsp;</td>
            <td style={{ paddingTop: '10px', paddingBottom: '10px' }}>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        );
      }
    }

    return (
      <Fragment>
        <ContentRow>
          <ContentCol>
            <ContentCard>
              <h3 style={{ color: "#FFFFFF" }}>Ethereum Blockchain Explorer</h3>
              <Form>
                <InputGroup>
                  <Input
                    id="BlockExplorer" placeholder="Search by Address / Txhash / Block"
                    onChange={(event) => { this.setState({ searchTxt: event.target.value }) }}
                    onKeyPress={this.handleKeyPress} />
                  <InputGroupAddon addonType='append'>
                    <Button type='button' onClick={() => this.search(this.state.searchTxt)}>  Search  </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </ContentCard>
          </ContentCol>
        </ContentRow>
        <ContentRow>
          <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardHeader tag="h3">Blocks</CardHeader>
              <CardBody style={{ maxHeight: '560px', overflow: 'auto' }}>
                <Table bordered style={{ tableLayout: 'fixed' }}>
                  <thead style={{ backgroundColor: 'skyblue', textAlign: 'center' }}>
                    <tr>
                      <th style={{ width: '25%' }}>Block #</th>
                      <th style={{ width: '55%' }}>Miner</th>
                      <th style={{ width: '20%' }}>Reward</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brows}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button
                  outline color="primary" type='button'
                  block style={{ alignContent: 'bottom' }}
                  onClick={() => { this.onClickAll('block') }}>
                  View All Blocks
                    </Button>
              </CardFooter>
            </Card>
          </ContentCol>
          <ContentCol xl={6} lg={12} md={12} sm={12} xs={12}>
            <Card>
              <CardHeader tag="h3">Transactions</CardHeader>
              <CardBody style={{ maxHeight: '560px', overflow: 'auto' }}>
                <Table bordered style={{ tableLayout: 'fixed' }}>
                  <thead style={{ backgroundColor: 'skyblue', textAlign: 'center' }}>
                    <tr>
                      <th style={{ width: '30%' }}>Tx hash</th>
                      <th style={{ width: '50%' }}>From / To</th>
                      <th style={{ width: '20%' }}>Gas used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trows}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter>
                <Button
                  outline color="primary"
                  block type='button'
                  onClick={() => { this.onClickAll('transaction') }}>
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