import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

const initialData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    { label: 'Foo', data: [300, 50, 100], backgroundColor: '#ddd' },
    { label: 'Bar', data: [300, 50, 100], backgroundColor: '#999' },
  ],
}

const chartOptions = {
  animation: { duration: 300 },
  legend: { display: false },
  responsive: true,
  tooltips: { enabled: false },
}

class Chart extends Component {
  state = { data: initialData }

  handleClick = () => {
    const newData = {
      labels: ['A', 'B', 'C', 'D'],
      datasets: [
        { label: 'Foo', data: [400, 300, 200, 50], backgroundColor: '#ddd' },
      ],
    }

    this.setState({ data: newData })
  }

  render() {
    const { data } = this.state

    return (
      <div className="py3 relative" style={{ width: 300 }}>
        <Bar data={data} height={80} options={chartOptions} />
        <button type="button" onClick={this.handleClick}>
          Update
        </button>
      </div>
    )
  }
}

export default Chart
