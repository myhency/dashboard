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
import { rejects } from 'assert';
const owasp = require('owasp-password-strength-test');

owasp.config({
    allowPassphrases       : false,
    maxLength              : 20,
    minLength              : 8,
    minOptionalTestsToPass : 2,
});


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
            id: userId,
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
        Fetch.POST('/node/auth/signIn', params, headers)
            .then((res) => {
                console.log(res);
                sessionStorage.setItem('token', res.token);
                sessionStorage.setItem('id', params.id);
                sessionStorage.setItem('role', res.role);
                this.props.dispatch(signIn(params.id, res.role));
                // this.props.history.push('/main/dashboard/');

                switch (res.role) {
                    case "normal":
                        this.props.history.push('/main');
                        return;
                    case "admin":
                        this.props.history.push('/admin');
                        break;
                    default:
                        break;
                }
            })
            .catch(error => {
                switch(error.status) {
                    case 404: // 로그인 실패
                        swal.fire(
                            'Login Denied!',
                            'Check your id and password',
                            'error'
                        );
                        break;
                    case 441: // 미접속 3개월 이상된 사용자일 시
                        swal.fire(
                            'Login Denied!',
                            'User is locked. Please ask to admin for unlock',
                            'warning'
                        );
                        break;    
                    case 442: // 패스워드 변경 후 6개월 경과, 패스워드변경/강제로그인 여부 선택
                        swal.fire({
                            title: 'Login Denied!',
                            text: "password has not been changed for long. please change it.",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: 'green',
                            confirmButtonText: 'Change now',
                            cancelButtonColor: 'orange',
                            cancelButtonText: 'Change later',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.value) { // 패스워드 변경 선택 시
                                swal.fire({
                                    title: 'Change passowrd',
                                    html:
                                        '<div style="text-align:left">Current Password</div>' +
                                        '<input id="userPassword" type="password" class="swal2-input">' +
                                        '<div class="swal2-validation-message" id="userPassword-validation" style="display: none; margin-left: -20px; margin-right: -20px;">Password is required</div>' + 
                                        '<div class="swal2-validation-message" id="userPassword-validation2" style="display: none; margin-left: -20px; margin-right: -20px;">Please check your password</div>' + 
                                        '<div style="text-align:left">New Password</div>' +
                                        '<input id="userNewPassword" type="password" class="swal2-input">' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation" style="display: none; margin-left: -20px; margin-right: -20px;">New password is required</div>' + 
                                        '<div class="swal2-validation-message" id="userNewPassword-validation2" style="display: none; margin-left: -20px; margin-right: -20px;">New password must be different with current password</div>' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation3" style="display: none; margin-left: -20px; margin-right: -20px;">New password is different with new password confirm</div>' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation4" style="display: none; margin-left: -20px; margin-right: -20px;">Password must be at least 8 characters long, containing at least two of mixtures of uppercase and lowercase letters, number, special character.</div>' +
                                        '<div style="text-align:left">New Password Confirm</div>' +
                                        '<input id="userNewPasswordConfirm" type="password" class="swal2-input">' + 
                                        '<div class="swal2-validation-message" id="userNewPasswordConfirm-validation" style="display: none; margin-left: -20px; margin-right: -20px;">New password confirm is required</div>',
                                    focusConfirm: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Submit',
                                    cancelButtonText: 'Cancel',
                                    allowOutsideClick: false,
                                    preConfirm: () => {
                                        document.getElementById('userPassword-validation').style.display = 'none';
                                        document.getElementById('userPassword-validation2').style.display = 'none';
                                        document.getElementById('userNewPassword-validation').style.display = 'none';
                                        document.getElementById('userNewPassword-validation2').style.display = 'none';
                                        document.getElementById('userNewPassword-validation3').style.display = 'none';
                                        document.getElementById('userNewPassword-validation4').style.display = 'none';
                                        document.getElementById('userNewPasswordConfirm-validation').style.display = 'none';

                                        const userPassword = document.getElementById('userPassword').value;
                                        const userNewPassword = document.getElementById('userNewPassword').value;
                                        const userNewPasswordConfirm = document.getElementById('userNewPasswordConfirm').value;
                                        
                                        // 패스워드 입력 여부 검증
                                        if(!userPassword) document.getElementById('userPassword-validation').style.display = 'flex';
                                        // 새로운 패스워드 입력 여부 검증
                                        if(!userNewPassword) 
                                            document.getElementById('userNewPassword-validation').style.display = 'flex';
                                        else {
                                            // 기존 패스워드와 새로운 패스워드 동일 여부 체크
                                            if(userPassword === userNewPassword) {
                                                document.getElementById('userNewPassword').value = '';
                                                document.getElementById('userNewPasswordConfirm').value = '';
                                                document.getElementById('userNewPassword-validation2').style.display = 'flex';
                                                document.getElementById('userNewPassword').focus();
                                                return false;
                                            }

                                            // Strong 패스워드 체크
                                            if(!owasp.test(userNewPassword).strong) {
                                                document.getElementById('userNewPassword').focus();
                                                document.getElementById('userNewPassword-validation4').style.display = 'flex';
                                                return false;
                                            }
                                        }
                                        // 새로운 패스워드 확인 입력 여부 검증
                                        if(!userNewPasswordConfirm) document.getElementById('userNewPasswordConfirm-validation').style.display = 'flex';
                                        
                                        // 입력안된 것이 있으면 return false
                                        if(!userPassword || !userNewPassword || !userNewPasswordConfirm) return false;

                                        
                                        // 새로운 패스워드, 패스워드 확인 동일 체크
                                        if(userNewPassword !== userNewPasswordConfirm) {
                                            document.getElementById('userNewPassword').value = '';
                                            document.getElementById('userNewPasswordConfirm').value = '';
                                            document.getElementById('userNewPassword-validation3').style.display = 'flex';
                                            document.getElementById('userNewPassword').focus();
                                            return false;
                                        }

                                        return fetch('/node/auth/password', {method: 'PUT', headers: {'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify({id:userId, password:userPassword, newPassword:userNewPassword})})
                                                .then(res => {
                                                    if (!res.ok) {
                                                        throw new Error(res.statusText)
                                                    }
                                                    return true;
                                                })
                                                .catch(error => {
                                                    document.getElementById('userPassword-validation2').style.display = 'flex';
                                                    return false;
                                                })
                                    }
                                })
                                .then((result) => {
                                    if (result.value) {
                                        swal.fire(
                                            'Please sign in with new password',
                                            '',
                                            'success'
                                        );
                                    }
                                })
                            }else { // 강제 로그인 선택 시
                                Fetch.POST('/node/auth/signIn?force=1', params, headers)
                                .then((res) => {
                                    console.log(res);
                                    sessionStorage.setItem('token', res.token);
                                    sessionStorage.setItem('id', params.id);
                                    sessionStorage.setItem('role', res.role);
                                    this.props.dispatch(signIn(params.id, res.role));
                                    this.props.history.push('/main/dashboard/');
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                            }
                        })
                        
                        break;    
                    case 443: // 계정의 패스워드가 초기 상태, 패스워드 변경 요구
                        swal.fire({
                            title: 'Login Denied!',
                            text: "password is initial state. please change.",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: 'green',
                            confirmButtonText: 'Change',
                            allowOutsideClick: false
                        }).then((result) => {
                            if (result.value) { // 패스워드 변경 선택 시
                                swal.fire({
                                    title: 'Change passowrd',
                                    html:
                                        '<div style="text-align:left">Current Password</div>' +
                                        '<input id="userPassword" type="password" class="swal2-input">' +
                                        '<div class="swal2-validation-message" id="userPassword-validation" style="display: none; margin-left: -20px; margin-right: -20px;">Password is required</div>' + 
                                        '<div class="swal2-validation-message" id="userPassword-validation2" style="display: none; margin-left: -20px; margin-right: -20px;">Please check your password</div>' + 
                                        '<div style="text-align:left">New Password</div>' +
                                        '<input id="userNewPassword" type="password" class="swal2-input">' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation" style="display: none; margin-left: -20px; margin-right: -20px;">New password is required</div>' + 
                                        '<div class="swal2-validation-message" id="userNewPassword-validation2" style="display: none; margin-left: -20px; margin-right: -20px;">New password must be different with current password</div>' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation3" style="display: none; margin-left: -20px; margin-right: -20px;">New password is different with new password confirm</div>' +
                                        '<div class="swal2-validation-message" id="userNewPassword-validation4" style="display: none; margin-left: -20px; margin-right: -20px;">Password must be at least 8 characters long, containing at least two of mixtures of uppercase and lowercase letters, number, special character.</div>' +
                                        '<div style="text-align:left">New Password Confirm</div>' +
                                        '<input id="userNewPasswordConfirm" type="password" class="swal2-input">' + 
                                        '<div class="swal2-validation-message" id="userNewPasswordConfirm-validation" style="display: none; margin-left: -20px; margin-right: -20px;">New password confirm is required</div>',
                                    focusConfirm: true,
                                    showCancelButton: true,
                                    confirmButtonText: 'Submit',
                                    cancelButtonText: 'Cancel',
                                    allowOutsideClick: false,
                                    preConfirm: () => {
                                        document.getElementById('userPassword-validation').style.display = 'none';
                                        document.getElementById('userPassword-validation2').style.display = 'none';
                                        document.getElementById('userNewPassword-validation').style.display = 'none';
                                        document.getElementById('userNewPassword-validation2').style.display = 'none';
                                        document.getElementById('userNewPassword-validation3').style.display = 'none';
                                        document.getElementById('userNewPassword-validation4').style.display = 'none';
                                        document.getElementById('userNewPasswordConfirm-validation').style.display = 'none';

                                        const userPassword = document.getElementById('userPassword').value;
                                        const userNewPassword = document.getElementById('userNewPassword').value;
                                        const userNewPasswordConfirm = document.getElementById('userNewPasswordConfirm').value;
                                        
                                        // 패스워드 입력 여부 검증
                                        if(!userPassword) document.getElementById('userPassword-validation').style.display = 'flex';
                                        // 새로운 패스워드 입력 여부 검증
                                        if(!userNewPassword) 
                                            document.getElementById('userNewPassword-validation').style.display = 'flex';
                                        else {
                                            // 기존 패스워드와 새로운 패스워드 동일 여부 체크
                                            if(userPassword === userNewPassword) {
                                                document.getElementById('userNewPassword').value = '';
                                                document.getElementById('userNewPasswordConfirm').value = '';
                                                document.getElementById('userNewPassword-validation2').style.display = 'flex';
                                                document.getElementById('userNewPassword').focus();
                                                return false;
                                            }

                                            // Strong 패스워드 체크
                                            if(!owasp.test(userNewPassword).strong) {
                                                document.getElementById('userNewPassword').focus();
                                                document.getElementById('userNewPassword-validation4').style.display = 'flex';
                                                return false;
                                            }
                                        }
                                        // 새로운 패스워드 확인 입력 여부 검증
                                        if(!userNewPasswordConfirm) document.getElementById('userNewPasswordConfirm-validation').style.display = 'flex';
                                        
                                        // 입력안된 것이 있으면 return false
                                        if(!userPassword || !userNewPassword || !userNewPasswordConfirm) return false;

                                        
                                        // 새로운 패스워드, 패스워드 확인 동일 체크
                                        if(userNewPassword !== userNewPasswordConfirm) {
                                            document.getElementById('userNewPassword').value = '';
                                            document.getElementById('userNewPasswordConfirm').value = '';
                                            document.getElementById('userNewPassword-validation3').style.display = 'flex';
                                            document.getElementById('userNewPassword').focus();
                                            return false;
                                        }

                                        return fetch('/node/auth/password', {method: 'PUT', headers: {'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify({id:userId, password:userPassword, newPassword:userNewPassword})})
                                                .then(res => {
                                                    if (!res.ok) {
                                                        throw new Error(res.statusText)
                                                    }
                                                    return true;
                                                })
                                                .catch(error => {
                                                    document.getElementById('userPassword-validation2').style.display = 'flex';
                                                    return false;
                                                })
                                    }
                                })
                                .then((result) => {
                                    if (result.value) {
                                        swal.fire(
                                            'Please sign in with new password',
                                            '',
                                            'success'
                                        );
                                    }
                                })
                            }
                        })
                        break;
                    default:
                        swal.fire(
                            'Login Denied!',
                            'unknown error',
                            'error'
                        );
                        break;
                }
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

    // enter키로 검색
    handleKeyPress = (event) => {
        if (event.key === 'Enter' && !(this.state.userId.length > 0 && this.state.password.length > 0)) {
            swal.fire(
                'Check your ID/PassWord',
                'Fill the all input',
                'warning'
            )
            return;
        } 
        else if (event.key === 'Enter') {
          event.preventDefault();
          this.onClickSignIn();
        }
    }

    render() {
        const { isInvalidUserId, isInvalidPassword } = this.state;

        return (
            <ContentRow style={{display:'flex', alignItems: 'center', justifyContent:'center'}}>
                <ContentCol xl={4} lg={5} md={6} sm={8} xs={12}>
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
                                    onKeyPress={this.handleKeyPress}
                                />
                                <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    invalid={isInvalidPassword}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.onChangePassword}
                                    onKeyPress={this.handleKeyPress}
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
                </ContentCol>
            </ContentRow>
        );
    }
}

export default connect(state => ({
    isLoading: state.loading.isLoading,
    auth: state.auth
}))(withRouter(SignIn));