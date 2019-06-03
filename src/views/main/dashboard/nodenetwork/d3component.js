import * as d3 from "d3";
import React, { Component } from 'react';

const graph = {
    "nodes": [
        { "id": "A", "group": 1, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
        { "id": "B", "group": 2, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
        { "id": "C", "group": 3, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
        { "id": "D", "group": 4, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" },
        { "id": "E", "group": 5, "img": "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png" }
    ],
    "links": [
        { "source": "A", "target": "B", "value": 1 },
        { "source": "B", "target": "C", "value": 1 },
        { "source": "C", "target": "D", "value": 1 },
        { "source": "D", "target": "E", "value": 1 },
        { "source": "E", "target": "A", "value": 1 }
    ]
}

let simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force('charge', d3.forceManyBody()
        .strength(-4500)
        // .theta(0.2)
        // .distanceMax(150)
    )
    .force("center", d3.forceCenter(620 / 2, 450 / 2));

class D3componentControl extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.drawFrame()
    }

    drawFrame() {
        let link = this.svg.append("g")
            .style("stroke", "#aaa")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line");

        let node = this.svg.append("g")
            .attr("class", "nodes")
            .selectAll("g.node")
            .data(graph.nodes)
            .enter().append("rect")
            // .attr("r", 8)
            .attr("width", 50)
            .attr("height", 50)
            .call(d3.drag()
                .on("start", this.dragstarted)
                .on("drag", this.dragged)
                .on("end", this.dragended));

        let label = this.svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(graph.nodes)
            .enter().append("text")
            .attr("class", "label")
            .attr("class", "fa")
            .attr('font-size', function (d) { return '20px' })
            .text(function (d) { return '\uf2b9' });
        // .text(function (d) { return d.id; });

        // let images = this.svg.append("g")
        //     .data([{url:"https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2009/02/amazon.gif", x:20, y:40}])
        //     .enter()
        //     .append("image");

        let images = this.svg.append("g")
            .attr("class", "images")
            .selectAll("g.images")
            .data(graph.nodes)
            .enter().append("image")
            .attr("xlink:href", function (d) { return d.img; })




        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(graph.links);

        function ticked() {
            link
                .attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node
                // .attr("r", 40) //동그라미 크기
                .style("fill", "#efefef")
                .style("stroke", "#424242")
                .style("stroke-width", "2px")
                .attr("x", function (d) { return d.x - 15; })
                .attr("y", function (d) { return d.y - 15; });

            label
                .attr("x", function (d) { return d.x; })
                .attr("y", function (d) { return d.y; })
                .style("font-size", "10px").style("fill", "#333");

            images
                .attr("x", function (d) { return d.x - 15; })
                .attr("y", function (d) { return d.y - 15; })
                .attr("height", 50)
                .attr("width", 50);

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
            <svg width="620" height="450"  //켄버스 크기
                ref={handle => (this.svg = d3.select(handle))}>
            </svg>
        )
    }
}

class D3component extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <D3componentControl />
                </div>
            </div>
        )
    }
}

export default D3component;

