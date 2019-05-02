import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { signIn } from 'store/modules/auth';
import { loadingStart, loadingStop } from 'store/modules/loading';
import Fetch from 'utils/Fetch';
import jQuery from "jquery";

class Service extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddr: '',
            nodeName: ''
        }
    }

    onClickCreateBlockchainNode = () => {
        console.log('onClickSignIn')
    }

    onChangeIpAddr = (event) => {
        this.setState({
            ipAddr: event.target.value
        })
    }

    onChangeNodeName = (event) => {
        this.setState({
            nodeName: event.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <ContentCard>
                    <ContentRow>
                        <ContentCol>
                            <h3>Create a Blockchain node</h3>
                        </ContentCol>
                    </ContentRow>
                    <Form style={{marginBottom:'1rem'}}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText>Ip Address</InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    placeholder="0.0.0.0" 
                                    onChange={this.onChangeIpAddr}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Form style={{marginBottom:'1rem'}}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Node Name</InputGroupText>
                                </InputGroupAddon>
                                <Input 
                                    onChange={this.onChangeNodeName}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <ContentRow>
                        <ContentCol>
                            <Button className={'authButton'} onClick={this.onClickCreateBlockchainNode}>Create</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default Service;