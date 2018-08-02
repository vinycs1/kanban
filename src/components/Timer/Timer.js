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
      <span>
        hour: {hour}
        minute:{minute}
        seconds:{seconds}
      </span>
    )
  }
}

export default Timer