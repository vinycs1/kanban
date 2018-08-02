import React, { Component } from 'react'
import convertMilliseconds from '../../utils/convertMilliSeconds'

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    this.setState({
      time: nextProps.time
    })
  }

  render() {
    console.log("render")
    return (
      <div>
        {this.renderTotalTime()}
      </div>
    )
  }

  renderTotalTime() {
    console.log(this.state.time)
    const { seconds, minute, hour } = convertMilliseconds(this.state.time)

    return (
      <span>
        hour: {hour}
        minute:{minute}
        seconds:{seconds}
      </span>
    )
  }
}

export default Timer