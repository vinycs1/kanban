import React, { Component } from 'react'
import { Popover, PopoverBody } from 'reactstrap'

class CreateTicketTag extends Component {
  constructor(props) {
    super(props)

    this.state = {
      popoverOpen: false,
      tag: ""
    }

    this.toggle = this.toggle.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  render() {
    return (
      <span className={"pull-left"}>
        <i
          title={"Adicionar Tag"}
          className={"fa fa-plus"}
          id={`create-ticket-tag-${this.props.target}`}
          onClick={this.toggle}
        />
        <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={`create-ticket-tag-${this.props.target}`}
          toggle={this.toggle}
        >
          <PopoverBody>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nova Tag"
                onChange={this.onInputChange}
                value={this.state.tag}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => this.addTicketTag(this.state.tag)}
                >
                  OK
                </button>
              </div>
            </div>
          </PopoverBody>
        </Popover>
      </span>
    )
  }

  addTicketTag(tagLabel) {
    this.props.addTicketTag(tagLabel)
    this.toggle()
  }

  onInputChange(event) {
    const tag = event.target.value
    this.setState({
      tag
    })
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    })
  }
}

export default CreateTicketTag