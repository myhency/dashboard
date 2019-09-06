import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import Fetch from 'utils/Fetch';
import swal from "sweetalert2";


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            name: '',
            email: '',
            isInvalidUserId: false,
            isInvalidPassword: false
        }
    }

    onClickSignUp = () => {

        const { account, password, name, email } = this.state;
        const params = {
            account: account,
            role: 'normal',
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

        Fetch.POST('/user/account', params, headers)
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

    }

    onChangeUserAccount = (event) => {
        this.setState({
            account: event.target.value
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

        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <p>
                                <h1 style={{ color: 'white' }}>Built for Developers</h1>
                            </p>
                            <p>
                                <h6 style={{ color: 'lightGrey' }}>
                                    GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside 36 million developers.
                            </h6>
                            </p>
                        </ContentCol>

                        <ContentCol>
                            <AvForm
                            // onValidSubmit={this.handleValidSubmit}
                            // onInvalidSubmit={this.handleInvalidSubmit}
                            >
                                <label style={{ color: 'white' }}>Account</label>
                                <AvField
                                    type="text"
                                    name="account"
                                    placeholder="Your account name"
                                    errorMessage="Invalid account name, at least 3 characters required, maximum is 24"
                                    validate={{
                                        required: { value: true },
                                        pattern: { value: '^[a-z0-9_-]{3,24}$' }
                                    }}
                                    onChange={this.onChangeUserAccount} />
                                <label style={{ color: 'white' }}>Password</label>
                                <AvField
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    errorMessage="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                    validate={{
                                        required: { value: true },
                                        // pattern: { value: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' }
                                    }}
                                    onChange={this.onChangePassword} />
                                <label style={{ color: 'white' }}>Name</label>
                                <AvField
                                    type="text"
                                    name="name"
                                    placeholder="Your full name"
                                    onChange={this.onChangeName} />
                                <label style={{ color: 'white' }}>Email</label>
                                <AvField
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    validate={{ email: true }}
                                    onChange={this.onChangeEmail} />
                            </AvForm>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow className={'signUpRow'}>
                        <ContentCol className={'signUpCol'}>
                            <Button className={'signUpButton'}
                                onClick={this.onClickSignUp}>Sign up for HMG BaaS</Button>
                        </ContentCol>

                    </ContentRow>
                </ContentCard>
            </Fragment>

        );
    }
}

export default connect(null)(withRouter(SignUp));

