import React, { useRef, useEffect, useReducer, useState } from "react";
import * as d3 from "d3";

const GraphMetricsD3 = ({ results }) => {
  const ref = useRef()

  const stockSymbol = results.meta.symbol

  const metrics = results.indicators
  const dateKey = metrics[0]["Datetime"] ? "Datetime" : "Date"

  const stockData = metrics.map((metric) => {
    return {
      date: new Date(metric[dateKey]),
      close: parseFloat(metric["Close"]),
      open: parseFloat(metric["Open"]),
      high: parseFloat(metric["High"]),
      low: parseFloat(metric["Low"]),
      volume: parseFloat(metric["Volume"]),
    }
  }).slice(1000, 1100)

  const dates = stockData.map(data => data["date"])
  const closingPrices = stockData.map(data => data["close"])

  const xDomain = d3.extent(dates)
  const yDomain = d3.extent(closingPrices)

  useEffect(() => {
    // set up svg
    const w = 1100
    const h = 400
    const svg = d3.select(ref.current)
      //responsive SVG needs these 2 attributes and no width and height attr
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", "0 0 1100 400")
      //class to make it responsive
      .classed("svg-content-responsive", true);

    // define scaling
    const xScale = d3.scaleTime()
      .domain(xDomain)
      .range([0, w]);
    const yScale = d3.scaleLinear()
      .domain(yDomain)
      .range([h, 0])      // starts in top left to bottom left

    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal)

    // set axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(20)
      // .tickFormat(dates)
    const yAxis = d3.axisLeft(yScale)
      .ticks(20)
      // .tickFormat(closingPrices)

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`)
      .selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('transform', "rotate(-75)")
    svg.append('g')
      .call(yAxis)

    // set data
    svg.selectAll('.line')
      .data([stockData.map(data => data["close"])])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'white')

  }, [])




  const createGraph = () => {
    const outputSvg = <svg ref={ref} className="d3Svg" />

    return outputSvg

  }



  return (
    <div className="d3Container">
      <h1>{stockSymbol}</h1>
      {createGraph()}
    </div>
  )
}

export default GraphMetricsD3;