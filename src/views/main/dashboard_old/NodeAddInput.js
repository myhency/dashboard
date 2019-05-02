import React, { Component } from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    FormFeedback
} from "reactstrap";

class NodeAddInput extends Component {

    render() {
        const { onKeyPress } = this.props

        return (
            <div>
                <Input onChange={this.props.onAddNodeName} 
                    value={this.props.addNodeName} 
                    placeholder="Name" 
                    onKeyPress={onKeyPress}
                />
                <Input onChange={this.props.onAddNodeIP} 
                    value={this.props.addNodeIP} 
                    placeholder="IP" 
                    onKeyPress={onKeyPress}
                />
            </div>
        );
    }
}

export default NodeAddInput;