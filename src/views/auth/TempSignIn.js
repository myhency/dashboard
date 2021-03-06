// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import {
//     Button,
//     Form,
//     FormGroup,
//     Input,
//     FormFeedback
// } from "reactstrap";
// import ContentRow from 'components/ContentRow';
// import ContentCol from 'components/ContentCol';
// import ContentCard from 'components/ContentCard';
// import { loadingStart, loadingStop } from 'store/modules/loading';
// import Fetch from 'utils/Fetch';
// import jQuery from "jquery";

// window.$ = window.jQuery = jQuery;

// class SignIn extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userId: '',
//             password: '',
//             isInvalidUserId: false,
//             isInvalidPassword: false
//         }
//     }

//     onClickSignIn = () => {
//         this.props.history.push('/auth/findHost/');

//         // const { userId, password } = this.state;
//         // let isInvalidUserId = false;
//         // let isInvalidPassword = false;

//         // if(userId === '') {
//         //     isInvalidUserId = true;
//         // }

//         // if(password === '') {
//         //     isInvalidPassword = true;
//         // }

//         // this.setState({
//         //     isInvalidUserId,
//         //     isInvalidPassword
//         // });

//         // if(isInvalidUserId || isInvalidPassword) {
//         //     return;
//         // }

//         // const url = '/auth/signInOut/';
//         // const params = {
//         //     userId: userId,
//         //     password: password,
//         // };

//         // // 쿠키 얻고 장고로 csrf 보내는 부분 함수화시킬 것
//         // function getCookie(name) {
//         //     var cookieValue = null;
//         //     if (document.cookie && document.cookie !== '') {
//         //         var cookies = document.cookie.split(';');
//         //         for (var i = 0; i < cookies.length; i++) {
//         //             var cookie = jQuery.trim(cookies[i]);
//         //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//         //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         //                 break;
//         //             }
//         //         }
//         //     }
//         //     return cookieValue;
//         // }

//         // // 쿠키로부터 csrf 토큰 값 추출 
//         // var csrftoken = getCookie('csrftoken');

//         // // fetch post 옵션으로 보낼 dict 생성
//         // const django = {
//         //     headers: {
//         //         'Accept': 'application/json',
//         //         'Content-Type': 'application/json',
//         //         'X-CSRFToken': csrftoken,
//         //     }
//         // }

//         // let signInFlag = false;

//         // this.props.dispatch(loadingStart())
//         // .then(() => {
//         //     // post에 param 전달
//         //     Fetch.POST(url, params, django)
//         //     .then(res => {
//         //         signInFlag = 'true';
//         //         // 나중에 연동하면 바꿀 것
//         //         // signInFlag = res.signInFlag;
//         //     })
//         //     .catch(error => {
//         //         alert(error);
//         //     })
//         //     .finally(() => {
//         //         this.props.dispatch(loadingStop());
//         //         if(signInFlag === 'true') {
//         //             this.props.history.push('/auth/initAdmin/');
//         //             console.log("login success")
//         //         } else {
//         //             console.log("login fail")
//         //             alert('Please Signup First')
//         //         }
//         //     })
//         // })

//         // sessionStorage.setItem('userId', userId);
//         // this.props.dispatch(signIn(userId));
//         // this.props.history.push('/main');
//     }

//     onChangeUserId = (event) => {
//         this.setState({
//             userId: event.target.value
//         })
//     }

//     onChangePassword = (event) => {
//         this.setState({
//             password: event.target.value
//         })
//     }

//     render() {
//         const { isInvalidUserId, isInvalidPassword } = this.state;
//         return (
//             <Fragment>
//                 <ContentCard>
//                     <ContentRow>
//                         <ContentCol>
//                             <h3>Sign in</h3>
//                         </ContentCol>
//                     </ContentRow>
//                     <Form style={{marginBottom:'1rem'}}>
//                         <FormGroup>
//                             <Input 
//                                 invalid={isInvalidUserId}
//                                 placeholder="ID" 
//                                 onChange={this.onChangeUserId}
//                             />
//                             <FormFeedback invalid={"true"}>ID is required.</FormFeedback>
//                             {/* <FormText>Example help text that remains unchanged.</FormText> */}
//                         </FormGroup>
//                         <FormGroup>
//                             <Input 
//                                 invalid={isInvalidPassword}
//                                 type="password" 
//                                 placeholder="Password" 
//                                 onChange={this.onChangePassword}
//                             />
//                             <FormFeedback invalid={"true"}>Password is required.</FormFeedback>
//                         </FormGroup>
//                     </Form>
//                     <ContentRow>
//                         <ContentCol>
//                             <Button className={'authButton'} onClick={this.onClickSignIn}>Sign in</Button>
//                         </ContentCol>
//                     </ContentRow>
//                 </ContentCard>
//             </Fragment>
//         );
//     }
// }

// export default connect(null)(withRouter(SignIn));