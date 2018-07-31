import React, { Component } from 'react'

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
    this.renderTotalSpendedTime()
    return (
      <div>
        {this.renderTotalSpendedTime()}
        <div onClick={() => this.props.onClickStart(Date.now())}>Timer Start </div>
        <div onClick={() => this.props.onClickStop(Date.now())}>Timer Stop</div>
      </div>
    )
  }


  renderTotalSpendedTime() {
    const { seconds, minute, hour } = this.convertMS(this.props.time.totalSpended)


    return <div>
      hour: {hour}
      minute:{minute}
      seconds:{seconds}
    </div>
  }

  convertMS(milliseconds) {
    let day, hour, minute, seconds

    seconds = Math.floor(milliseconds / 1000)
    minute = Math.floor(seconds / 60)
    seconds = seconds % 60
    hour = Math.floor(minute / 60)
    minute = minute % 60
    day = Math.floor(hour / 24)
    hour = hour % 24

    return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds
    }
  }



}

export default Timer