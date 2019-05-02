import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';

class Buttons extends Component {
    render() {
        return (
            <Fragment>
                <ContentCard title={'Buttons'}>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Normal
                        </ContentCol>
                        <ContentCol center>
                            <Button color="primary">primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="secondary">secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="warning">warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="success">success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="info">info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="danger">danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="link">link</Button>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Active
                        </ContentCol>
                        <ContentCol center>
                            <Button color="primary" active>primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="secondary" active>secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="warning" active>warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="success" active>success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="info" active>info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="danger" active>danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="link" active>link</Button>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Disabled
                        </ContentCol>
                        <ContentCol center>
                            <Button color="primary" disabled>primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="secondary" disabled>secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="warning" disabled>warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="success" disabled>success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="info" disabled>info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="danger" disabled>danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="link" disabled>link</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>

                <ContentCard title={'Outline Buttons'}>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Normal
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="primary">primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="secondary">secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="warning">warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="success">success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="info">info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="danger">danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="link">link</Button>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Active
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="primary" active>primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="secondary" active>secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button color="warning" active>warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="success" active>success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="info" active>info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="danger" active>danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="link" active>link</Button>
                        </ContentCol>
                    </ContentRow>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol xl="2" md="12">
                            Disabled
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="primary" disabled>primary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="secondary" disabled>secondary</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="warning" disabled>warning</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="success" disabled>success</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="info" disabled>info</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="danger" disabled>danger</Button>
                        </ContentCol>
                        <ContentCol center>
                            <Button outline color="link" disabled>link</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>

                <ContentCard title={'Block Buttons'}>
                    <ContentRow style={{alignItems:'center'}}>
                        <ContentCol md="12">
                            <Button color="primary" block>primary</Button>
                        </ContentCol>
                        <ContentCol md="12">
                            <Button color="success" block>success</Button>
                        </ContentCol>
                        <ContentCol md="12">
                            <Button color="warning" block>warning</Button>
                        </ContentCol>
                        <ContentCol md="12">
                            <Button outline color="primary" block>primary</Button>
                        </ContentCol>
                        <ContentCol md="12">
                            <Button outline color="success" block>success</Button>
                        </ContentCol>
                        <ContentCol md="12">
                            <Button outline color="warning" block>warning</Button>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default Buttons;