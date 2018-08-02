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
    component.onMoveTicket(monitor.getItem(), props.status)
  },

  canDrop(props, monitor) {
    if (props.context !== monitor.getItem().status)
      return true
  }
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tickets: props.tickets
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tickets: nextProps.tickets
    })
  }

  render() {
    const { connectDropTarget, hovered } = this.props
    const backgroundColor = hovered ? '#def9fc' : 'white'
    return connectDropTarget(
      <div className="col-4 component-ticket-list">
        <Card style={{ backgroundColor }}>
          <CardHeader>
            {this.props.status}
            <i className={"glyphicon glyphicon-plus"} />
          </CardHeader>
          {this.renderTickets()}
        </Card>
      </div>
    )
  }

  renderTickets() {
    return Object.values(this.state.tickets).map(ticket =>
      <Ticket
        key={ticket.id}
        ticket={ticket}
        updatedTicketTime={this.props.updatedTicketTime}
        addTicketTag={this.addTicketTag}
        removeTicketTag={this.props.removeTicketTag}
      />
    )
  }

  onMoveTicket(ticket, newStatus) {
    this.props.moveTicket(ticket, newStatus)
  }
}

export default DropTarget('item', ListTarget, collect)(List)