import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Spinner } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import Fetch from 'utils/Fetch';
import swal from "sweetalert2";
import _debounce from 'lodash.debounce';
import { createBrotliCompress } from 'zlib';
import owasp from 'owasp-password-strength-test';

owasp.config({
    allowPassphrases       : false,
    maxLength              : 20,
    minLength              : 8,
    minOptionalTestsToPass : 2,
});

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            name: '',
            email: '',
            isInvalidUserId: false,
            isInvalidPassword: false,

            loading: false
        }
    }

    handleValidSubmit = (event, values) => {
        const { id, password, name, email } = this.state;
        const params = {
            id: id,
            password: password,
            name: name,
            email: email
        };
    
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        this.setState({
            loading: true
        });
        Fetch.POST('/node/auth/users', params, headers)
            .then((res) => {
                swal.fire(
                    'Sign-up completed!',
                    'Go to the login page',
                    'success'
                );
                this.props.history.push('/auth/signIn');
    
            }).catch(error => {
                swal.fire(
                    'Sign-Up Denied!',
                    'Check your information',
                    'error'
                );
            })
            .finally(() => {
                this.setState({
                    loading: false
                });
            })
    }

    handleInvalidSubmit = (event, errors, values) => {
        console.log(event);
        console.log(errors);
        console.log(values);
    }

    validateUserId = (value, ctx, input, cb) => {
        if(value === '') {
            cb(true);
            return;
        }

        Fetch.GET(`/node/auth/users/${value}/exists`)
        .then(res => {
            cb(res.exists === false);
        })
        .catch(err => {
            console.log(err);
        })
    };

    validatePassword = (value, ctx, input, cb) => {
        if(value === '') {
            cb(true);
            return;
        }
        
        cb(owasp.test(value).strong === true || value === '');
    };

    onChangeUserId = (event) => {
        this.setState({
            id: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }


    render() {
        const {loading} = this.state;
        return (
            <ContentRow style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
                <ContentCol xl={6} lg={8} md={10} sm={12} xs={12}>
                    <ContentCard>
                        <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                            <ContentRow>
                                <ContentCol>
                                    <div>
                                        <h1 style={{ color: 'white' }}>Built for Developers</h1>
                                    </div>
                                    <div>
                                        <h6 style={{ color: 'lightGrey' }}>
                                            GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside 36 million developers.
                                    </h6>
                                    </div>

                                </ContentCol>

                                <ContentCol>
                                        <label style={{ color: 'white' }}>ID</label>
                                        <AvField
                                            type="text"
                                            name="id"
                                            errorMessage="Id is already taken"
                                            validate={{
                                                required: { value: true, errorMessage: 'this field is required' },
                                                custom: this.validateUserId
                                            }}
                                            onChange={this.onChangeUserId} 
                                        />
                                        <label style={{ color: 'white' }}>Password</label>
                                        <AvField
                                            type="password"
                                            name="password"
                                            errorMessage="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            validate={{
                                                required: { value: true, errorMessage: 'this field is required' },
                                                custom: this.validatePassword
                                            }}
                                            onChange={this.onChangePassword} />
                                        <label style={{ color: 'white' }}>Name</label>
                                        <AvField
                                            type="text"
                                            name="name"
                                            validate={{
                                                required: { value: true, errorMessage: 'this field is required' },
                                                pattern: { value: '^[a-z0-9_-]{3,24}$', errorMessage: 'Must have 3~24 characters (alphabets, numbers only)' }
                                            }}
                                            onChange={this.onChangeName} />
                                        <label style={{ color: 'white' }}>Email</label>
                                        <AvField
                                            type="email"
                                            name="email"
                                            validate={{ 
                                                required: { value: true, errorMessage: 'this field is required' },
                                                email: { value: true, errorMessage: 'please enter email'}
                                            }}
                                            onChange={this.onChangeEmail} />
                                </ContentCol>
                            </ContentRow>
                            <ContentRow className={'signUpRow'}>
                                <ContentCol className={'signUpCol'}>
                                    <Button className={'signUpButton'} disabled={loading}>
                                        {loading && (
                                            <Fragment>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Spinner size="sm" color="light" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Fragment>
                                        )}
                                        {!loading && (
                                            <Fragment>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign up&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </Fragment>
                                        )}
                                        
                                    </Button>
                                    <Button className={'backButton'} onClick={() => this.props.history.goBack()}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Button>
                                </ContentCol>
                            </ContentRow>
                        </AvForm>
                    </ContentCard>
                </ContentCol>
            </ContentRow>
        );
    }
}

export default connect(null)(withRouter(SignUp));

