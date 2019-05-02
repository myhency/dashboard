import React from 'react';
import { Row } from 'reactstrap';

const ContentRow = ((props) => {
    return (
        <Row noGutters={props.noGutters} form={props.form} className={props.className} style={{...props.style}}>
            {props.children}
        </Row>
    );
});

export default ContentRow;