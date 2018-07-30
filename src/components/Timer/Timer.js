import React, { Component } from 'react'

class Timer extends Component {
  constructor() {
    super()
    this.state = {
      "totalTimerSpend": 0,
      "currentTimer": 0,
      "secondsOfPomodoro": 1500,
      "start": 0,
      "display": "00:00:00"
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div>{this.state.display}</div>
        <div onClick={() => this.onClickStart()}>Timer Start </div>
        <div onClick={() => this.onClickStop()}>Timer Stop</div>

      </div>
    )
  }

  onClickStart() {
    console.log("start")
    this.setState({
      start: Date.now()
    })
  }

  onClickStop() {
    this.updateTimer();
  }

  updateTimer() {
    this.currentTimeSpended()
  }

  currentTimeSpended() {
    const { start, totalTimerSpend } = this.state

    const stop = Date.now()

    const currentSpended = stop - start
    this.setState({
      "display": this.millisToMinutesAndSeconds(currentSpended),
      "totalTimerSpend": totalTimerSpend + currentSpended
    })

  }

  millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return ` ${minutes}: ${(seconds < 10 ? '0' : '')}`
  }


}

export default Timer