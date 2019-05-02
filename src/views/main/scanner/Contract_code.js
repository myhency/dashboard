import React, { Component } from 'react';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ContentCard from 'components/ContentCard';
import { Button } from 'reactstrap';

export default class Contract_code extends Component {
    constructor(props){
        super(props);

        this.state=({
            view: 'byte'
        })
    }
  render() {
    return (
      <ContentCard style={{margin: '0', border: 0, height: '500px'}}>
        <br/>
        <Button 
        color='info' outline={this.state.view === 'byte' ? false : true}
        onClick={()=>this.setState({ view: 'byte'})}>
            Bytecodes View
        </Button> {' '}
        <Button 
        color='info' outline={this.state.view === 'op' ? false : true}
        onClick={()=>this.setState({ view: 'op'})}>
            Opcodes View
        </Button>
      </ContentCard>
    )
  }
}
