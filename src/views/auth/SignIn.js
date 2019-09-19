import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    FormFeedback
} from "reactstrap";
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import Fetch from 'utils/Fetch';
import jQuery from "jquery";
import swal from "sweetalert2";
import { signIn } from 'store/modules/auth';


window.$ = window.jQuery = jQuery;

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            isInvalidUserId: false,
            isInvalidPassword: false
        }
    }

    onClickSignIn = () => {
        const { userId, password } = this.state;

        const params = {
            account: userId,
            password: password
        };

        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        let isInvalidUserId = false;
        let isInvalidPassword = false;

        if (userId === '') {
            isInvalidUserId = true;
        }

        if (password === '') {
            isInvalidPassword = true;
        }

        this.setState({
            isInvalidUserId,
            isInvalidPassword
        });

        if (isInvalidUserId || isInvalidPassword) {
            return;
        }


        //서버와 통신하여 로그인 성공/실패 판단
        // this.props.dispatch(loadingStart())
        // .then(() => {
        // post에 param 전달
        Fetch.POST('/user/signin/', params, headers)
            .then((res) => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('account', params.account);
                sessionStorage.setItem('role', res.role);
                this.props.dispatch(signIn(params.account, res.role));
                this.props.history.push('/main/dashboard/');
            })
            .catch(error => {
                swal.fire(
                    'Login Denied!',
                    'Check your id and password',
                    'error'
                );
            });
    }

    onClickSignUp = () => {
        this.props.history.push('/auth/signUp');
    }

    onChangeUserId = (event) => {
        this.setState({
            userId: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        const { isInvalidUserId, isInvalidPassword } = this.state;

        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <h3 style={{ color: 'white' }}>HMG BaaS</h3>
                        </ContentCol>
                    </ContentRow>
                    <Form style={{ marginBottom: '1rem' }}>
                        <FormGroup>
                            <Input
                                invalid={isInvalidUserId}
                                placeholder="ID"
                                onChange={this.onChangeUserId}
                            />
                            <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input
                                invalid={isInvalidPassword}
                                type="password"
                                placeholder="Password"
                                onChange={this.onChangePassword}
                            />
                            <FormFeedback invalid={"true"}>Password is required.</FormFeedback>
                        </FormGroup>
                    </Form>
                    <ContentRow>
                        <ContentCol>
                            <Button className={'authButton'} onClick={this.onClickSignIn}>Sign in</Button>
                            <Button className={'signUpButton'} onClick={this.onClickSignUp}>Sign up for HMG BaaS</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default connect(state => ({
    isLoading: state.loading.isLoading,
    auth: state.auth
}))(withRouter(SignIn));