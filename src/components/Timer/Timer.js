import React, { Component } from 'react'
import convertMilliseconds from '../../utils/convertMilliSeconds'

class Timer extends Component {
  constructor() {
    super()

    this.state = {
      time: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        {this.renderTotalSpendedTime()}
        {this.renderTimerIcon()}
      </div>
    )
  }

  renderTimerIcon() {
    return this.props.time.isRunning ?
      <span onClick={() => this.onClickStop()}><i className="fa fa-stop" /></span> :
      <span onClick={() => this.onClickStart()}><i className="fa fa-play"/></span>
  }

  renderTotalSpendedTime() {
    const { seconds, minute, hour } = convertMilliseconds(this.props.time.totalSpended)
    return <span>
      hour: {hour}
      minute:{minute}
      seconds:{seconds}
    </span>
  }

  onClickStart() {
    if (!this.props.time.isRunning)
      return this.props.onClickStart(Date.now())
  }

  onClickStop() {
    if (this.props.time.isRunning)
      return this.props.onClickStop(Date.now())
  }

}

export default Timer