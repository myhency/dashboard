import React from 'react';
import ContentCard from 'components/ContentCard';
import { Button, Input } from 'reactstrap';

const Contract_code = (props) => {
  return (
    <ContentCard style={{margin: '0', border: 0, height: '520px'}}>
      <Button  style={{backgroundColor: '#0F9EDB', color: 'white'}}>
          Bytecodes View
      </Button> {' '}
      {/* <Button 
      color='info' outline={this.state.view === 'op' ? false : true}
      onClick={()=>this.setState({ view: 'op'})}>
          Opcodes View
      </Button> */}

      <Input readOnly type="textarea" value={props.byteCode} rows={10} style={{marginTop: '10px'}}/>
    </ContentCard>
  );
}

export default Contract_code;
