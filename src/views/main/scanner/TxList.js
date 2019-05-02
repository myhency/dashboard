import React, { Component, Fragment } from 'react'
import ContentCard from 'components/ContentCard';

import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch'; 

export default class TxList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            pages: 1,
            loading: false
        };
    }


    getTransaction = (state, instance) => {
      this.setState({
        loading: true
      });

      Fetch.GET(`/api/transaction/?page_size=${state.pageSize}&page=${state.page+1}`)
      .then(res => {
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
    const { transactions, pages, loading } = this.state;

    return (
      <Fragment>
        <ContentCard table>
            <ReactTable
                columns={[
                    {
                        Header: "TxHash",
                        accessor: "transaction_hash",
                        Cell: ({row}) => (<Link to={this.props.location.pathname + '/' + row.transaction_hash}>{row.transaction_hash}</Link>),
                        width: 350
                    },
                    {
                        Header: "Block",
                        accessor: "related_block",
                        Cell: ({row}) => (<Link to={`/main/scanner/Block/${row.related_block_number}`}>{row.related_block_number}</Link>),
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
                        width: 350
                    },
                    {
                        Header: "To",
                        accessor: "transaction_to",
                        width: 350
                    },
                    {
                        Header: "Value",
                        accessor: "value",
                        width: 100
                    },
                    {
                        Header: "[Tx Fee]",
                        accessor: "gas",
                        width: 150,
                        Cell: ({row}) => {
                          let gas = row._original.gas;
                          let gas_price = row._original.gas_price;
                          return (<span>{gas*gas_price}</span>)
                        }
                    }
                ]}
                manual
                data={transactions}
                pages={pages}
                loading={loading}
                onFetchData={this.getTransaction}
                pageSizeOptions={[5, 10, 15, 20]}
                defaultPageSize={20}
            />
        </ContentCard>
    </Fragment>
    )
  }
}
