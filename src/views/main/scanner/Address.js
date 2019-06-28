import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';

import classnames from 'classnames';
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Badge } from 'reactstrap';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import Fetch from 'utils/Fetch'
import { connect } from 'react-redux';
import { setInfo } from 'store/modules/currentInfo';
import { setPage } from 'store/modules/tempPageName';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';

import Code from 'views/main/scanner/Contract_code.js';
import Event from 'views/main/scanner/Contract_event.js';

class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            pages: 1,
            loading: false,
            balance: undefined,
            transaction_count: undefined,
            is_contract: false,
            contract_deployer: undefined,
            contract_deployed_at: undefined,
            address: this.props.match.params.address,
            byte_code: undefined,
            activeTab: '1',
            timestamp: new Date()
        };
    }

    componentDidMount() {
        //For dividing page name
        this.props.dispatch(setPage(undefined));
        this.getAddress();
        console.log(this.state.timestamp);
    }

    //Callback for table
    getAddress = (callback) => {
        
        Fetch.GET(`/api/address/${this.state.address}`)
        .then(res=>{
            this.setState({
                balance: res.balance,
                transaction_count: res.transaction_count,
                is_contract: res.is_contract
            })
            
            //Fetch Contract info
            if(this.state.is_contract){
                this.props.dispatch(setPage('Contract'));
                Fetch.GET(`/api/contract/${this.state.address}`)
                .then(res =>{
                    this.setState({
                        contract_deployer: res.creator_created_from,
                        contract_deployed_at: res.creator_created_transaction,
                        byte_code: res.byte_codes
                    }, () => {
                        if(callback) {
                            callback();
                        }
                    })
                })
            }else {
                this.props.dispatch(setPage('Address'));
                if(callback) {
                    callback();
                }
            }
            this.props.dispatch(setInfo(this.state.address));
            
        })
    }


    getTransaction = (state, instance) => {
        this.setState({
            loading: true
        });

        Fetch.GET(`/api/address/?account=${this.state.address}&page_size=${state.pageSize}&page=${state.page+1}`)
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
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.setState({
                loading: false
            });
        })
    }

    //Tab toggle
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    //prop이 바뀜을 catch
    static getDerivedStateFromProps(props, state) {
        let { address } = state;

        if (props.match.params.address !== address) {
            address = props.match.params.address
        }

        return {
            ...state,
            address
        }
    }

    //state 바뀐 후 function call
    componentDidUpdate(prevProps, prevState) {
        if (prevState.address !== this.state.address) {
            this.getAddress();
            this.table.fireFetchData();
        }
    }

  render() {
    const { transactions, pages, loading, balance, transaction_count
        , is_contract, contract_deployer, contract_deployed_at, byte_code } = this.state;
    
    //Table component
    const renderTable = () => {
        return (
            <ReactTable
                columns={[
                    {
                        Header: "TxHash",
                        accessor: "transaction_hash",
                        Cell: ({row}) => (<Link to={`/main/scanner/transaction/${row.transaction_hash}`}>{row.transaction_hash}</Link>),
                        width: '20%'
                    },
                    {
                        Header: "Block",
                        accessor: "related_block",
                        Cell: ({row}) => (<Link to={`/main/scanner/block/${row.related_block.number}`}>{row.related_block.number}</Link>),
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
                                age = Math.floor(age/3600) + ' hour';
                            }
                            else if(age < 2538000) {
                                age = Math.floor(age/84600) + ' day';
                            }
                            else {
                                return (<span>{row.timestamp}</span>)
                            }

                            return (
                                <Fragment>
                                    {/* <span data-tip={row.timestamp}>
                                        {age}
                                        {(age.includes('hour') || age.includes('day')) &&
                                        <span style={{fontSize: '13px', color: '#C0C0C0'}}>s</span>} ago
                                    </span> */}
                                    <span data-tip={row.timestamp}>{age} ago</span>
                                    <ReactTooltip/>
                                </Fragment>
                            )
                        }
                    },
                    {
                        Header: "From",
                        accessor: "transaction_from",
                        Cell: ({row}) => (
                            row.transaction_from === this.state.address ?
                            row.transaction_from :
                            <Link to={`/main/scanner/address/${row.transaction_from}`}>{row.transaction_from}</Link>),
                        width: '20%'
                    },
                    {
                        Header: "",
                        width: '6%',
                        Cell: ({row}) => (
                            row.transaction_from === this.state.address ?
                            <Badge color='danger' style ={{width: '50px'}}> Out </Badge>:
                            <Badge color='success' style ={{width: '50px'}}> in </Badge>
                        ),
                    },
                    {
                        Header: "To",
                        accessor: "transaction_to",
                        Cell: ({row}) => (
                            row.transaction_to === this.state.address ?
                            row.transaction_to :
                            <Link to={`/main/scanner/address/${row.transaction_to}`}>{row.transaction_to}</Link>),
                        width: '20%'
                    },
                    {
                        Header: "Value",
                        accessor: "value",
                        width: '7%',
                        Cell: ({row}) => {
                            return (<span>{row.value} Eth</span>)
                        }
                    },
                    {
                        Header: "Tx Fee",
                        accessor: "txFee",
                        width: '7%',
                        Cell: ({row}) => {
                            let gas = row._original.gas;
                            let gas_price = row._original.gas_price;
                            return (<span style={{fontSize: '13px', color: '#C0C0C0'}}>{gas*gas_price}</span>)
                        }
                    }
                ]}
                
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={transactions}
                pages={pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                onFetchData={this.getTransaction} // Request new data when things change
                defaultPageSize={10}
                showPageSizeOptions={false}
                ref={(instance) => { this.table = instance; }}
                sortable={false}
            />
        );
    }
        
    return (
      <Fragment>
          <ContentRow>
              <ContentCol>
                <ContentCard style={{padding: '0'}}>
                    <Table style={{margin: '0'}}>
                        <thead>
                            <tr>
                                <th colSpan='4' >Overview</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{width: '10%'}}>Balance :</td>
                                <td style={{width: '40%'}}>{balance} Ether</td>
                                <td style={{width: '10%'}}>Transactions :</td>
                                <td style={{width: '40%'}}>{transaction_count} txs</td>
                            </tr>
                            { is_contract && ( 
                            <tr>
                                <td>Deployer :</td>
                                <td><Link to={`/main/scanner/address/${contract_deployer}`}>{contract_deployer}</Link></td>
                                <td>Deployed at :</td>
                                <td><Link to={`/main/scanner/transaction/${contract_deployed_at}`}>{contract_deployed_at}</Link></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                </ContentCard>
              </ContentCol>
          </ContentRow>
          <ContentRow>
              <ContentCol>
                <Fragment> 
                    <Nav tabs>
                        <NavItem style={{ width: '33%' }}>
                            <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                                Transactions
                            </NavLink>
                        </NavItem>
                        {is_contract ?
                        <Fragment>
                            <NavItem style={{ width: '33%' }}>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}>
                                    Code
                                </NavLink>
                            </NavItem>
                            <NavItem style={{ width: '34%' }}>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}>
                                    Events
                                </NavLink>
                            </NavItem>
                        </Fragment>
                        : null
                        }
                    </Nav>
                    <TabContent activeTab={this.state.activeTab} style={{ height: '522px'}}>
                        <TabPane tabId='1'>
                            <ContentCard style={{margin: '0', border: 0, height: '520px'}}> {renderTable()}</ContentCard>
                        </TabPane>
                        {is_contract ? 
                        <Fragment>
                            <TabPane tabId='2'><Code byteCode={byte_code}/></TabPane>
                            <TabPane tabId='3'><Event/></TabPane>
                        </Fragment>
                        : null }
                    </TabContent>
                </Fragment>
              </ContentCol>
          </ContentRow>
      </Fragment>
    )
  }
}

export default connect(null)(Address);