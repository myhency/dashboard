import React, { Component, Fragment } from 'react';
import * as MaterialIcons from 'react-icons/md';

import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';
import ContentRow from 'components/ContentRow';
import _ from 'lodash';

const MeterialIconComponent = ((props) => {
    const MeterialIcon = MaterialIcons[props.icon];
    return (
        <MeterialIcon size={25}/>
    )
});


class Icons extends Component {
    render() {
        const meterialIconList = _.sortBy(Object.keys(MaterialIcons));
        return (
            <Fragment>
                <ContentCard title={'Meterial Icons'}>
                    <ContentRow>
                        {meterialIconList.map((icon, key) => {
                            return (
                                <ContentCol center xl={2} lg={2} xs={3} key={key}>
                                    <MeterialIconComponent icon={icon} />
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