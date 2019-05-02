import React, { Component, Fragment } from 'react';

import * as FontAwesomeIcons from 'react-icons/fa';

import ContentCard from 'components/ContentCard';
import ContentCol from 'components/ContentCol';
import ContentRow from 'components/ContentRow';
import _ from 'lodash';

const FontAwesomeIconComponent = ((props) => {
    const FontAwesomeIcon = FontAwesomeIcons[props.icon];
    return (
        <FontAwesomeIcon size={25}/>
    )
});

class Icons extends Component {
    render() {
        const fontAwesomeIconList = _.sortBy(Object.keys(FontAwesomeIcons));
        return (
            <Fragment>
                <ContentCard title={'FontAwesome Icons'}>
                    <ContentRow>
                        {fontAwesomeIconList.map((icon, key) => {
                            return (
                                <ContentCol center xl={2} lg={2} xs={3} key={key}>
                                    <FontAwesomeIconComponent icon={icon} />
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