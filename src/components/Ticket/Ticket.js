import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { Card, CardBody, CardHeader } from 'reactstrap'
import TicketTag from '../TicketTag/'
import Timer from '../Timer/'
import './ticket.css'
import { generateTagId } from '../../utils/generateId'

const ticketSource = {
  beginDrag(props) {
    return props.ticket
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop())
      return;
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Ticket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ticket: props.ticket,
      currentTime: 0
    }

    this.onClickPlay = this.onClickPlay.bind(this)
    this.onClickStop = this.onClickStop.bind(this)
    this.removeTicketTag = this.removeTicketTag.bind(this)

  }

  tick() {
    this.setState(prevState => {
      let { ticket } = prevState
      ticket.time.total += 1

      return { ticket }
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.ticket.time.isRunning) {
        this.tick()
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.state.ticket.time.isRunning)
      clearInterval(this.interval)
  }

  render() {
    const { isDragging, connectDragSource } = this.props
    const { ticket } = this.state
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <div style={{ opacity }} className={"component-ticket"}>
        <Card>
          <CardHeader>
            <span className="ticket-name">
              {ticket.name}
            </span>
            {this.renderTimerIcon()}
          </CardHeader>
          <CardBody>
            {ticket.description}
            <Timer
              time={ticket.time.total}
            />
            <div onClick={() => this.addTicketTag()}>ADDTAG</div>
            {this.renderTags()}
          </CardBody>
        </Card>
      </div>
    )
  }

  renderTags() {
    return Object.values(this.props.ticket.tags)
      .map((tag, index) => {
        return <TicketTag
          key={index}
          tag={tag}
          removeTicketTag={this.removeTicketTag}
        />
      }
      )
  }

  renderTimerIcon() {
    return (
      this.state.ticket.time.isRunning ?
        <span onClick={() => this.onClickStop()}>
          <i
            className="fa fa-stop pull-right component-ticket-timer component-ticket-timer-stop"
          />
        </span> :
        <span onClick={() => this.onClickPlay()}>
          <i
            className="fa fa-play pull-right component-ticket-timer component-ticket-timer-play"
          />
        </span>
    )
  }

  onClickPlay() {
    this.setState(prevState => {
      let { ticket } = prevState

      ticket.time.isRunning = true
      ticket.time.start = Date.now()

      return { ticket }
    })
  }

  onClickStop() {
    this.setState(prevState => {
      let { ticket } = prevState

      ticket.time.isRunning = false
      ticket.time.stop = Date.now()
      ticket.time.total += prevState.currentTime

      return { ticket }
    })
  }

  addTicketTag() {
    const tag = this.generateRandomTag()
    this.setState(prevState => {
      let { ticket } = prevState
      ticket["tags"][tag.id] = tag

      return { ticket }
    })
  }

  removeTicketTag(tagId) {
    this.setState(prevState => {
      let { ticket } = prevState
      delete ticket["tags"][tagId]

      return { ticket }
    })
  }

  generateRandomTag() {
    const tagID = generateTagId(this.state.ticket.tags)
    const tagLabel = "taglabel"
    return { id: tagID, label: tagLabel }
  }
}

export default DragSource('item', ticketSource, collect)(Ticket);