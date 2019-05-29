import React, { Component, Fragment } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Input, Button, Form } from 'reactstrap';
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
  
  constructor(props){
    super(props);

    this.state={
      selectedFile: undefined
    }
  }

  onFilesChange=(files) => {
    this.setState({
      selectedFile: files[0]
    })
  }

  onFilesError=(error, files) =>{
    console.log(`error ${error.code}: ${error.message}`)
  }

  render() {
    return (
      <Fragment>
          <ContentCol xl={7} lg={7} md={12} sm={12} xs={12}>
            <ContentCard>
              <ContentRow>
                <Form inline style={{width: '100%'}}> 
                  <Input 
                    type='text'
                    disabled
                    style={{backgroundColor: 'white', marginLeft: '10px', width: '75%'}}
                    value={this.state.selectedFile === undefined ? 'select .sol file.' : this.state.selectedFile.name}/>
                  <Button 
                    outline color='secondary' onClick={() => {}}>
                    <Files 
                      onChange={this.onFilesChange}
                      onError={this.onFilesError}
                      multiple={false}
                    > 
                      Select File
                    </Files>
                  </Button>
                </Form> 
              </ContentRow>
            </ContentCard>
          </ContentCol>
          <ContentCol xl={5} lg={5} md={12} sm={12} xs={12}>

          </ContentCol>
      </Fragment>
    )
  }
}
