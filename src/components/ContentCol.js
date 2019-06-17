import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';

const ContentCol = (props) => {
    let ContentColStyle = {
        marginBottom: '1rem'
    };

    if(props.center) {
        ContentColStyle.textAlign = 'center';
    }

    if(props.verticalCenter) {
        ContentColStyle.alignSelf = 'center';
    }

    if(props.right) {
        ContentColStyle.textAlign = 'right';
    }

    if(props.block) {
        ContentColStyle.width = '100%';
    }

    if(props.wrap) {
        ContentColStyle.flexGrow = 0;
        ContentColStyle.width = 'auto';
        ContentColStyle.flexBasis = 'auto';
    }

    if(props.noMarginBottom) {
        ContentColStyle.marginBottom = '0px'
    }

    return (
        <Col xl={props.xl} lg={props.lg} md={props.md} sm={props.sm} xs={props.xs} widths={props.widths} className={props.className} style={{...props.style, ...ContentColStyle}}>
            {props.children}
        </Col>
    );
};

const stringOrNumberProp = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const columnProps = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
  PropTypes.shape({
    size: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
    // example size values:
    // 12 || "12" => col-12 or col-`width`-12
    // auto => col-auto or col-`width`-auto
    // true => col or col-`width`
    order: stringOrNumberProp,
    offset: stringOrNumberProp
  })
]);

ContentCol.propTypes = {
  xs: columnProps,
  sm: columnProps,
  md: columnProps,
  lg: columnProps,
  xl: columnProps,
  // override the predefined width (the ones above) with your own custom widths.
  // see https://github.com/reactstrap/reactstrap/issues/297#issuecomment-273556116
  widths: PropTypes.array,
}

export default ContentCol;