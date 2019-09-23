import React, { Component, Fragment } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Input, InputGroup, FormFeedback } from 'reactstrap';
import classnames from 'classnames';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';



class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',

            password: '',
            passwordCheck:'',

            isInvalidPassword: false,
            isValidPassword: false
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onChangePasswordCheck = (event) => {
        let isInvalidPassword = false;
        if (EventTarget.target.value !== this.state.password){
            isInvalidPassword = true;
        }
        this.setState({
            passwordCheck: event.target.value,
            isInvalidPassword,
            isValidPassword:false,
            isInvalidPasswordMessage: "password mismatch!"
        })
    }

    onclickSave = () => {
        // 여기에 받은 비번 값 api에 넘기는거 작성
        
        this.props.history.push('/main/myprofile' );
    }
    

    render() {
        const { password, passwordCheck, isInvalidPassword, isValidPassword, isInvalidPasswordMessage } = this.state;
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol xs="auto">
                        <ContentRow >
                            <img alt="copy" src={'/img/frame.png'} />
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <h4 style={{ color: 'white' }}>James</h4>
                        </ContentRow>
                        <ContentRow style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Button 
                                onClick={this.onclickSave}>Save
                            </Button>
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
                                            <h5 style={{ color: 'white' }}>User account</h5>
                                            <p style={{ color: 'lightyellow' }}>James</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Role</h5>
                                            <p style={{ color: 'lightyellow' }}>Admin</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Name</h5>
                                            <p style={{ color: 'lightyellow' }}>James</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Email</h5>
                                            <p style={{ color: 'lightyellow' }}>james@gmail.com</p>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Password</h5>
                                            {/* <p style={{ color: 'lightyellow' }}>james@gmail.com</p> */}
                                            <InputGroup>
                                                <Input
                                                    id="password"
                                                    type="text"
                                                    value={password}
                                                    onChange={this.onChangePassword}    
                                                    />
                                            </InputGroup>
                                            <br></br>
                                            <h5 style={{ color: 'white' }}>Confirm Password</h5>
                                            {/* <p style={{ color: 'lightyellow' }}>james@gmail.com</p> */}
                                            <InputGroup>
                                                <Input
                                                    id="password"
                                                    type="text"
                                                    value={passwordCheck}
                                                    valid={isValidPassword}
                                                    invalid={isInvalidPassword}
                                                    onChange={this.onChangePasswordCheck}    
                                                    />
                                                <FormFeedback valid>
                                                    password match!
                                                </FormFeedback>
                                                <FormFeedback invalid>
                                                    {isInvalidPasswordMessage}
                                                </FormFeedback>
                                            </InputGroup>

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
