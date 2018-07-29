import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import Ticket from './Ticket'

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem()
    }
}

const ListTarget = {
    drop(props, monitor, component) {
        component.addTicket(monitor.getItem())
    }

}

class List extends Component {
    state = {
        tickets: this.props.tickets
    }

    render() {
        const { connectDropTarget, hovered, item } = this.props
        const backgroundColor = hovered ? 'lightgreen' : 'white'
        return connectDropTarget(
            <div style={{ backgroundColor }}>
                {this.props.label}
                {this.renderTickets()}
            </div>
        )
    }

    renderTickets() {
        return Object.values(this.props.tickets).map(ticket =>
            <Ticket
                key={ticket.id}
                ticket={ticket}
                moveTicket={(ticket) => this.moveTicket(ticket)}
            />
        )
    }

    moveTicket(ticket) {
        this.setState(prevState => {
            let tickets = prevState.tickets

            delete tickets[ticket.id]

            return { tickets }
        })
    }

    addTicket(ticket) {
        this.setState(prevState => {
            let tickets = prevState.tickets
            tickets[ticket.id] = ticket

            return { tickets }
        })
    }
}

export default DropTarget('item', ListTarget, collect)(List)