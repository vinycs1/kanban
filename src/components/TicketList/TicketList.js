import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { Card, CardHeader } from 'reactstrap'
import Ticket from '../Ticket/'
import './ticketList.css'

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  }
}

const ListTarget = {
  drop(props, monitor, component) {
    component.moveTicket(monitor.getItem(), props.status)
  },

  canDrop(props, monitor) {
    if (props.context !== monitor.getItem().status)
      return true
  }
}

class List extends Component {

  render() {
    const { connectDropTarget, hovered } = this.props
    const backgroundColor = hovered ? '#def9fc' : 'white'
    return connectDropTarget(
      <div className="col-4">
        <Card style={{ backgroundColor }} className={"component-ticket-list"}>
          <CardHeader>
            {this.props.status}
            <i className={"glyphicon glyphicon-plus"}/>
          </CardHeader>
          {this.renderTickets()}
        </Card>
      </div>
    )
  }

  renderTickets() {
    return Object.values(this.props.tickets).map(ticket =>
      <Ticket
        key={ticket.id}
        ticket={ticket}
      />
    )
  }

  moveTicket(ticket, newStatus) {
    this.props.moveTicket(ticket, newStatus)
  }
}

export default DropTarget('item', ListTarget, collect)(List)