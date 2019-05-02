import React, { Component, Fragment } from 'react';
import * as Ionicons from 'react-icons/io';

import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';
import ContentRow from 'components/ContentRow';
import _ from 'lodash';

const IoniconComponent = ((props) => {
    const Ionicon = Ionicons[props.icon];
    return (
        <Ionicon size={25}/>
    )
});

class Icons extends Component {
    render() {
        const ioniconList = _.sortBy(Object.keys(Ionicons));
        return (
            <Fragment>

                <ContentCard title={'Ionicons'}>
                    <ContentRow>
                        {ioniconList.map((icon, key) => {
                            return (
                                <ContentCol center xl={2} lg={2} xs={3} key={key}>
                                    <IoniconComponent icon={icon} />
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