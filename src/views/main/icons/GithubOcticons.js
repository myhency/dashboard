import React, { Component, Fragment } from 'react';
import * as GithubOcticons from 'react-icons/go';

import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';
import ContentRow from 'components/ContentRow';
import _ from 'lodash';

const GithubOcticonComponent = ((props) => {
    const GithubOcticon = GithubOcticons[props.icon];
    return (
        <GithubOcticon size={25}/>
    )
});

class Icons extends Component {
    render() {
        const githubOcticonList = _.sortBy(Object.keys(GithubOcticons));
        return (
            <Fragment>

                <ContentCard title={'Github Octicons'}>
                    <ContentRow>
                        {githubOcticonList.map((icon, key) => {
                            return (
                                <ContentCol center xl={2} lg={2} xs={3} key={key}>
                                    <GithubOcticonComponent icon={icon} />
                                    <p style={{fontSize:'.9rem'}}>{icon}</p>
                                </ContentCol>
                            )
                        })}
                    </ContentRow>
                </ContentCard>
            </Fragment>
        );
    }
}

export default Icons;