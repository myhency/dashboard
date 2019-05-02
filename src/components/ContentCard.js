import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

const ContentCard = (props) => {
    let ContentCardStyle = {
        marginBottom:'1rem'
    };

    let ContentCardProp = {

    };

    let CardHeaderStyle ={
        background:'#F0F3F5'
    };

    let CardBodyStyle = {

    };

    if(props.inverse) {
        ContentCardProp.inverse = true;
    }

    if(props.backgroundColor) {
        ContentCardStyle.backgroundColor = props.backgroundColor;
    }

    if(props.borderColor) {
        ContentCardStyle.borderColor = props.borderColor;
    }

    if(props.table) {
        CardBodyStyle.padding = '0px';
    }

    if(props.headerStyle) {
        CardHeaderStyle = props.headerStyle;
    }

    return (
        <Card {...ContentCardProp} style={{...props.style, ...ContentCardStyle}}>
            {props.title !== undefined ? 
            <CardHeader style={{...CardHeaderStyle}}>
                <p style={{fontSize:'1.1rem', margin:'0'}}>{props.title}</p>
            </CardHeader>
            : null
            }
            <CardBody style={{...CardBodyStyle}}>
                {props.children}
            </CardBody>
        </Card>
    );
};

export default ContentCard;