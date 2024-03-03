import './App.css';
import * as d3 from "d3"
import React, { useEffect, useRef } from 'react';

const data = [
  {id: "Trump", value: 6200},
  {id: "Joe Biden", value: 3812},
  {id: "Election 2024", value: 6714},
  {id: "Current Polling", value: 700},
  {id: "Texas Campaign", value: 2419},
  {id: "$SPY ATH", value: 7310},
  {id: "Taylor Swift Eras Tour", value: 4714},
  {id: "Roe v Wade", value: 700},
  {id: "Film Releases 2024", value: 1419},
  {id: "Inflation", value: 3310},
  {id: "Justin Trudeau", value: 2714}
];

function Bubble() {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
      const margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 580,
            height = 580;

      // Clear SVG to prevent duplication
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
      
      // Generate the bubble chart here
      const root = d3.hierarchy({children: data}).sum(d => d.value);

      d3.pack()
        .size([width, height])
        .padding(3)(root);

      const node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);

      node.append("circle")
        .attr("r", d => d.r)
        .style("fill", "#F64C72");

      node.append("text")
        .text(d => d.data.id.substring(d.data.id.lastIndexOf(".") + 1))
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .attr("font-size", d => `${d.r / 6}px`)
        .attr("font-family", "Poppins")
        .attr("font-weight", 700)
        .attr("fill", "white");
    }
  }, []);

  return <svg ref={d3Container} id="init-bubble-chart"/>;
}

function Upload() {

  return(
    <button id="upload">Upload</button>
  )
}

function App() {

  return (
    <div className="App">
      <div id="header-container">
        <h1 className="Header">dataset.csv</h1>
        <h2 className="Header" id="dashboard">Dashboard</h2>
        <Upload />
      </div>
      <Bubble/>
      <div id="background-split">
      </div>
    </div>
  );
}

export default App;
