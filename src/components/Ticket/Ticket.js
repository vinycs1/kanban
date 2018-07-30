import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { Card, CardBody, CardHeader } from 'reactstrap'
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
  render() {
    const { isDragging, connectDragSource, ticket } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <div style={{ opacity }} className={"component-ticket"}>
        <Card>
          <CardHeader>{ticket.name}</CardHeader>
          <CardBody>
            {ticket.description}
            <Timer />
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default DragSource('item', ticketSource, collect)(Ticket);