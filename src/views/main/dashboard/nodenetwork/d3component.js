import * as d3 from "d3";
import React, { Component } from 'react';
import _ from "lodash";



// "links": [
//     { "source": "A", "target": "B", "value": 1 },
//     { "source": "B", "target": "C", "value": 1 },
//     { "source": "C", "target": "D", "value": 1 },
//     { "source": "D", "target": "E", "value": 1 },
//     { "source": "E", "target": "A", "value": 1 }
// ]



class D3component extends Component {

    constructor(props) {
        console.log("constructor")
        super(props)

        this.state = {
            node: props.node,
            angle : 0       // Node 회전 각도
        }

        this.simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function (d) { return d.id; }))
            .force('charge', d3.forceManyBody()
                .strength(-2000)
                .theta(0.2)
                .distanceMax(150)
            )
            .force("center", d3.forceCenter(620 / 2, 450 / 2));
    }

    componentDidMount() {
        console.log('componentDidMount');
        setInterval(() => {
            this.updateTime();
        }, 1000);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log('getDerivedStateFromProps');

        let { node } = prevState;

        if (!_.isEqual(nextProps.node, node)) {
            console.log(nextProps.node)
            return {
                node: nextProps.node
            }
        }
        else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUP');

        if (!_.isEqual(prevState.node, this.state.node) && this.state.node.length > 0) {
            this.drawFrame();
        }
    }

    updateTime() {
        console.log("updateTime");
        this.setState({
            angle:this.state.angle + 5
        });
        if (this.state.angle > 360) {
            this.setState({
                angle: 0
            });
        }
        this.moveNodes('g', this.state.angle)
        this.moveNodes('g.images', this.state.angle)
        this.moveNodes('g.labels', this.state.angle)
    }

    moveNodes(type, pAngle) {
        console.log("moveNodes");
        const center = 600 / 2
        const transform = `rotate(${pAngle},${center},${center})`
        this.svg.select(type)
            .attr('transform', () => transform)
    }

    drawFrame() {
        console.log('drawFram');

        let links = [];
        // { "source": "A", "target": "B", "value": 1 },
        for(var i=0; i<this.state.node.length; i++) {
            for(var j=i+1; j<this.state.node.length; j++) {
                links.push({source:this.state.node[i].id, target:this.state.node[j].id, value:1});
            }
        }

        let nodes = _.map(this.state.node, (node) => {
            return { id: node.id, group: 1, img: "/img/node_normal.png" };
        });

        let link = this.svg.append("g")
            .attr("class", "stroke")
            .style("stroke", "#fff")
            .selectAll("line")
            .data(links)
            .enter().append("line");

        let node = this.svg.append("g")
            .attr("class", "images")
            .selectAll("g.images")
            .data(nodes)
            .enter().append("image")
            .attr("xlink:href", function (d) { return d.img; })
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended))

        let label = this.svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("class", "fa")
            .attr('font-size', function (d) { return '20px' })
            .text(function (d) { return d.id });

        this.simulation
            .nodes(nodes)
            .on("tick", ticked)

        this.simulation
            .force("link")
            .links(links);

        function ticked() {
            console.log("ticked");
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("x", function (d) { return d.x - 20; })
                .attr("y", function (d) { return d.y - 20; });

            label
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .style("font-size", "10px").style("fill", "#333");
        }
    }

    dragstarted = (d) => {
        console.log("dragstarted")
        if (!d3.event.active) this.simulation.alphaTarget(0.8).restart()
    }

    dragged = (d) => {
    }

    dragended = (d) => {
        if (!d3.event.active) this.simulation.alphaTarget(0);
    }



    render() {
        console.log("render")

        return (
            <svg width="100%" height="450"//width="620" height="450"  //켄버스 크기
                ref={handle => (this.svg = d3.select(handle))}>
            </svg>
        )
    }
}


export default D3component;

