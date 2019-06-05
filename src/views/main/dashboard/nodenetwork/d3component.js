import * as d3 from "d3";
import React, { Component } from 'react';



let simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force('charge', d3.forceManyBody()
        .strength(-500)
        .theta(0.2)
        .distanceMax(150)
    )
    .force("center", d3.forceCenter(620 / 2, 450 / 2))
// .tick();

let angle = 0;

class D3componentControl extends Component {
    
    constructor(props) {
        super(props)


    }

    componentDidMount() {
        this.drawFrame();
        this.updateTime();

    }

    componentDidUpdate() {
        this.updateTime()
    }

    updateTime() {
        const dt = new Date(this.props.time)
        console.log(dt);
        // const hourAngle = dt.getHours() * 30 + 
        //     Math.floor(dt.getMinutes() / 12) * 6  
        // this.moveHand('H', hourAngle)
        // this.moveHand('M', dt.getMinutes() * 6, 3)
        angle = angle + 0.1;
        if(angle > 360) {
            angle = 0;
        }
        this.moveNodes('g', angle)
        this.moveNodes('g.nodes', angle)
        this.moveNodes('g.labels', angle)
    }

    moveNodes(type, pAngle) {
        const center = 600 / 2
        const transform = `rotate(${pAngle},${center},${center})`
        this.svg.select(type)
            .attr('transform', () => transform)
    }

    // componentWillReceiveProps(propsnext) {
    //     console.log(propsnext);
    // }

    // componentWillUpdate() {
    //     this.drawFrame();
    // }
    // componentDidUpdate() {
    //     this.updateTime()
    // }

    // updateTime() {
    //     const dt = new Date(this.props.time)
    //     const hourAngle = dt.getHours() * 30 +
    //         Math.floor(dt.getMinutes() / 12) * 6
    //     this.moveHand('H', hourAngle)
    //     this.moveHand('M', dt.getMinutes() * 6, 3)
    //     this.moveHand('S', dt.getSeconds() * 6)
    // }

    drawFrame() {
        let link = this.svg.append("g")
            .style("stroke", "#aaa")
            .selectAll("line")
            .data(this.props.graph.links)
            .enter().append("line");

        // let node = this.svg.append("g")
        //     .attr("class", "nodes")
        //     .selectAll("g.node")
        //     .data(graph.nodes)
        //     .enter().append("rect")
        //     // .attr("r", 8)
        //     .attr("width", 50)
        //     .attr("height", 50)
        //     .call(d3.drag()
        //         .on("start", this.dragstarted)
        //         .on("drag", this.dragged)
        //         .on("end", this.dragended));

        let node = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(this.props.graph.nodes)
            .enter().append("circle")
            .attr("r", 2)
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended))
        // .call(d3.);

        let label = this.svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(this.props.graph.nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("class", "fa")
            .attr('font-size', function (d) { return '20px' })
            .text(function (d) { return d.id });
        // .text(function (d) { return d.id; });

        // let images = this.svg.append("g")
        //     .data([{url:"https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2009/02/amazon.gif", x:20, y:40}])
        //     .enter()
        //     .append("image");

        // let images = this.svg.append("g")
        //     .attr("class", "images")
        //     .selectAll("g.images")
        //     .data(graph.nodes)
        //     .enter().append("image")
        //     .attr("xlink:href", function (d) { return d.img; })




        simulation
            .nodes(this.props.graph.nodes)
            .on("tick", ticked)
        // .on("tick", ()=>simulation.alphaTarget(0.8).restart());

        simulation.force("link")
            .links(this.props.graph.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            // node
            //     // .attr("r", 40) //동그라미 크기
            //     .style("fill", "#efefef")
            //     .style("stroke", "#424242")
            //     .style("stroke-width", "2px")
            //     .attr("x", function (d) { return d.x - 15; })
            //     .attr("y", function (d) { return d.y - 15; });

            node
                .attr("r", 16)
                .style("fill", "#efefef")
                .style("stroke", "#424242")
                .style("stroke-width", "1px")
                .attr("cx", function (d) { return d.x + 5; })
                .attr("cy", function (d) { return d.y - 3; });

            label
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .style("font-size", "10px").style("fill", "#333");

            // images
            //     .attr("x", function (d) { return d.x - 15; })
            //     .attr("y", function (d) { return d.y - 15; })
            //     .attr("height", 50)
            //     .attr("width", 50);

            // images
            //     .attr("xlink:href", function(d){return d.url})
            //     .attr("x", function(d){return d.x})
            //     .attr("y", function(d){return d.y})
            //     .attr("width", 16)
            //     .attr("height", 16);
        }
    }

    dragstarted = (d) => {
        // if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        // d.fx = d.x
        // d.fy = d.y
        if (!d3.event.active) simulation.alphaTarget(0.8).restart()
        // simulation.fix(d);
        // simulation.find(d);
    }

    dragged = (d) => {
        // d.fx = d3.event.x
        // d.fy = d3.event.y
        // simulation.find(d, d3.event.x, d3.event.y);
    }

    dragended = (d) => {
        // d.fx = d3.event.x
        // d.fy = d3.event.y
        // if (!d3.event.active) simulation.alphaTarget(0);
        if (!d3.event.active) simulation.alphaTarget(0);
        // simulation.(d);
    }



    render() {

        return (
            <svg width="100%" height="100%"//width="620" height="450"  //켄버스 크기
                ref={handle => (this.svg = d3.select(handle))}>
            </svg>
        )
    }
}

