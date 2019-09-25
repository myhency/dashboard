import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Input, InputGroup, FormFeedback } from 'reactstrap';
import classnames from 'classnames';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';

import { AvForm, AvField } from 'availity-reactstrap-validation';
import owasp from 'owasp-password-strength-test';
import swal from "sweetalert2";

import Fetch from 'utils/Fetch';

owasp.config({
    allowPassphrases       : false,
    maxLength              : 20,
    minLength              : 8,
    minOptionalTestsToPass : 2,
});



class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',

            password: '',
            passwordCheck:'',

            id: '',
            name: '',
            role: '',
            email: ''
        };

        this.fetchData();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    fetchData = () => {
        this.setState({ 
            loading: true 
        });
        Fetch.GET(`/node/admin/profile`)
        .then(res => {
            this.setState({
                id: res.id,
                name: res.name,
                role: res.role,
                email: res.email
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

    validatePassword = (value, ctx, input, cb) => {
        const { originPassword } = this.state;

        if(value === '') {
            cb(true);
            return;
        }
        
        if(!owasp.test(value).strong) {
            cb("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            return;
        }
        else if(value === '') {
            cb(true);
            return;
        }
        else if(value === originPassword) {
            cb("New Password must be different from previous password.");
            return;
        }
        else {
            cb(true);
            return;
        }
    };

    validatePasswordCheck = (value, ctx, input, cb) => {
        const { password } = this.state; 
        
        cb(password === value);
    };

    onChangeOriginPassword = (event) => {
        this.setState({
            originPassword: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangePasswordCheck = (event) => {
        this.setState({
            passwordCheck: event.target.value,
        })
    }


    handleValidSubmit = (event, values) => {
        console.log(values);
        const { password, originPassword } = this.state;
        const params = {
            
            password: originPassword,
            newPassword: password
        };
        console.log(params);
    
        const headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        this.setState({
            loading: true
        });
        Fetch.PUT('/node/admin/password', params, headers)
        .then((res) => {
            swal.fire(
                'Password Chaneged!',
                'Go to the login page',
                'success'
            );

            Fetch.GET(`/node/auth/signOut`, {})
            .then(res => {
            })
            .catch(error => {
            })
            .finally(() => {
                sessionStorage.clear();
                this.props.history.push('/auth/signIn' );
            })
        })
        .catch(error => {
            console.log(error);
            swal.fire(
                'Wrong Password!',
                'Check your password',
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

    

    render() {
        const { id, name, role, email } = this.state;
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xs="auto">
                        <ContentRow >
                            <img alt="copy" src={'/img/frame.png'} />
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <h4 style={{ color: 'white' }}>{name}</h4>
                        </ContentRow>
                    </ContentCol>
                        <ContentCol>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                        Overview
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '0' })}
                                        onClick={() => { this.toggle('0'); }}>
                                        Wallet
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <ContentCard>
                                        <ContentRow>
                                            <ContentCol>
                                                <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                                                    <h5 style={{ color: 'white' }}>User account</h5>
                                                    <p style={{ color: 'lightyellow' }}>{id}</p>
                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}>Role</h5>
                                                    <p style={{ color: 'lightyellow' }}>{role}</p>
                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}>Name</h5>
                                                    <p style={{ color: 'lightyellow' }}>{name}</p>
                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}>Email</h5>
                                                    <p style={{ color: 'lightyellow' }}>{email}</p>
                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}> Password</h5>
                                                    <AvField
                                                        type="password"
                                                        name="originPassword"
                                                        validate={{
                                                            required: { value: true, errorMessage: 'this field is required' }
                                                        }}
                                                        onChange={this.onChangeOriginPassword} 
                                                    />
                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}>New Password</h5>
                                                    <AvField
                                                        type="password"
                                                        name="password"
                                                        validate={{
                                                            required: { value: true, errorMessage: 'this field is required' },
                                                            custom: this.validatePassword
                                                        }}
                                                        onChange={this.onChangePassword} 
                                                    />

                                                    <br></br>
                                                    <h5 style={{ color: 'white' }}>Confirm New Password</h5>
                                                    <AvField
                                                        type="password"
                                                        name="passwordCheck"
                                                        errorMessage="password mismatch!"
                                                        validate={{
                                                            required: { value: true, errorMessage: 'this field is required' },
                                                            custom: this.validatePasswordCheck
                                                        }}
                                                        onChange={this.onChangePasswordCheck} 
                                                    />
                                                    <Button>Save</Button>
                                                </AvForm>
                                            </ContentCol>
                                        </ContentRow>
                                    </ContentCard>
                                </TabPane>
                            </TabContent>
                        </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default EditProfile;
