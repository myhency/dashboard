import React, { Component, Fragment } from 'react'
import ContentCard from 'components/ContentCard';
import { Button } from 'reactstrap';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Validation from 'utils/Validation';

export default class BlockList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            blocks: [],
            pages: 1,
            loading: false
        };
    }

    getBlock = (state) => {
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }

        this.setState({
            loading: true
        });

        Fetch.GET(`/api/block/?page_size=${state.pageSize}&page=${state.page + 1}`, headers)
            .then(res => {
                this.setState({
                    blocks: res.results,
                    pages: Math.ceil(res.count / state.pageSize)
                })
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            })
    }

    render() {
        const { blocks, pages, loading } = this.state;

        return (
            <Fragment>
                <ContentCard table>
                    <ReactTable
                        columns={[
                            {
                                Header: "Block",
                                accessor: "number",
                                minWidth: 50,
                                Cell: ({ row }) => (<Link to={this.props.location.pathname + '/' + row.number}>{row.number}</Link>)
                            },
                            {
                                Header: "Age",
                                accessor: "timestamp",
                                minWidth: 50,
                                Cell: ({ row }) => {
                                    var age = moment(this.state.timestamp).diff(row.timestamp, 'seconds');
                                    if (age < 60) {
                                        age = age + ' sec';
                                    }
                                    else if (age < 3600) {
                                        age = Math.floor(age / 60) + ' min';
                                    }
                                    else if (age < 84600) {
                                        age = Math.floor(age / 3600) + ' hour(s)';
                                    }
                                    else if (age < 2538000) {
                                        age = Math.floor(age / 84600) + ' day(s)';
                                    }
                                    else {
                                        return (<span>{moment(row.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>)
                                    }

                                    return (
                                        <Fragment>
                                            <span data-tip={moment(row.timestamp).format("YYYY-MM-DD HH:mm:ss")}>{age} ago</span>
                                            <ReactTooltip />
                                        </Fragment>
                                    )
                                }
                            },
                            {
                                Header: "Txn",
                                accessor: "transaction_count",
                                minWidth: 30
                            },
                            {
                                Header: "Miner",
                                accessor: "miner",
                                minWidth: 150,
                                Cell: ({ row }) => (<Link to={`/main/scanner/address/${row.miner}`}>{row.miner}</Link>)
                            },
                            {
                                Header: "Gas Used",
                                accessor: "gas_used",
                                minWidth: 50
                            },
                            {
                                Header: "Gas Limit",
                                accessor: "gas_limit",
                                minWidth: 50
                            },
                            {
                                Header: "Avg Gas Price",
                                accessor: "related_transaction",
                                minWidth: 80,
                                Cell: ({ row }) => {
                                    let txGasPrice = 0
                                    row.related_transaction.forEach((tx) => {
                                        txGasPrice += tx.gas_price;
                                    })
                                    return (
                                        <Button disabled={true} className='eth'>
                                            {row.related_transaction.length === 0 ? 0 : Validation.noExponents(txGasPrice / row.related_transaction.length)} Eth
                                        </Button>
                                    )
                                }
                            },
                            {
                                Header: "Reward",
                                accessor: "reward",
                                minWidth: 80,
                                Cell: ({ row }) => {
                                    return (
                                        <Button disabled={true} className='eth'>
                                            {row.reward} Eth
                                        </Button>
                                    )
                                }
                            }
                        ]}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={blocks}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.getBlock} // Request new data when things change
                        pageSizeOptions={[5, 10, 15, 20]}
                        defaultPageSize={15}
                        noDataText={'No Data found'}
                        getNoDataProps={() => { return { style: { backgroundColor: 'transparent', color: 'white' } } }}
                    />
                </ContentCard>
            </Fragment>

        )
    }
}
