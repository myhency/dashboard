import * as d3 from "d3";
import React, { Component } from 'react';
import _ from "lodash";
// import { func } from "prop-types";



// "links": [
//     { "source": "A", "target": "B", "value": 1 },
//     { "source": "B", "target": "C", "value": 1 },
//     { "source": "C", "target": "D", "value": 1 },
//     { "source": "D", "target": "E", "value": 1 },
//     { "source": "E", "target": "A", "value": 1 }
// ]



class D3component extends Component {

    constructor(props) {
        // console.log("constructor");
        // console.log(props.node)
        super(props)

        this.state = {
            node: [],
            angle: 0,      // 그림 회전 각도
            numOfNodes: 0,
            simulation: {},
            xcenter: 0,
            ycenter: 0,
            nodeImgSize: 0,
            cardPosition: undefined
        }
    }

    componentDidMount() {
        // console.log('componentDidMount');
        setInterval(() => {
            this.updateTime();          // 그림을 몇초마다 리프레쉬할지 정함
        }, 10);

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log('getDerivedStateFromProps');

        // console.log(nextProps);
        // console.log(state.node);
        let { node, cardPosition } = prevState;

        // let { node } = state;
        // console.log();

        if (!_.isEqual(nextProps.node, node)
            || (!_.isEqual(nextProps.cardPosition, cardPosition)
                && cardPosition != undefined)) {
            // console.log(nextProps.node);
            // console.log(node);
            console.log(nextProps.cardPosition.width * nextProps.cardPosition.height * 0.0003)
            return {
                node: nextProps.node,
                numOfNodes: nextProps.node.length,
                simulation: d3.forceSimulation()
                    .force("link", d3.forceLink().id(function (d) { return d.id; }))
                    .force('charge', d3.forceManyBody()
                        .strength(nextProps.node.length * (-5000))
                        .theta(0.1)
                        // .distanceMax(150)
                    )
                    .force("center", d3.forceCenter()
                        .x(nextProps.cardPosition.width / 2)
                        .y(nextProps.cardPosition.height / 2)), // center of the picture
                xcenter: nextProps.cardPosition.width / 2,      // rotational center of the picture
                ycenter: nextProps.cardPosition.height / 2,
                nodeImgSize: nextProps.cardPosition.width * nextProps.cardPosition.height * 0.0003,
                cardPosition: nextProps.cardPosition
            }
        }
        else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');
        if ((!_.isEqual(prevState.node, this.state.node) && this.state.node.length > 0)
            || (!_.isEqual(prevState.cardPosition, this.state.cardPosition) && this.state.cardPosition != undefined)) {
            this.drawFrame();
        }
    }

    updateTime() {
        // console.log("updateTime");
        this.setState({
            angle: this.state.angle + 0.07     //그림을 얼마만큼 회전시킬지 정함
        });
        if (this.state.angle > 360) {    //그림이 한 바퀴 다 돌면 다시 0도 부터 시작함
            this.setState({
                angle: 0
            });
        }
        this.moveNodes('g', this.state.angle)
        this.moveNodes('g.images', this.state.angle)
        this.moveNodes('g.labels', this.state.angle)
    }

    moveNodes(type, pAngle) {
        // console.log("moveNodes");
        let xcenter = this.state.xcenter;
        let ycenter = this.state.ycenter;
        const transform = `rotate(${pAngle},${xcenter},${ycenter})`
        this.svg.select(type)
            .attr('transform', () => transform)
    }

    drawFrame() {
        // console.log('drawFram');
        // console.log(this.state.nodeImgSize);

        let links = [];
        // { "source": "A", "target": "B", "value": 1 },
        for (var i = 0; i < this.state.node.length; i++) {          // 노드 개수별로 선긋기
            for (var j = i + 1; j < this.state.node.length; j++) {
                links.push({ source: this.state.node[i].id, target: this.state.node[j].id, value: 1 });
            }
        }

        let nodes = _.map(this.state.node, (node) => {
            return { id: node.id, group: 1, img: "/img/blockchain_green.svg" };
        });

        // console.log(this.state.node);

        // console.log(this.svg._groups);
        // console.log('aaaaa');
        // console.log(this.svg._groups[0][0].children);

        // console.log(this.svg.selectAll('.images'));
        // this.svg.children().remove();
        // this.svg.remove();
        this.svg.selectAll('*').remove();
        // this.svg.selectAll('.g').remove();



        let link = this.svg.append("g")
            .attr("class", "stroke")
            .style("stroke", "#fff")
            .attr("stroke-width", 1)
            .selectAll("line")
            .data(links)
            .enter().append("line");







        let node = this.svg.append("g")
            .attr("class", "images")
            .selectAll("g.images")
            .data(nodes)
            .enter().append("image")
            .attr("xlink:href", function (d) { return d.img; })
            .attr("width", this.state.nodeImgSize)
            .attr("height", this.state.nodeImgSize);
        // .call(d3.drag()
        //     .on("start", this.dragstarted)
        //     .on("drag", thicenters.dragged)
        //     .on("end", this.dragended))

        let label = this.svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("class", "fa")
            .attr('font-size', function (d) { return '20px' })
            .text(function (d) { return d.id });

        this.state.simulation
            .nodes(nodes)
            .on("tick", ticked)

        this.state.simulation
            .force("link")
            .links(links);

        let nodeG = this.state.nodeImgSize * 0.5; //node image 무게중심 구하기
        let labelGX = this.state.nodeImgSize * 0.05; //node image 무게중심 구하기
        let labelGY = this.state.nodeImgSize * 0.13; //node image 무게중심 구하기


        function ticked() {
            //console.log("ticked");
            
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                .attr("x", function (d) { return d.x - nodeG; })
                .attr("y", function (d) { return d.y - nodeG; });

            label
                .attr("x", function (d) { return d.x - labelGX; })
                .attr("y", function (d) { return d.y - labelGY; })
                .style("font-size", "16px").style("fill", "#000");
        }
    }

    // dragstarted = (d) => {
    //     //console.log("dragstarted")
    //     if (!d3.event.active) this.simulation.alphaTarget(0.8).restart()
    // }

    // dragged = (d) => {
    // }

    // dragended = (d) => {
    //     if (!d3.event.active) this.simulation.alphaTarget(0);
    // }



    render() {
        // console.log("render");
        // console.log(this.state.node);
        // console.log(this.state);
        return (
            <svg width="100%" height="450"//width="620" height="450"  //켄버스 크기
                ref={handle => (this.svg = d3.select(handle))}>
            </svg>
        )
    }
}


export default D3component;

