import React from 'react'
import CanvasJSReact from '@canvasjs/react-stockcharts';


const GraphMetricsCanvas = ({ results }) => {
  const CanvasJS = CanvasJSReact.CanvasJS
  const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart

  const stockSymbol = results.meta.symbol

  const metrics = results.indicators
  const dateKey = metrics[0]["Datetime"] ? "Datetime" : "Date"


  const pairs = metrics.map((metric) => { return { x: new Date(metric[dateKey]), y: parseFloat(metric['Close']) } })

  const options = {
    theme: "dark1",
    animationEnabled: true,
    title: {
      text: stockSymbol.toUpperCase() + ' Closing Prices',
      color: '#49F627E5'
    },
    charts: [{
      axisX: {
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "YYYY MM DD"
        }
      },
      axisY: {
        title: 'USD ($)',
        prefix: "$",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          valueFormatString: "$#,###.##"
        }
      },
      toolTip: {
        shared: true
      },
      data: [{
        name: "Price (USD)",
        type: "line",
        color: "#49F627E5",
        yValueFormatString: "$#,###.##",
        xValueFormatString: "YYYY MM DD",
        dataPoints: pairs
      }]
    }],
    navigator: {
      slider: {
        minimum: new Date(pairs[0].x),
        maximum: new Date(pairs[pairs.length - 1].x)
      }
    }
  }

  const containerProps = {
    width: "100%",
    height: "70%",
    margin: "auto"
  }



  return (
    <div className='CanvasChart'>
      <div>
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      </div>
    </div>
  )

}

export default GraphMetricsCanvas