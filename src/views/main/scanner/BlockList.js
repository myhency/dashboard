import React, { Component, Fragment } from 'react'
import ContentCard from 'components/ContentCard';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch'; 

export default class BlockList extends Component {
    constructor(props) {
        super(props);     

        this.state = {
            blocks: [],
            pages: 1,
            loading: false
        };
    }

    getBlock = (state, instance) => {
        this.setState({
            loading: true
        });
        console.log(state.pageSize);

        Fetch.GET(`/api/block/?page_size=${state.pageSize}&page=${state.page+1}`)
        .then(res => {
          //update안할때
        //   if(this.state.blocks.length !== 0 && this.state.blocks[0].number === res.results[0].number){
        //     return;
        //   }
        
            this.setState({
                blocks: res.results,
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
        const { blocks, pages, loading } = this.state;

        return (
            <Fragment>
                <ContentCard table>
                    <ReactTable
                        columns={[
                            {
                                Header: "Block",
                                accessor: "number",
                                Cell: ({row}) => (<Link to={this.props.location.pathname + '/' + row.number}>{row.number}</Link>)
                            },
                            {
                                Header: "Age",
                                accessor: "Block_age"
                            },
                            {
                                Header: "Txn",
                                accessor: "transaction_count"
                            },
                            {
                                Header: "Miner",
                                accessor: "miner",
                                Cell: ({row}) => (<Link to={`/main/scanner/address/${row.miner}`}>{row.miner}</Link>)
                            },
                            {
                                Header: "Gas Used",
                                accessor: "gas_used"
                            },
                            {
                                Header: "Gas Limit",
                                accessor: "gas_limit"
                            },
                            {
                                Header: "Avg Gas Price",
                                accessor: "related_transaction",
                                Cell: ({row}) => {
                                    let txGasPrice = 0
                                    row.related_transaction.map((tx)=>{
                                        txGasPrice += tx.gas_price
                                    } )
                                    return (
                                        <span>{row.related_transaction.length == 0 ? 0 : txGasPrice/row.related_transaction.length}</span>
                                    )
                                }
                            },
                            {
                                Header: "Reward",
                                accessor: "reward"
                            }
                        ]}
                        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                        data={blocks}
                        pages={pages} // Display the total number of pages
                        loading={loading} // Display the loading overlay when we need it
                        onFetchData={this.getBlock} // Request new data when things change
                        pageSizeOptions={[5, 10, 15, 20]}
                        defaultPageSize={15}
                    />
                </ContentCard>
            </Fragment>
      
    )
  }
}
