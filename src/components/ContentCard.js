import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

const ContentCard = (props) => {
    let ContentCardStyle = {
        marginBottom:'1rem',
        background: '#1C1C1D'
    };

    let ContentCardProp = {

    };

    let CardHeaderStyle ={
        background:'#1C1C1D'
    };

    let CardBodyStyle = {
        background:'#090909'
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

    if(props.noMarginBottom) {
        ContentCardStyle.marginBottom = '0px';
    }

    if(props.imgBackground) {
        // ContentCardStyle.background = 'url(/img/Ethereum3.png)';
        ContentCardStyle.background = 'url(/img/login_page.jpg)';
        ContentCardStyle.backgroundSize = 'cover';
        CardBodyStyle.background = 'rgba(0,0,0,0.7)';
    }

    if(props.detailCard) {
        ContentCardStyle.background = 'black';
        ContentCardStyle.marginLeft = '150px';
        ContentCardStyle.marginRight = '150px';
        CardBodyStyle.background = 'black';
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