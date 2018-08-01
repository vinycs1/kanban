import React, { Component } from 'react'
import "./ticketTag.css"

class TicketTag extends Component {
  render() {
    console.log(this.props);
    
    return <span className="component-ticket-tag">{this.props.tag.tag}
      <i onClick={() => this.onClickRemoveTicketTag()} className={"fa fa-times"}>
      </i>
    </span>
  }

  onClickRemoveTicketTag() {
    this.props.removeTicketTag(this.props.tag)
  }

}

export default TicketTag