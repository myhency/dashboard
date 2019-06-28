import React, { Component, Fragment } from 'react'
import ContentCard from 'components/ContentCard';

import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch'; 
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

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
                        width: '20%'
                    },
                    {
                        Header: "Block",
                        accessor: "related_block",
                        Cell: ({row}) => (<Link to={`/main/scanner/Block/${row.related_block}`}>{row.related_block.number}</Link>),
                        width: '10%'
                    },
                    {
                        Header: "Age",
                        accessor: "timestamp",
                        width: '10%',
                        Cell: ({row}) => {
                            var age = moment(this.state.timestamp).diff(row.timestamp, 'seconds');
                            if(age < 60) {
                              age = age + ' sec';
                            }
                            else if(age < 3600) {
                              age = Math.floor(age/60) + ' min';
                            }
                            else if(age < 84600) {
                              age = Math.floor(age/3600) + ' hour(s)';
                            }
                            else if(age < 2538000) {
                              age = Math.floor(age/84600) + ' day(s)';
                            }
                            else {
                              return (<span>{moment(row.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>)
                            }

                            return (
                                <Fragment>
                                    <span data-tip={moment(row.timestamp).format("YYYY-MM-DD HH:mm:ss")}>{age} ago</span>
                                    <ReactTooltip/>
                                </Fragment>
                            )
                        }
                    },
                    {
                        Header: "From",
                        accessor: "transaction_from",
                        width: '20%',
                        Cell: ({row}) => (<Link to={`/main/scanner/address/${row.transaction_from}`}>{row.transaction_from}</Link>),
                    },
                    {
                        Header: "To",
                        accessor: "transaction_to",
                        width: '20%',
                        Cell: ({row}) => (<Link to={`/main/scanner/address/${row.transaction_to}`}>{row.transaction_to}</Link>),
                    },
                    {
                        Header: "Value",
                        accessor: "value",
                        width: '10%',
                        Cell: ({row}) => {
                            return (<span>{row.value} Eth</span>)
                        }
                    },
                    {
                        Header: "Tx Fee",
                        accessor: "gas",
                        width: '10%',
                        Cell: ({row}) => {
                          let gas = row._original.gas;
                          let gas_price = row._original.gas_price;
                          return (<span style={{fontSize: '13px', color: '#C0C0C0'}}>{gas*gas_price}</span>)
                        }
                    }
                ]}
                manual
                data={transactions}
                pages={pages}
                loading={loading}
                onFetchData={this.getTransaction}
                pageSizeOptions={[5, 10, 15, 20]}
                defaultPageSize={15}
            />
        </ContentCard>
    </Fragment>
    )
  }
}
