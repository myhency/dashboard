import React, { Component, Fragment } from 'react';
import { Alert, UncontrolledAlert, Button } from 'reactstrap';
import ContentCard from 'components/ContentCard';

class Alerts extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          visible: true,
          visible2: true
        };
    }
    
    onDismiss = () => {
        this.setState({ visible: false });
    }

    onDismiss2 = () => {
        this.setState({ visible2: false });
    }

    refreshToggle = () => {
        this.setState({
            visible: true,
            visible2: true
        });
    }

    render() {
        return (
            <Fragment>
                <ContentCard title="Alerts">
                    <Alert color="primary">
                        This is a primary alert — check it out!
                    </Alert>
                    <Alert color="secondary">
                        This is a secondary alert — check it out!
                    </Alert>
                    <Alert color="success">
                        This is a success alert — check it out!
                    </Alert>
                    <Alert color="danger">
                        This is a danger alert — check it out!
                    </Alert>
                    <Alert color="warning">
                        This is a warning alert — check it out!
                    </Alert>
                    <Alert color="info">
                        This is a info alert — check it out!
                    </Alert>
                    <Alert color="light">
                        This is a light alert — check it out!
                    </Alert>
                    <Alert color="dark">
                        This is a dark alert — check it out!
                    </Alert>
                </ContentCard>

                <ContentCard title="Toggle Alerts">
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        I am an alert and I can be dismissed!
                    </Alert>

                    <Alert color="info" isOpen={this.state.visible2} toggle={this.onDismiss2}>
                        I am an alert and I can be dismissed!
                    </Alert>

                    <Button color="primary" onClick={this.refreshToggle}>
                        Refresh Toggle
                    </Button>
                </ContentCard>

                <ContentCard title="One-Time-Toggle Alerts">
                    <UncontrolledAlert color="danger">
                        I am an alert and I can be dismissed!
                    </UncontrolledAlert>

                    <UncontrolledAlert color="info">
                        I am an alert and I can be dismissed!
                    </UncontrolledAlert>
                </ContentCard>
            </Fragment>
        );
    }
};

export default Alerts;