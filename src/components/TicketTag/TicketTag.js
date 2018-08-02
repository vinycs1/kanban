import React, { Component } from 'react'
import "./ticketTag.css"

class TicketTag extends Component {
 
  render() {
    return <span className="component-ticket-tag">{this.props.tag.label}
      <i onClick={() => this.onClickRemoveTicketTag()} className={"fa fa-times"}>
      </i>
    </span>
  }

  onClickRemoveTicketTag() {
    this.props.removeTicketTag(this.props.tag.id)
  }
}

export default TicketTag