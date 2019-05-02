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
import jQuery from "jquery";
import DjangoCSRF from 'utils/MakeDjangoCSRF'

window.$ = window.jQuery = jQuery;

class FindHost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "",
            inputList: [""]
        }
    }

    onClickSignIn = () => {
        //this.props.history.push('/auth/SignIn/');
        const { inputList } = this.state;

        this.setState({
            inputList
        });

        const url = '/api/hosts/';
        const params = {
            hosts: inputList,
        };

        this.props.dispatch(loadingStart())
        .then(() => {
            // post에 param 전달
            Fetch.POST(url, params, DjangoCSRF.HEADER)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => {
                this.props.dispatch(loadingStop());
                this.props.history.push('/main/home/');
            })
        })
    }

    onClickAddRow = () => {
        this.setState({
            inputList: this.state.inputList.concat([""])
        });
    }

    onChangeIP = (event) => {
        this.setState({
            ip: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    onClickDeleteRow = idx => () => {
        this.setState({
            inputList: this.state.inputList.filter((s, sidx) => idx !== sidx)
        });
    };

    onChangeIP = idx => evt => {
        const newIPs = this.state.inputList.map((out, sidx) => {
            if (idx !== sidx) return out;
            return evt.target.value;
        });

        this.setState({ inputList: newIPs });
    };

    render() {
        const { ip, inputList } = this.state;
        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <h3>Find Host</h3>
                        </ContentCol>
                    </ContentRow>
                    <Form style={{marginBottom:'1rem'}}>
                        {this.state.inputList.map((inputList, idx) => (
                        <FormGroup>
                            <ContentRow>
                                <ContentCol md="10">
                                    <Input
                                        placeholder={`Host IP #${idx + 1}`}
                                        onChange={this.onChangeIP(idx)}
                                    />
                                </ContentCol>
                                <ContentCol md="2">
                                    <Button outline block color="danger" onClick={this.onClickDeleteRow(idx)}>-</Button>
                                </ContentCol>
                            </ContentRow>
                        </FormGroup>
                        ))}
                    </Form>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol md="12">
                            <Button outline color="success" onClick={this.onClickAddRow} block>Add Row</Button>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow>
                        <ContentCol>
                            <Button color="primary" onClick={this.onClickSignIn} block>Find</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default connect(null)(withRouter(FindHost));