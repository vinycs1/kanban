import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { Row } from 'reactstrap'

import './App.css';

import TicketList from './components/TicketList/'
import CreateTicket from './components/CreateTicket/'


class App extends Component {
  constructor() {
    super()
    this.state = {
      tickets: {
        '1': { id: 1, name: 'Item 1', description: "description ticket 1", status: "todo" },
        '2': { id: 2, name: 'Item 2', description: "description ticket 2", status: "todo" },
        '3': { id: 3, name: 'Item 3', description: "description ticket 3", status: "todo" },
        '4': { id: 4, name: 'Item 4', description: "description ticket 4", status: "todo" }
      }
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Desafio Pareto Group</h1>
          <h6>Candidato Vinicius Castro Silva</h6>
        </header>
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

  filterTicketsByStatus(status) {
    return Object.values(this.state.tickets).filter(ticket => {
      return ticket.status === status
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

export default DragDropContext(HTML5Backend)(App)