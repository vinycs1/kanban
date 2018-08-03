import React, { Component } from 'react'
import convertSeconds from '../../utils/convertSeconds'

class Timer extends Component {

  render() {
    return (
      <div>
        {this.renderTotalTime()}
      </div>
    )
  }

  renderTotalTime() {

    const { seconds, minute, hour } = convertSeconds(this.props.time)

    return (
      <div className={"component-timer"}>
        <i className={"fa fa-clock-o"}></i>
        <span>{hour}:{minute}:{seconds}</span>
      </div>
    )
  }
}

export default Timer