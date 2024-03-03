import './App.css';
import * as d3 from "d3"
import React, { useEffect, useRef, useState } from 'react';

const data = [
  {id: "Trump", value: 6200},
  {id: "Joe Biden", value: 3812},
  {id: "Election 2024", value: 15714},
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
            width = 720,
            height = 720;

      // Clear SVG to prevent duplication
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      const root = d3.hierarchy({children: data}).sum(d => d.value);
      d3.pack().size([width, height]).padding(3)(root);

      let nodes = root.leaves().map(d => ({
        ...d,
        x: Math.random() * width,
        y: Math.random() * height
      }));

      const simulation = d3.forceSimulation(nodes)
        .force("center", d3.forceCenter(width / 2, height / 2).strength(0.05)) // Slight attraction towards the center
        .force("charge", d3.forceManyBody().strength(5)) // Repulsion among nodes
        .force("collide", d3.forceCollide().radius(d => d.r + 4)) // Collision detection with slight padding
        .on("tick", ticked);

      function ticked() {
        svg.selectAll('circle')
          .data(nodes)
          .join('circle')
          .attr('r', d => d.r)
          .style('fill', "#F64C72")
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);

        svg.selectAll('text')
          .data(nodes)
          .join('text')
          .attr("dy", ".3em")
          .style("text-anchor", "middle")
          .attr("font-size", d => `${d.r / 4.5}px`)
          .attr("font-family", "Poppins")
          .attr("font-weight", 700)
          .attr("fill", "white")
          .attr('x', d => d.x)
          .attr('y', d => d.y)
          .text(d => d.data.id)
          .call(text => text.append("tspan") // Append a second tspan element for the value
            .attr("x", d => d.x) // Align horizontally with the first text
            .attr("dy", "1.7em") // Position below the first text
            .attr("font-size", d => `${d.r / 8}px`) // Use a smaller font size
            .text(d => d.value)); // Display the node's value
      }

      // Continuously apply a slight force towards the center
      simulation.on("tick", () => {
        nodes.forEach(node => {
          // Apply modifications to simulate "doubling" the tick effect
          const friction = 0.8; // Adjust for desired "speed" and "friction"
          const centerForce = 0.0035; // Adjust for stronger pull towards the center

          node.vx *= friction;
          node.vy *= friction;
          node.x += (width / 2 - node.x) * centerForce;
          node.y += (height / 2 - node.y) * centerForce;

          node.vx *= friction;
          node.vy *= friction;
          node.x += (width / 2 - node.x) * centerForce;
          node.y += (height / 2 - node.y) * centerForce;

          node.vx *= friction;
          node.vy *= friction;
          node.x += (width / 2 - node.x) * centerForce;
          node.y += (height / 2 - node.y) * centerForce;

          node.vx *= friction;
          node.vy *= friction;
          node.x += (width / 2 - node.x) * centerForce;
          node.y += (height / 2 - node.y) * centerForce;
        });

        ticked(); // Update positions
      });
    }
  }, []);

  return <svg ref={d3Container} id="init-bubble-chart"/>;
}

function SignIn() {

  return(
    <button id="sign-in">Log In</button>
  )
}

function MainText() {

  const [count, setCount] = useState(82192291);

  useEffect(() => {

    setInterval(() => {
    setCount(prev => prev + Math.floor(Math.random() * 17))

    }, 500)
  }, [])

  return (
    <>
      <h1 className="Header" id="number-sites" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1500">
      {count.toLocaleString()} 
      </h1>
      <h1 className="Header" id="sites-crawled">sites crawled</h1>
    </>
  )

}

function App() {

  return (
    <div className="App">
      <div id="header-container">
        <h1 className="Header">itmatter.com</h1>
        <h2 className="Header" id="dashboard">Dashboard</h2>
        <h2 className="Header" id="register">Register</h2>
        <SignIn />
      </div>
      <Bubble/>
      <MainText />
      <div id="background-split">
      </div>
    </div>
  );
}

export default App;
