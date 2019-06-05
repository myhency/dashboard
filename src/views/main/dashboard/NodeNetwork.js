import React, { Component } from 'react'
import io from 'socket.io-client';

let socket;

class NodeNetwork extends Component {
    constructor(props) {
        super(props);

        this.state={
            node: [],
            transactions: [],
            show: false
        }

        socket = io.connect(process.env.REACT_APP_BAAS_SOCKET, {
            query: {token: sessionStorage.getItem("token")}
        });
    }

    componentDidMount() {
        socket.on('connect', function() {
            socket.emit("requestNodeList")
        })
    }

    componentWillUnmount() {
        socket.disconnect();
    }
}


export default NodeNetwork;
