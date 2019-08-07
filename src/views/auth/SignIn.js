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
import { signIn } from 'store/modules/auth';
import { loadingStart, loadingStop } from 'store/modules/loading';
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
            username: userId,
            password: password
        };

        let token = '';
        let redirect_url = '';

        // csrf 생성을 위한 장고 cookie 얻기
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                console.log(cookies);
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        function getCookies(name) {
            var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value ? value[2] : null;
        }

        // 쿠키로부터 csrf 토큰 값 추출 
        var csrftoken = getCookie('csrftoken');

        // fetch post 옵션으로 보낼 dict 생성
        // API 보낼 때 헤더 생략되면 MIME타입으로 요청 -> 응답 불가
        const django = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
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
        Fetch.POST('/api/auth/login/', params, django)
            .then((res) => {
                sessionStorage.setItem('userId', res.username);
                // token = res.result.data.token;
                // redirect_url = res.result.redirect_url;

                this.props.dispatch(signIn(res.username));
                this.props.history.push('/main/dashboard');
            })
            .catch(error => {
                swal.fire(
                    'Login Denied!',
                    'Check your id and password',
                    'error'
                );
            })
        // .finally((res) => {
        //     console.log(res);
        //     // if(res.status == undefined) {
        //     //    this.props.history.push('/main/dashboard'); 
        //     // } else {
        //     //     alert('Please Checkup Again')
        //     // }
        // })
        // })


        // const logoutUrl = '/api/auth/logout/';
        // const params = {
        //     userId: userId,
        //     password: password,
        // };

        // // 쿠키 얻고 장고로 csrf 보내는 부분 함수화시킬 것
        // function getCookie(name) {
        //     var cookieValue = null;
        //     if (document.cookie && document.cookie !== '') {
        //         var cookies = document.cookie.split(';');
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

        // // 쿠키로부터 csrf 토큰 값 추출 
        // var csrftoken = getCookie('csrftoken');

        // // fetch post 옵션으로 보낼 dict 생성
        // const django = {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'X-CSRFToken': csrftoken,
        //     }
        // }

        // let signInFlag = false;

        // this.props.dispatch(loadingStart())
        // .then(() => {
        //     // post에 param 전달
        //     Fetch.POST(url, params, django)
        //     .then(res => {
        //         signInFlag = 'true';
        //         // 나중에 연동하면 바꿀 것
        //         // signInFlag = res.signInFlag;
        //     })
        //     .catch(error => {
        //         alert(error);
        //     })
        //     .finally(() => {
        //         this.props.dispatch(loadingStop());
        //         if(signInFlag === 'true') {
        //             this.props.history.push('/auth/SignIn/');
        //             console.log("logout success")
        //         } else {
        //             console.log("logout fail")
        //         }
        //     })
        // })

        // sessionStorage.clear();
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