import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NodeAddInput from 'views/main/dashboard/NodeAddInput';

class NodeAddModal extends Component {

    render() {
        const { isOpen, toggle, onAddNodeName, onAddNodeIP, handleAddNode } = this.props;
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleAddNode();
            }
        }

        return (
            <div>
                <Modal isOpen={isOpen} fade={false} toggle={toggle} className={this.props.className}>
                    <ModalHeader toggle={toggle}>Add Node</ModalHeader>
                    <ModalBody>
                        <NodeAddInput onAddNodeName={onAddNodeName} onAddNodeIP={onAddNodeIP} onKeyPress={handleKeyPress}></NodeAddInput>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleAddNode}>Add</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default NodeAddModal;