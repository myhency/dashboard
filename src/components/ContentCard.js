import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

class ContentCard extends Component {

    render() {
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
    
        if(this.props.inverse) {
            ContentCardProp.inverse = true;
        }
    
        if(this.props.backgroundColor) {
            ContentCardStyle.backgroundColor = this.props.backgroundColor;
        }
    
        if(this.props.borderColor) {
            ContentCardStyle.borderColor = this.props.borderColor;
        }
    
        if(this.props.table) {
            CardBodyStyle.padding = '0px';
        }
    
        if(this.props.headerStyle) {
            CardHeaderStyle = this.props.headerStyle;
        }
    
        if(this.props.noMarginBottom) {
            ContentCardStyle.marginBottom = '0px';
        }
    
        if(this.props.imgBackground) {
            // ContentCardStyle.background = 'url(/img/Ethereum3.png)';
            ContentCardStyle.background = 'url(/img/login_page.jpg)';
            ContentCardStyle.backgroundSize = 'cover';
            CardBodyStyle.background = 'rgba(0,0,0,0.7)';
            CardBodyStyle.padding = '0';
        }
    
        if(this.props.detailCard) {
            ContentCardStyle.background = 'black';
            ContentCardStyle.marginLeft = '150px';
            ContentCardStyle.marginRight = '150px';
            CardBodyStyle.background = 'black';
        }

        if(this.props.bodyNoPaddingBottom) {
            // ContentCardStyle.marginBottom = '0'
            CardBodyStyle.paddingBottom = '0';
            CardBodyStyle.marginBottom = '0';
            CardBodyStyle.overflow = 'auto';
            CardBody.className = 'scrollbar';
            CardBody.id = 'style-2';
        }

        return (
        
            <Card style={{...this.props.style, ...ContentCardStyle}}>
                {this.props.title !== undefined ? 
                <CardHeader style={{...CardHeaderStyle}}>
                    <p style={{fontSize:'1.1rem', margin:'0'}}>{this.props.title}</p>
                </CardHeader>
                : null
                }
                <CardBody style={{...CardBodyStyle}}>
                    {this.props.children}
                </CardBody>
            </Card>
        );
    }
}

export default ContentCard;