class D3component extends React.Component {
    constructor(props) {
        super(props)
        this.tzOffset = (new Date()).getTimezoneOffset()
        this.state = {
            graph: {
                "nodes": [
                    { "id": "A", "group": 1, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "B", "group": 2, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "C", "group": 3, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "D", "group": 4, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "E", "group": 5, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "F", "group": 1, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "g", "group": 2, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "h", "group": 3, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "i", "group": 4, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "j", "group": 5, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "k", "group": 1, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "l", "group": 2, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "m", "group": 3, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "n", "group": 4, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
                    { "id": "o", "group": 5, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" }
                ],
                "links": [
                    { "source": "A", "target": "B", "value": 1 },
                    { "source": "B", "target": "C", "value": 1 },
                    { "source": "C", "target": "D", "value": 1 },
                    { "source": "D", "target": "E", "value": 1 },
                    { "source": "E", "target": "F", "value": 1 },
                    { "source": "F", "target": "g", "value": 1 },
                    { "source": "g", "target": "h", "value": 1 },
                    { "source": "h", "target": "i", "value": 1 },
                    { "source": "i", "target": "j", "value": 1 },
                    { "source": "j", "target": "k", "value": 1 },
                    { "source": "k", "target": "l", "value": 1 },
                    { "source": "l", "target": "m", "value": 1 },
                    { "source": "m", "target": "n", "value": 1 },
                    { "source": "n", "target": "o", "value": 1 },
                    { "source": "o", "target": "A", "value": 1 },
                    { "source": "A", "target": "C", "value": 1 },
                    { "source": "B", "target": "D", "value": 1 },
                    { "source": "C", "target": "E", "value": 1 },
                    { "source": "D", "target": "F", "value": 1 },
                    { "source": "E", "target": "g", "value": 1 },
                    { "source": "g", "target": "h", "value": 1 },
                    { "source": "h", "target": "i", "value": 1 },
                    { "source": "i", "target": "j", "value": 1 },
                    { "source": "j", "target": "k", "value": 1 },
                    { "source": "k", "target": "l", "value": 1 },
                    { "source": "l", "target": "m", "value": 1 },
                    { "source": "m", "target": "n", "value": 1 },
                    { "source": "n", "target": "o", "value": 1 },
                    { "source": "o", "target": "A", "value": 1 },
                    { "source": "F", "target": "B", "value": 1 },
                ]
            },
            time: this.getUTC()
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({ time: this.getUTC() })
        }, 100)
    }

    getUTC() {
        return Date.now() + this.tzOffset * 60 * 1000
    }



    render() {
        const localTime = tzDelta => this.state.time + tzDelta * 60 * 1000
        return (
            <D3componentControl graph={this.state.graph} time={localTime(60)} />
        )
    }
}

export default D3component;

