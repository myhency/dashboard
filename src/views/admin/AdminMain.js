import React, { Component, Fragment } from 'react';
// import ReactDOM from 'react-dom';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import {
    Card, CardBody, CardHeader, CardFooter, Button
} from 'reactstrap';
import Fetch from 'utils/Fetch';
import ReactTable from 'react-table';
import { FaLockOpen } from 'react-icons/fa';
import Swal from 'sweetalert2';

class AdminMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false
        };

        this.fetchData();
    }

    fetchData = (state) => {
        this.setState({ loading: true });
        Fetch.GET(`/node/admin/users`)
            .then(res => {
                console.log(res);
                this.setState({
                    data: res
                })
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    onClickUnlock = (e, row) => {
        const { id } = this.state;

        Swal.fire({
            title: 'Unlock User Account?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
            cancelButtonText: 'no',

        }).then((result) => {
            if (result.value) {
                console.log("yes");

                let url = `/node/admin/users/${row.id}/unlock`;

                this.setState({
                    loading: true
                });
                Fetch.POST(url, {}, {})

                    .then(res => {
                        Swal.fire(
                            'Unlock Account!',
                            '',
                            'success'
                        ).then(() => {
                        })
                    })
                    .catch(error => {
                        Swal.fire({
                            type: 'error',
                            title: 'Unknown Error Occurred',
                            confirmButtonText: 'Close'
                        });
                    })
                    .finally(() => {
                        this.setState({
                            loading: false
                        });
                        // this.props.history.push(`/admin/userList`);
                        this.table.fireFetchData();
                    })
            }
        })
    }

    render() {
        const { data, loading } = this.state;
        return (
            <Fragment>
                {/* <ContentRow>
                    <ContentCol>
                        <Card>
                            <CardHeader tag="h3">#Hosts</CardHeader>
                            <CardBody style={{ maxHeight: '560px', overflow: 'auto', textAlign: 'center' }}>
                                <h1 style={{ color: "#FFFFFF" }}>3</h1>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </ContentCol>
                    <ContentCol>
                        <Card>
                            <CardHeader tag="h3">#Users</CardHeader>
                            <CardBody style={{ maxHeight: '560px', overflow: 'auto', textAlign: 'center' }}>
                                <h1 style={{ color: "#FFFFFF" }}>8</h1>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </ContentCol>
                    <ContentCol>
                        <Card>
                            <CardHeader tag="h3">Active</CardHeader>
                            <CardBody style={{ maxHeight: '560px', overflow: 'auto', textAlign: 'center' }}>
                                <h1 style={{ color: "#FFFFFF" }}>3 / 3</h1>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card>
                    </ContentCol>
                </ContentRow> */}
                <ContentRow>
                    <ContentCol>
                        <ContentCard table>
                            <CardHeader tag="h3">User list</CardHeader>
                            <ReactTable
                                columns={[
                                    {
                                        Header: "ID",
                                        accessor: "id",
                                        minWidth: 50
                                    },
                                    {
                                        Header: "Role",
                                        accessor: "role",
                                        minWidth: 50
                                    },
                                    {
                                        Header: "Name",
                                        accessor: "name",
                                        minWidth: 50
                                    },
                                    {
                                        Header: "Email",
                                        accessor: "email",
                                        minWidth: 50
                                    },
                                    {
                                        Header: "Unlock Account",
                                        minWidth: 50,
                                        id: 'unlock',
                                        Cell: ({ row }) => {
                                            return (
                                                <div>
                                                    {row._original.isLocked ?
                                                        <Button outline color="warning" size="sm" onClick={(e) => this.onClickUnlock(e, row)}>
                                                            <FaLockOpen size={15} />
                                                            &nbsp;
                                                            Unlock
                                                        </Button>
                                                        : null}
                                                </div>
                                            );
                                        },
                                    }

                                ]}
                                getTdProps={(state, rowInfo, column, instance) => {
                                    return {
                                        onClick: e => {
                                            console.log(rowInfo);
                                            console.log(column);
                                            //계정이 잠겨 있으면 계정 락 해제 버튼 눌렀을때 행클릭 안 먹히게..
                                            if (column.id === 'unlock' && rowInfo.original.isLocked) {
                                                return;
                                            }
                                            if (rowInfo !== undefined) {
                                                console.log(rowInfo);
                                                this.props.history.push(`/admin/userDetail/${rowInfo.original.id}`)
                                            }
                                        }
                                    };
                                }}
                                data={data}
                                // pages={pages} // Display the total number of pages
                                loading={loading} // Display the loading overlay when we need it
                                onFetchData={this.fetchData} // Request new data when things change
                                pageSizeOptions={[5, 10, 15, 20]}
                                defaultPageSize={10}
                                ref={(instance) => { this.table = instance; }}
                                noDataText={'No Data found'}
                                getNoDataProps={() => { return { style: { backgroundColor: 'transparent', color: 'white' } } }}
                            />
                        </ContentCard>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default AdminMain;

