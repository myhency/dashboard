import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import {
    Form, Input, InputGroup, InputGroupAddon,
    Button, Table, Badge,
    Card, CardBody, CardHeader, CardFooter
} from 'reactstrap';
import ReactTable from 'react-table';

class AdminMain extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <ContentRow>
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
                </ContentRow>
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

                                ]}
                                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                                // data={blocks}
                                // pages={pages} // Display the total number of pages
                                // loading={loading} // Display the loading overlay when we need it
                                // onFetchData={this.getBlock} // Request new data when things change
                                pageSizeOptions={[5, 10, 15, 20]}
                                defaultPageSize={10}
                                noDataText={'No Data found'}
                                getNoDataProps={() => { return { style: { backgroundColor: 'transparent', color: 'white' } } }}
                            />
                        </ContentCard>
                        {/* <Card>
                            <CardHeader tag="h3">User list</CardHeader>
                            <CardBody style={{ maxHeight: '560px', overflow: 'auto' }}>
                                <Table bordered style={{ tableLayout: 'fixed' }}>
                                    <thead style={{ backgroundColor: 'skyblue', textAlign: 'center' }}>
                                        <tr>
                                            <th style={{ width: '30%' }}>ID</th>
                                            <th style={{ width: '20%' }}>Role</th>
                                            <th style={{ width: '50%' }}>Name</th>
                                            <th style={{ width: '20%' }}>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr key='1'>
                                            <td style={{ textAlign: 'center' }}>userid-1</td>
                                            <td style={{ textAlign: 'center' }}>admin</td>
                                            <td style={{ textAlign: 'center' }}>James</td>
                                            <td style={{ textAlign: 'center' }}>james@gmail.com</td>
                                        </tr>
                                        <tr key='2'>
                                            <td style={{ textAlign: 'center' }}>userid-2</td>
                                            <td style={{ textAlign: 'center' }}>monitor</td>
                                            <td style={{ textAlign: 'center' }}>Tom</td>
                                            <td style={{ textAlign: 'center' }}>tom@gmail.com</td>
                                        </tr>
                                        <tr key='3'>
                                            <td style={{ textAlign: 'center' }}>userid-1</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>James</td>
                                            <td style={{ textAlign: 'center' }}>james@gmail.com</td>
                                        </tr>
                                        <tr key='4'>
                                            <td style={{ textAlign: 'center' }}>userid-2</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>Tom</td>
                                            <td style={{ textAlign: 'center' }}>tom@gmail.com</td>
                                        </tr>
                                        <tr key='5'>
                                            <td style={{ textAlign: 'center' }}>userid-1</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>James</td>
                                            <td style={{ textAlign: 'center' }}>james@gmail.com</td>
                                        </tr>
                                        <tr key='6'>
                                            <td style={{ textAlign: 'center' }}>userid-2</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>Tom</td>
                                            <td style={{ textAlign: 'center' }}>tom@gmail.com</td>
                                        </tr>
                                        <tr key='7'>
                                            <td style={{ textAlign: 'center' }}>userid-1</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>James</td>
                                            <td style={{ textAlign: 'center' }}>james@gmail.com</td>
                                        </tr>
                                        <tr key='8'>
                                            <td style={{ textAlign: 'center' }}>userid-2</td>
                                            <td style={{ textAlign: 'center' }}>normal</td>
                                            <td style={{ textAlign: 'center' }}>Tom</td>
                                            <td style={{ textAlign: 'center' }}>tom@gmail.com</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                            </CardFooter>
                        </Card> */}
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default AdminMain;

{/* <ContentRow>
    <ContentCard>
        <ContentRow>
            <ContentCol>
                <h3 style={{ color: "#FFFFFF" }}>Hosts</h3>
            </ContentCol>
        </ContentRow>
        <ContentRow>
            <ContentCol>
                <ContentCard>aa</ContentCard>
            </ContentCol>
            <ContentCol>
                <ContentCard>aa</ContentCard>
            </ContentCol>
            <ContentCol>
                <ContentCard>aa</ContentCard>
            </ContentCol>
        </ContentRow>
    </ContentCard>
</ContentRow> */}