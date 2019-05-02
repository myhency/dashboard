import React, { Component, Fragment } from 'react'
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Table, Row, Col, Button } from 'reactstrap';


export default class selectDapp extends Component {
  onClickCard = (string) => {
      this.props.history.push('/main/dapp/'+string);
  }

  render() {
    return (
      <Fragment>
          <ContentRow>
              <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                  <ContentCard>
                    <Button outline color='link' 
                    style={{borderColor: 'White', width: '100%', fontSize: '2rem'}}
                    onClick={() => this.onClickCard('supplychain')}>
                        Supply Chain
                    </Button>
                  </ContentCard>
              </ContentCol>
              <ContentCol xl={3} lg={6} md={6} sm={12} xs={12}>
                  <ContentCard>
                    <Button outline color='link' style={{borderColor: 'White', width: '100%', fontSize: '2rem'}}>
                        Token Service
                    </Button>
                  </ContentCard>
              </ContentCol>
          </ContentRow>
      </Fragment>
    )
  }
}
