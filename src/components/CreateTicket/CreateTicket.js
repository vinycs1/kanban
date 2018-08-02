import React, { Component } from 'react'
import newId from '../../utils/generateId'
import './createTicket.css'

class CreateTicket extends Component {
	constructor(props) {
		super(props)

		this.onInputChange = this.onInputChange.bind(this)

		this.state = {
			name: "",
			description: ""
		}
	}

	render() {
		return (
			<div className="container component-create-ticket">
				<div className="row">
					<div className="input-group sm-3">
						<div className="input-group-prepend">
							<span className="input-group-text">Ticket</span>
						</div>
						<input
							value={this.state.name}
							onChange={this.onInputChange}
							type="text"
							name="name"
							className="form-control"
							placeholder="Ticket"
						/>
						<div className="input-group-prepend">
							<span className="input-group-text">Descrição</span>
						</div>
						<input
							value={this.state.description}
							onChange={this.onInputChange}
							type="text"
							name="name"
							className="form-control"
							placeholder="Ticket"
						/>
						<button
							onClick={() => this.onClickSave(this.state)}
							className="btn btn-light"
						>
							Salvar
					 </button>

					</div>

				</div>
			</div>

		)
	}

	onInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		})
	}

	onClickSave(ticket) {
		if (ticket.name === "")
			return;
		ticket["id"] = newId()
		ticket["status"] = "todo"

		//FIXME
		ticket.time = this.initialTime()
		ticket.tags = {}

		this.props.saveTicket(ticket)
	}

	initialTime() {
		return {
			"total": 0,
			"start": 0,
			"stop": 0,
			"currentTime": 0,
			"isRunning": false
		}
	}
}

export default CreateTicket