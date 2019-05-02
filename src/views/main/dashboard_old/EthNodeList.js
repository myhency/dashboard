import React, { Component } from 'react';
import ContentCard from 'components/ContentCard';
import ContentRow from 'components/ContentRow';
import ContentCol from 'components/ContentCol';
import ReactTable from 'react-table';
import checkboxHOC from "react-table/lib/hoc/selectTable";
import Chance from "chance";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NodeAddModal from 'views/main/dashboard/NodeAddModal';

const CheckboxTable = checkboxHOC(ReactTable);
const chance = new Chance();

function getData(inputData) {
    const data = inputData.map(item => {
        // using chancejs to generate guid
        // shortid is probably better but seems to have performance issues
        // on codesandbox.io

        // data에서 ID 넘어오면 이 부분 제거 가능
        const _id = chance.guid();
        return {
            _id,
            ...item
        };
    });

    return data;
}

class EthNodeList extends Component {
    constructor(props) {
        super(props);
        const data = getData(this.props.data);
        this.state = {
          data,
          selection: [],
          selectAll: false,
          editModal: false,
          addModal: false,
          addNodeName: '',
          addNodeIP: '',
        };
    }

    toggle = () => {
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    }

    addToggle = () => {
        this.setState(prevState => ({
            addModal: !prevState.addModal
        }));
    }

    toggleSelection = (key, shift, row) => {
        /*
          Implementation of how to manage the selection state is up to the developer.
          This implementation uses an array stored in the component state.
          Other implementations could use object keys, a Javascript Set, or Redux... etc.
        */
        // start off with the existing state
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        // check to see if the key exists
        if (keyIndex >= 0) {
          // it does exist so we will remove it using destructing
          selection = [
            ...selection.slice(0, keyIndex),
            ...selection.slice(keyIndex + 1)
          ];
        } else {
          // it does not exist so add it
          selection.push(key);
        }
        // update the state
        this.setState({ selection });
    };
    
    toggleAll = () => {
        /*
            'toggleAll' is a tricky concept with any filterable table
            do you just select ALL the records that are in your data?
            OR
            do you only select ALL the records that are in the current filtered data?
            
            The latter makes more sense because 'selection' is a visual thing for the user.
            This is especially true if you are going to implement a set of external functions
            that act on the selected information (you would not want to DELETE the wrong thing!).
            
            So, to that end, access to the internals of ReactTable are required to get what is
            currently visible in the table (either on the current page or any other page).
            
            The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
            ReactTable and then get the internal state and the 'sortedData'. 
            That can then be iterrated to get all the currently visible records and set
            the selection state.
        */
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
                    // we need to get at the internals of ReactTable
                    const wrappedInstance = this.checkboxTable.getWrappedInstance();
                    // the 'sortedData' property contains the currently accessible records based on the filter and sort
                    const currentRecords = wrappedInstance.getResolvedState().sortedData;
                    // we just push all the IDs onto the selection array
                    currentRecords.forEach(item => {
                    selection.push(item._original._id);
                });
            }
        this.setState({ selectAll, selection });
    };


    handleRemove = () => {
        const { data, selection } = this.state;
        // JS array multi component delete example
        var newData = data.filter(item => !selection.includes(item._id));

        this.setState({
            data: newData
        })
    }

    isSelected = key => { 
        /*
            Instead of passing our external selection state we provide an 'isSelected'
            callback and detect the selection state ourselves. This allows any implementation
            for selection (either an array, object keys, or even a Javascript Set object).
        */
        return this.state.selection.includes(key);
    };

    onAddNodeName = (event) => {
        this.setState({
            addNodeName: event.target.value
        })
    }

    onAddNodeIP = (event) => {
        this.setState({
            addNodeIP: event.target.value
        })
    }

    handleAddNode = () => {
        const _id = chance.guid();
        const { addNodeName, addNodeIP, data } = this.state;
        const newNode = {
            "_id": _id,
            "nodeName": addNodeName,
            "nodeIp": addNodeIP,
            "nodeStatus": "fake data",
            "bootNode": "fake data",
            "miningNode": "fake data",
            "nodeTinyGraph": "fake data",
        }

        this.addToggle();
        this.setState({
            data: [...data, newNode]
        });
    }

    render() {
        const { toggleSelection, toggleAll, isSelected, handleRemove, addToggle, onAddNodeName, onAddNodeIP, handleAddNode } = this;
        const { data, selectAll } = this.state;

        const checkboxProps = {
            selectAll,
            isSelected,
            toggleSelection,
            toggleAll,
            selectType: "checkbox",
            // 머저리가 넣어서 data 수가 적으면 안돌아감
            // getTrProps: (s, r) => {
            //     // someone asked for an example of a background color change
            //     // here it is...
            //     const selected = this.isSelected(r.original._id);
            //     console.log(r);
            //     return {
            //         style: {
            //             backgroundColor: selected ? "lightgreen" : "inherit"
            //             // color: selected ? 'white' : 'inherit',
            //         }
            //     };
            // }
        };

        return (
            <div>
                <ContentRow>
                    <ContentCol right>
                        <Button color="primary" onClick={addToggle}>+</Button>
                        <Button color="danger" onClick={handleRemove}>-</Button>
                    </ContentCol>
                </ContentRow>
                <CheckboxTable
                    ref={r => (this.checkboxTable = r)}
                    data={data}
                    columns={[
                        {
                            Header: "Name",
                            accessor: "nodeName",
                            style: {
                                textAlign:'center'
                            }
                        },
                        {
                            Header: "IP",
                            accessor: "nodeIp",
                            style: {
                                textAlign:'center'
                            }
                        },
                        {
                            Header: "Status",
                            accessor: "nodeStatus",
                            style: {
                                textAlign:'center'
                            }
                        },
                        {
                            Header: "Bootnode",
                            accessor: "bootNode",
                            style: {
                                textAlign:'center'
                            }
                        },
                        {
                            Header: "Mining",
                            accessor: "miningNode",
                            style: {
                                textAlign:'center'
                            }
                        },
                        {
                            Header: "Graph",
                            accessor: "nodeTinyGraph",
                            style: {
                                textAlign:'center'
                            }
                        }
                    ]}
                    // 테이블 가변적으로 보이게 수정하는 법 찾을것
                    defaultPageSize={7}
                    className="-striped -highlight"
                    showPagination = {false}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                console.log({
                                    state,
                                    rowInfo,
                                    column,
                                    instance,
                                    event: e
                                });
                                console.log(rowInfo.row._index);
                                console.log(this.state.selection)
                                this.toggle();
                            }
                        };
                    }}
                    {...checkboxProps}
                />

                <Modal isOpen={this.state.editModal} fade={false} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <NodeAddModal isOpen={this.state.addModal} 
                    toggle={this.addToggle} 
                    onAddNodeName={onAddNodeName}
                    onAddNodeIP={onAddNodeIP}
                    handleAddNode={handleAddNode}>
                </NodeAddModal>
            </div>
        );
    }
}

export default EthNodeList;