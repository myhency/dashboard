import React, { Component, Fragment } from 'react';
import { Badge } from 'reactstrap';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';

class Badges extends Component {
    render() {
        return (
            <Fragment>
                <ContentCard title="Normal Badges">
                    <ContentRow>
                        <ContentCol>
                            <Badge color="primary">Primary</Badge>{' '}
                            <Badge color="secondary">Secondary</Badge>{' '}
                            <Badge color="success">Success</Badge>{' '}
                            <Badge color="danger">Danger</Badge>{' '}
                            <Badge color="warning">Warning</Badge>{' '}
                            <Badge color="info">Info</Badge>{' '}
                            <Badge color="light">Light</Badge>{' '}
                            <Badge color="dark">Dark</Badge>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>

                <ContentCard title="Pill Badges">
                    <ContentRow>
                        <ContentCol>
                            <Badge color="primary" pill>Primary</Badge>{' '}
                            <Badge color="secondary" pill>Secondary</Badge>{' '}
                            <Badge color="success" pill>Success</Badge>{' '}
                            <Badge color="danger" pill>Danger</Badge>{' '}
                            <Badge color="warning" pill>Warning</Badge>{' '}
                            <Badge color="info" pill>Info</Badge>{' '}
                            <Badge color="light" pill>Light</Badge>{' '}
                            <Badge color="dark" pill>Dark</Badge>
                        </ContentCol>
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default Badges;