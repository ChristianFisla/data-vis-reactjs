import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MultiSeriesLineChart = ({ data, width = 600, height = 400 }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 80, bottom: 30, left: 50 },
        chartWidth = width - margin.left - margin.right,
        chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

    // Clear SVG to prevent duplication on re-render
    svg.selectAll("*").remove();

    // Scales
    const xScale = d3.scaleTime()
                     .range([0, chartWidth])
                     .domain(d3.extent(data[0].values, d => d.date))

    const yScale = d3.scaleLinear()
                     .range([chartHeight, 0])
                     .domain([
                       d3.min(data, series => d3.min(series.values, d => d.value)),
                       d3.max(data, series => d3.max(series.values, d => d.value))
                     ]);

    // Color scale
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Axes
    const xAxisGroup = svg.append("g")
    .attr("transform", `translate(0,${chartHeight})`)
    .call(d3.axisBottom(xScale));

    xAxisGroup.selectAll("text")
        .style("font-family", "Poppins, sans-serif")
        .style("font-weight", "700")
        .style("font-size", "15px")
        .style("fill", "white");

    xAxisGroup.selectAll(".tick line").remove();
    xAxisGroup.select(".domain").remove();
    
    const yAxisGroup = svg.append("g")
        .call(d3.axisLeft(yScale));

    yAxisGroup.selectAll("text")
        .style("font-family", "Poppins, sans-serif")
        .style("font-weight", "700")
        .style("font-size", "18px")
        .style("fill", "white");

    yAxisGroup.selectAll(".tick line").remove();
    yAxisGroup.select(".domain").remove();

    // Line generator
    const line = d3.line()
                   .x(d => xScale(d.date))
                   .y(d => yScale(d.value));

    // Lines
    data.forEach((series, i) => {
      svg.append("path")
         .datum(series.values)
         .attr("fill", "none")
         .attr("stroke", "#F64C72")
         .attr("stroke-width", 5)
         .attr("d", line);
    });

  }, [data, height, width]);

  return (
    <svg ref={svgRef} id="multiline"></svg>
  )
};

export default MultiSeriesLineChart;
