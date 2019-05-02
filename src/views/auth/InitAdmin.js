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
import { loadingStart, loadingStop } from 'store/modules/loading';
import Fetch from 'utils/Fetch';
import DjangoCSRF from 'utils/MakeDjangoCSRF'
import validation from 'utils/Validation'

class InitAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            confirmPassword: '',
            isInvalidUserId: false,
            isInvalidPassword: false,
            isInvalidConfirmPassword: false
        }
    }

    onClickSignUp = () => {
        const { userId, password, confirmPassword } = this.state;
        let isInvalidUserId = false;
        let isInvalidPassword = false;
        let isInvalidConfirmPassword = false;
        console.log(validation.isNotCorrectID(userId));
        if(validation.isEmpty(userId) || validation.isNotCorrectID(userId)) {
            isInvalidUserId = true;
        }

        if(validation.isEmpty(password)) {
            isInvalidPassword = true;
        }

        if(validation.isEmpty(confirmPassword) || validation.isNotMatchPassword(password, confirmPassword)) {
            isInvalidConfirmPassword = true;
        }

        this.setState({
            isInvalidUserId,
            isInvalidPassword,
            isInvalidConfirmPassword
        });

        if(isInvalidUserId || isInvalidPassword || isInvalidConfirmPassword) {
            return;
        }

        const url = '/api/users/';
        const params = {
            'username': userId,
            'password': password,
            'is_superuser':true
        };

        let responseFlag = false;

        this.props.dispatch(loadingStart())
        .then(() => {
            // post에 param 전달
            Fetch.POST(url, params, DjangoCSRF.HEADER)
            .then(res => {
                responseFlag = true;
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                this.props.dispatch(loadingStop());
                if(responseFlag === true) {
                    this.props.history.push('/auth/signIn');
                } else {
                    alert('Please Checkup Again')
                }
            })
        })
    };

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

    onChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    render() {
        const { isInvalidUserId, isInvalidPassword, isInvalidConfirmPassword } = this.state;
        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <h3>Signup New Admin Account</h3>
                        </ContentCol>
                    </ContentRow>
                    <Form style={{marginBottom:'1rem'}}>
                        <FormGroup>
                            <Input 
                                invalid={isInvalidUserId}
                                placeholder="ID" 
                                onChange={this.onChangeUserId}
                            />
                            <FormFeedback invalid={"true"}>Please Check ID</FormFeedback>
                            {/* <FormText>Example help text that remains unchanged.</FormText> */}
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                invalid={isInvalidPassword}
                                type="password" 
                                placeholder="Password" 
                                onChange={this.onChangePassword}
                            />
                            <FormFeedback invalid={"true"}>Please Check Password</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                invalid={isInvalidConfirmPassword}
                                type="password" 
                                placeholder="Password Confirm" 
                                onChange={this.onChangeConfirmPassword}
                            />
                            <FormFeedback invalid={"true"}>Please Check Confirm Password</FormFeedback>
                        </FormGroup>
                    </Form>
                    <ContentRow>
                        <ContentCol>
                            <Button className={'signUpButton'} onClick={this.onClickSignUp}>SignUp</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default connect(null)(withRouter(InitAdmin));