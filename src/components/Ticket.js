import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

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
            <div>
                <span style={{ opacity }}>{ticket.name}</span>
            </div>
        )
    }
}

export default DragSource('item', ticketSource, collect)(Ticket);