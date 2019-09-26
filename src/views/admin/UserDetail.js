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

class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            
            name: '',
            role: '',
            email: '',
            createdAt: '',
            updatedAt: '',
            lastSignedInAt: '',
            isLocked: '',
            
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
                updatedAt: res.updatedAt,
                lastSignedInAt: res.lastSignedInAt,
                isLocked: res.isLocked
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

    
    
    onClickModify = () => {
        this.props.history.push(`/admin/userModify/${this.state.id}`);
    }
    
    onClickList = () => {
        this.props.history.push(`/admin/userList`);
    }
    
    onClickDelete = () => {
        const { id } = this.state;
        
        Swal.fire({
            title: 'Delete user?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
            cancelButtonText: 'no',
            
        })
        .then((result) => {
            if (result.value) {
                let url = `/node/admin/users/${id}`;
                
                const options = {
                    headers: {
                        'Content-Type':'application/json'
                    }
                };
                
                this.setState({
                    loading: true
                });
                Fetch.DELETE(url, {},options)
                .then(res => {
                    Swal.fire(
                        'Deleted!',
                        '',
                        'success'
                        ).then(() => {
                            this.props.history.push('/admin/userList');
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
                })
            }
        })
    }
        
    onClickResetPassword = () => {
        const { id } = this.state;

        Swal.fire({
            title: 'Reset User password?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
            cancelButtonText: 'no',

        }).then((result) => {
            if (result.value) {
                
                let url = `/node/admin/users/${id}/initialize`;

                this.setState({
                    loading: true
                });
                Fetch.PUT(url,{},{})
                .then(res => {
                    Swal.fire(
                        'Reset Password!',
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
                })
            }
        })
    }

    render() {
        const { id, name, role, email, isLocked, createdAt, updatedAt, lastSignedInAt, loading } = this.state;
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
                                    <p style={{ color: 'lightyellow' }}>{role}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Email</h5>
                                    <p style={{ color: 'lightyellow' }}>{email}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Account Status</h5>
                                    <div>
                                        { isLocked ?
                                            <p style={{ color: 'lightyellow' }}>Lock</p>
                                        :
                                        <p style={{ color: 'lightyellow' }}>Unlock</p>}
                                    </div>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Created Date</h5>
                                    <p style={{ color: 'lightyellow' }}>{moment(createdAt).format(datetimeFormat)}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Updated Date</h5>
                                    <p style={{ color: 'lightyellow' }}>{moment(updatedAt).format(datetimeFormat)}</p>
                                    <br></br>
                                    <h5 style={{ color: 'white' }}>Last Login</h5>
                                    <p style={{ color: 'lightyellow' }}>{moment(lastSignedInAt).format(datetimeFormat)}</p>
                                    <br></br>
                                </ContentCol>
                            </ContentRow>
                            <ContentRow>
                            </ContentRow>
                        </ContentCard>
                        <ContentRow>
                            <ContentCol >
                                <Button color = "info" onClick={this.onClickModify} disabled={loading}>
                                    Modify
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button color = "danger" onClick={this.onClickDelete} disabled={loading}>
                                    Delete
                                </Button>
                            </ContentCol>
                            <ContentCol right>
                                <Button onClick={this.onClickList} disabled={loading}>
                                    List 
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button color = "warning" onClick={this.onClickResetPassword} disabled={loading}>
                                    Reset Password 
                                </Button>
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default UserDetail;

