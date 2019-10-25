import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import {
    Button, Table, Label, InputGroup, Input
} from 'reactstrap';
import Fetch from 'utils/Fetch';
import Swal from 'sweetalert2';
import moment from 'moment';
import { datetimeFormat } from '../../common/Properties';

class UserModify extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,


            name: '',
            role: '',
            email: '',
            createdAt: '',
            updatedAt: '',

            loading: false
        };
    }

    componentDidMount() {
        this.selectUserInfo();
    }

    selectUserInfo = () => {

        const { id } = this.state;

        let url = `/node/admin/users/${id}`;
        console.log(url);
        this.setState({
            loading: true
        });
        Fetch.GET(url)
            .then(res => {
                console.log(res);
                this.setState({
                    id: res.id,
                    name: res.name,
                    role: res.role,
                    email: res.email,
                    createdAt: res.createdAt,
                    updatedAt: res.updatedAt
                })
            })
            .catch(error => {
            })
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    onChangeRole = (event) => {
        this.setState({
            role: event.target.value
        })
    }


    onClickSave = () => {
        const { role, id } = this.state;

        Swal.fire({
            title: 'Modify User Role?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
            cancelButtonText: 'no',

        }).then((result) => {
            if (result.value) {

                let url = `/node/admin/users/${id}/role`;
                console.log(url);
                const options = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                const params = {
                    role: role
                };

                this.setState({
                    loading: true
                });
                Fetch.POST(url, params, options)
                    .then(res => {
                        Swal.fire(
                            'Modified!',
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
                        this.props.history.push(`/admin/userDetail/${id}`);
                    })
            }
        })
    }


    render() {
        const { id, name, role, email, createdAt, updatedAt, loading } = this.state;
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol lg={6} md={12} sm={12} xs={12}>
                        <ContentCard>
                            <ContentRow>
                                <ContentCol>
                                    <h5 style={{ color: 'white' }}>User account</h5>
                                    <p style={{ color: 'lightyellow' }}>{id}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Name</h5>
                                    <p style={{ color: 'lightyellow' }}>{name}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Role</h5>
                                    <InputGroup>
                                        <Input id="role" type="select" value={role} onChange={this.onChangeRole} >
                                            <option value="admin">admin</option>
                                            <option value="normal">normal</option>
                                        </Input>
                                    </InputGroup>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Email</h5>
                                    <p style={{ color: 'lightyellow' }}>{email}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Created Date</h5>
                                    <p style={{ color: 'lightyellow' }}>{moment(createdAt).format(datetimeFormat)}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Updated Date</h5>
                                    <p style={{ color: 'lightyellow' }}>{moment(updatedAt).format(datetimeFormat)}</p>
                                    <br></br>
                                </ContentCol>
                            </ContentRow>
                        </ContentCard>
                        <ContentRow>
                            <ContentCol>
                                <Button color="success" onClick={this.onClickSave} disabled={loading}>
                                    Save
                                </Button>
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default UserModify;

