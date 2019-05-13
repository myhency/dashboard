import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';

import { Table } from 'reactstrap';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch'

export default class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            pages: 1,
            loading: false,
            balance: undefined,
            transaction_count: undefined
        };
    }

    componentDidMount() {
        this.getAddress();
    }

    getAddress = () => {
        Fetch.GET(`/api/address/${this.props.match.params.address}`)
        .then(res=>{
            console.log("1");
            if(res.is_contract){
                console.log("2");
                this.props.history.push(`/main/scanner/contract/${this.props.match.params.address}`)
            }
            this.setState({
                balance: res.balance,
                transaction_count: res.transaction_count
            })
        })
    }


    getTransaction = (state, instance) => {
      this.setState({
        loading: true
      });

      Fetch.GET(`/api/address/${this.props.match.params.address}/?page_size=${state.pageSize}&page=${state.page+1}`)
      .then(res => {
        console.log(res)
        //update안할때
        // if(this.state.transactions.length !== 0 && this.state.transactions[0].number === res.results[0].number){
        //   return;
        // }

        this.setState({
          transactions: res.results,
          pages: Math.ceil(res.count/state.pageSize)
        })
      })
      .finally(() => {
        this.setState({
            loading: false
        });
      })
    }
    
  render() {
    const { transactions, pages, loading, balance, transaction_count } = this.state;

    return (
      <Fragment>
          <ContentRow>
              <ContentCol>
                <ContentCard style={{padding: '0'}}>
                    <Table style={{margin: '0'}}>
                        <thead>
                            <tr>
                                <th colSpan='2' >Overview</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{width: '20%'}}>Balance:</td>
                                <td style={{width: '80%'}}>{balance} Ether</td>
                            </tr>
                            <tr>
                                <td>Transactions:</td>
                                <td>{transaction_count} txs</td>
                            </tr>
                        </tbody>
                    </Table>
                </ContentCard>
              </ContentCol>
          </ContentRow>
          <ContentRow>
              <ContentCol>
                  <ContentCard>
                    <ReactTable
                        columns={[
                            {
                                Header: "TxHash",
                                accessor: "transaction_hash",
                                Cell: ({row}) => (<Link to={this.props.location.pathname + '/' + row.transaction_hash}>{row.transaction_hash}</Link>),
                                width: 300
                            },
                            {
                                Header: "Block",
                                accessor: "related_block_number",
                                Cell: ({row}) => (<Link to={`/main/scanner/block/${row.related_block_number}`}>{row.related_block_number}</Link>),
                                width: 140
                            },
                            {
                                Header: "Age",
                                accessor: "Tx_age",
                                width: 150
                            },
                            {
                                Header: "From",
                                accessor: "transaction_from",
                                width: 300
                            },
                            {
                                Header: "",
                                width: 100
                            },
                            {
                                Header: "To",
                                accessor: "to",
                                width: 300
                            },
                            {
                                Header: "Value",
                                accessor: "value",
                                width: 100
                            },
                            {
                                Header: "[Tx Fee]",
                                accessor: "txFee",
                                width: 150
                            }
                        ]}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={transactions}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.getTransaction} // Request new data when things change
                        defaultPageSize={15}
                        pageSizeOptions={[15]}
                    />
                  </ContentCard>
              </ContentCol>
          </ContentRow>
      </Fragment>
    )
  }
}
