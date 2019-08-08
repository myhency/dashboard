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

// window.$ = window.jQuery = jQuery;

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            userName: '',
            emal: '',
            isInvalidUserId: false,
            isInvalidPassword: false
        }
    }

    // onClickSignIn = () => {
    //     const { userId, password } = this.state;

    //     const params = {
    //         username: userId,
    //         password: password
    //     };

    //     let token = '';
    //     let redirect_url = '';

    //     // csrf 생성을 위한 장고 cookie 얻기
    //     function getCookie(name) {
    //         var cookieValue = null;
    //         if (document.cookie && document.cookie !== '') {
    //             var cookies = document.cookie.split(';');
    //             console.log(cookies);
    //             for (var i = 0; i < cookies.length; i++) {
    //                 var cookie = jQuery.trim(cookies[i]);
    //                 if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                     break;
    //                 }
    //             }
    //         }
    //         return cookieValue;
    //     }

    //     function getCookies(name) {
    //         var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    //         return value ? value[2] : null;
    //     }

    //     // 쿠키로부터 csrf 토큰 값 추출 
    //     var csrftoken = getCookie('csrftoken');

    //     // fetch post 옵션으로 보낼 dict 생성
    //     // API 보낼 때 헤더 생략되면 MIME타입으로 요청 -> 응답 불가
    //     const django = {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-CSRFToken': csrftoken,
    //         }
    //     }

    //     let isInvalidUserId = false;
    //     let isInvalidPassword = false;

    //     if (userId === '') {
    //         isInvalidUserId = true;
    //     }

    //     if (password === '') {
    //         isInvalidPassword = true;
    //     }

    //     this.setState({
    //         isInvalidUserId,
    //         isInvalidPassword
    //     });

    //     if (isInvalidUserId || isInvalidPassword) {
    //         return;
    //     }


    //     //서버와 통신하여 로그인 성공/실패 판단
    //     // this.props.dispatch(loadingStart())
    //     // .then(() => {
    //     // post에 param 전달
    //     Fetch.POST('/api/auth/login/', params, django)
    //         .then((res) => {
    //             sessionStorage.setItem('userId', res.username);
    //             // token = res.result.data.token;
    //             // redirect_url = res.result.redirect_url;

    //             this.props.dispatch(signIn(res.username));
    //             this.props.history.push('/main/dashboard');
    //         })
    //         .catch(error => {
    //             swal.fire(
    //                 'Login Denied!',
    //                 'Check your id and password',
    //                 'error'
    //             );
    //         })
    //     // .finally((res) => {
    //     //     console.log(res);
    //     //     // if(res.status == undefined) {
    //     //     //    this.props.history.push('/main/dashboard'); 
    //     //     // } else {
    //     //     //     alert('Please Checkup Again')
    //     //     // }
    //     // })
    //     // })


    //     // const logoutUrl = '/api/auth/logout/';
    //     // const params = {
    //     //     userId: userId,
    //     //     password: password,
    //     // };

    //     // // 쿠키 얻고 장고로 csrf 보내는 부분 함수화시킬 것
    //     // function getCookie(name) {
    //     //     var cookieValue = null;
    //     //     if (document.cookie && document.cookie !== '') {
    //     //         var cookies = document.cookie.split(';');
    //     //         for (var i = 0; i < cookies.length; i++) {
    //     //             var cookie = jQuery.trim(cookies[i]);
    //     //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //     //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //     //                 break;
    //     //             }
    //     //         }
    //     //     }
    //     //     return cookieValue;
    //     // }

    //     // // 쿠키로부터 csrf 토큰 값 추출 
    //     // var csrftoken = getCookie('csrftoken');

    //     // // fetch post 옵션으로 보낼 dict 생성
    //     // const django = {
    //     //     headers: {
    //     //         'Accept': 'application/json',
    //     //         'Content-Type': 'application/json',
    //     //         'X-CSRFToken': csrftoken,
    //     //     }
    //     // }

    //     // let signInFlag = false;

    //     // this.props.dispatch(loadingStart())
    //     // .then(() => {
    //     //     // post에 param 전달
    //     //     Fetch.POST(url, params, django)
    //     //     .then(res => {
    //     //         signInFlag = 'true';
    //     //         // 나중에 연동하면 바꿀 것
    //     //         // signInFlag = res.signInFlag;
    //     //     })
    //     //     .catch(error => {
    //     //         alert(error);
    //     //     })
    //     //     .finally(() => {
    //     //         this.props.dispatch(loadingStop());
    //     //         if(signInFlag === 'true') {
    //     //             this.props.history.push('/auth/SignIn/');
    //     //             console.log("logout success")
    //     //         } else {
    //     //             console.log("logout fail")
    //     //         }
    //     //     })
    //     // })

    //     // sessionStorage.clear();
    // }

    onClickSignUp = () => {
        // const { userId, password, userName, email } = this.state;
        // const params = {
        //     userName: userId,
        //     password: password,
        //     name: userName,
        //     email: email
        // };

        // const headers = {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }

        // //서버와 통신하여 signup 정보 저장
        // //저장이 완료되면 signin page로 이동
        // Fetch.POST('/api/auth/signup/', params, headers)
        //     .then((res) => {

        //     }).catch(error => {
        //         swal.fire(
        //             'Sign-Up Denied!',
        //             'Check your information',
        //             'error'
        //         );
        //     })

        // this.props.history.push('/auth/signIn');

        Fetch.GET(`/auth`)
            .then(res => {
                console.log(res);
            })
            .finally(() => {

            })
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
        // const { isInvalidUserId, isInvalidPassword } = this.state;

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
                            <Form>
                                <FormGroup>
                                    <Input
                                        invalid={isInvalidPassword}
                                        placeholder="Account" onChange={this.onChangeUserId} />
                                    <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.onChangePassword}
                                    />
                                    <FormFeedback invalid={"true"}>Password is required.</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input
                                        type="password"
                                        placeholder="Confirm your password"
                                        onChange={this.onChangePassword}
                                    />
                                    <FormFeedback invalid={"true"}>Password is required.</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder="Your name" />
                                    <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input placeholder="Email" />
                                    <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
                                </FormGroup>
                            </Form>
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

