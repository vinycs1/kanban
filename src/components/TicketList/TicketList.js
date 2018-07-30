import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import Ticket from '../Ticket/'

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
    const backgroundColor = hovered ? 'lightgreen' : 'white'
    return connectDropTarget(
      <div
        className="col-4"
        style={{ backgroundColor, "border": "1px solid grey" }}
      >
        {this.props.status}
        {this.renderTickets()}
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
    this.props.moveTicket(ticket,newStatus)
  }
}

export default DropTarget('item', ListTarget, collect)(List)