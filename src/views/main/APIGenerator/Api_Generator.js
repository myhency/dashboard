import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Row, Col } from 'reactstrap';
import { FiBox } from 'react-icons/fi';
import { MdTimer,MdHourglassEmpty } from 'react-icons/md';
import { TiKeyOutline } from 'react-icons/ti';
import _ from 'lodash';
import moment from 'moment';
import Files from 'react-files';

import Fetch from 'utils/Fetch.js';
import CustomChart from 'components/CustomChart/CustomChart.js';
import { chartContents } from 'components/CustomChart/Properties.js';

export default class Api_Generator extends Component {
  render() {
    return (
      <Fragment>
          <ContentCol xl={7} lg={7} md={12} sm={12} xs={12}>
            <ContentCard>
                
            </ContentCard>
          </ContentCol>
          <ContentCol xl={5} lg={5} md={12} sm={12} xs={12}>

          </ContentCol>
      </Fragment>
    )
  }
}
