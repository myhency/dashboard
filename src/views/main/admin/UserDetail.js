import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import {
    Button, Table, Label, InputGroup, Input
} from 'reactstrap';
import Fetch from 'utils/Fetch';
import ReactTable from 'react-table';

class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,

            
            name: '',
            role: '',
            email: '',
            
            loading: false
        };
    }

    componentDidMount() {
        this.selectUserInfo();
    }

    selectUserInfo = () => {

        const { id } = this.state;

        let url = `/node/admin/users/${id}`;
        console.log(url);
        this.setState({ 
            loading: true 
        });
        console.log("in1");
        Fetch.GET(url)
        .then(res => {
            console.log("in");
            console.log(res);
            this.setState({
                id: res.id,
                name: res.name,
                role: res.role,
                email: res.email
            })
        })
        .catch(error => {
        })
        .finally(() => {
            this.setState({
                loading: false
            })
        })
    }


    render() {
        const { id, name, role, email, loading } = this.state;
        return (
            <Fragment>
                <ContentRow>
                    <ContentCol lg={6} md={12} sm={12} xs={12}>
                        <ContentCard>
                            <ContentRow>
                                <ContentCol>
                                    <Label for="id">
                                        ID
                                    </Label>
                                    <InputGroup>
                                        <Input
                                            id="id"
                                            type="text"
                                            value={id}
                                            diabled
                                        />                                        
                                    </InputGroup>
                                </ContentCol>
                            </ContentRow>
                            <ContentRow>
                                <ContentCol>
                                    <Label for="name">
                                        Name
                                    </Label>
                                    <InputGroup>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            diabled
                                        />                                        
                                    </InputGroup>
                                </ContentCol>
                            </ContentRow>
                            <ContentRow>
                                <ContentCol>
                                    <Label for="role">
                                        Role
                                    </Label>
                                    <InputGroup>
                                        <Input
                                            id="role"
                                            type="text"
                                            value={role}
                                            diabled
                                        />                                        
                                    </InputGroup>
                                </ContentCol>
                            </ContentRow>
                            <ContentRow>
                                <ContentCol>
                                    <Label for="Email">
                                        Email
                                    </Label>
                                    <InputGroup>
                                        <Input
                                            id="email"
                                            type="text"
                                            value={email}
                                            diabled
                                        />                                        
                                    </InputGroup>
                                </ContentCol>
                            </ContentRow>
                        </ContentCard>
                        <ContentRow>
                            <ContentCol>
                                <Button onClick={this.onClickModify} disabled={loading}>
                                    Modify
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={this.onClickDelete} disabled={loading}>
                                    Delete
                                </Button>
                            </ContentCol>
                        </ContentRow>
                    </ContentCol>
                </ContentRow>
            </Fragment>
        )
    }
}
export default UserDetail;

