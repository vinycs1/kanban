import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { Row } from 'reactstrap'
import tickets from '../../mocks/Tickets.mock'
import TicketList from '../../components/TicketList/'
import CreateTicket from '../../components/CreateTicket/'
import "./kanban.css"

class Kanban extends Component {
  constructor() {
    super()
    this.state = {
      tickets
    }

    this.ticketStatus = {
      "todo": "todo",
      "doing": "doing",
      "done": "done"
    }

    this.saveTicket = this.saveTicket.bind(this)
    this.moveTicket = this.moveTicket.bind(this)
  }

  render() {
    console.log(" ads",this.state)
    return (
      <div className="view-kanban">
        <Row>
          <CreateTicket saveTicket={this.saveTicket} />
        </Row>
        <Row>
          {this.renderTicketLists()}
        </Row>
      </div>
    )
  }

  renderTicketLists() {
    return (
      Object.values(this.ticketStatus).map(status => {
        return <TicketList
          key={status}
          status={status}
          tickets={this.filterTicketsByStatus(status)}
          moveTicket={this.moveTicket}
        />
      })
    )
  }

  filterTicketsByStatus(status) {
    return Object.values(this.state.tickets).filter(ticket => {
      return ticket.status === status
    })
  }

  saveTicket(ticket) {
    if (this.verifyIfTicketAlreadyExist(ticket)) {
      this.setState(prevState => {
        let tickets = prevState.tickets
        tickets[ticket.id] = ticket
        return { tickets }
      })
    }
  }

  verifyIfTicketAlreadyExist(newTicket) {
    const tickets = Object.values(this.state.tickets)
    return !tickets.some(ticket => {
      return ticket.id === newTicket.id || ticket.name === newTicket.name
    })
  }

  moveTicket(movingTicket, newStatus) {
    this.setState(prevState => {
      let tickets = prevState.tickets

      tickets[movingTicket.id] = this.updateTicketStatus(movingTicket, newStatus)

      return { tickets }
    })
  }

  updateTicketStatus(ticket, status) {
    let updatedTicket = Object.assign({}, ticket)
    updatedTicket.status = status
    return updatedTicket
  }
}

export default DragDropContext(HTML5Backend)(Kanban)