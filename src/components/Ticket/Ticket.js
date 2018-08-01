import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { Card, CardBody, CardHeader } from 'reactstrap'
import TicketTag from '../TicketTag/'
import Timer from '../Timer/'
import './ticket.css'

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
  constructor() {
    super()

    this.onClickStart = this.onClickStart.bind(this)
    this.onClickStop = this.onClickStop.bind(this)
  }

  render() {
    const { isDragging, connectDragSource, ticket } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <div style={{ opacity }} className={"component-ticket"}>
        <Card>
          <CardHeader>{ticket.name}</CardHeader>
          <CardBody>
            {ticket.description}
            <Timer
              time={ticket.time}
              onClickStart={this.onClickStart}
              onClickStop={this.onClickStop}
            />
            {this.renderTags()}
          </CardBody>
        </Card>
      </div>
    )
  }

  renderTags() {
    return Object.values(this.props.ticket.tags)
      .map((tag, index) =>
        <TicketTag
          key={index}
          tag={tag}
        />
      )
  }

  onClickStart(startedTime) {
    const { ticket } = this.props
    let time = ticket.time

    time.isRunning = true
    time.start = startedTime

    this.props.updatedTicketTime(ticket, time)
  }

  onClickStop(stopedTime) {
    let { ticket } = this.props
    let time = ticket.time

    time.isRunning = false
    time.stop = stopedTime

    time.totalSpended += time.stop - time.start

    this.props.updatedTicketTime(ticket, time)
  }
}

export default DragSource('item', ticketSource, collect)(Ticket);