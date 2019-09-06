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
// import { signIn } from 'store/modules/auth';
// import { loadingStart, loadingStop } from 'store/modules/loading';
import Fetch from 'utils/Fetch';
import jQuery from "jquery";
import swal from "sweetalert2";

// import Background from '/img/login_page.jpeg';

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

        // let token = '';
        // let redirect_url = '';

        // // csrf 생성을 위한 장고 cookie 얻기
        // function getCookie(name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         var cookies = document.cookie.split(';');
        //         console.log(cookies);
        //         for (var i = 0; i < cookies.length; i++) {
        //             var cookie = jQuery.trim(cookies[i]);
        //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
        //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        //                 break;
        //             }
        //         }
        //     }
        //     return cookieValue;
        // }

        // function getCookies(name) {
        //     var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        //     return value ? value[2] : null;
        // }

        // 쿠키로부터 csrf 토큰 값 추출 
        // var csrftoken = getCookie('csrftoken');

        // fetch post 옵션으로 보낼 dict 생성
        // API 보낼 때 헤더 생략되면 MIME타입으로 요청 -> 응답 불가
        const headers = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'X-CSRFToken': csrftoken,
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
                this.props.history.push('/main/dashboard');
            })
            .catch(error => {
                swal.fire(
                    'Login Denied!',
                    'Check your id and password',
                    'error'
                );
            })
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
                            {/* <FormText>Example help text that remains unchanged.</FormText> */}
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

export default connect(null)(withRouter(SignIn));