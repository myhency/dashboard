import React, { Component, Fragment } from 'react';
import * as Typicons from 'react-icons/ti';

import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';
import ContentRow from 'components/ContentRow';
import _ from 'lodash';

const TypiconComponent = ((props) => {
    const Typicon = Typicons[props.icon];
    return (
        <Typicon size={25}/>
    )
});

class Icons extends Component {
    render() {
        const typiconList = _.sortBy(Object.keys(Typicons));
        return (
            <Fragment>

                <ContentCard title={'Typicons'}>
                    <ContentRow>
                        {typiconList.map((icon, key) => {
                            return (
                                <ContentCol center xl={2} lg={2} xs={3} key={key}>
                                    <TypiconComponent icon={icon} />
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