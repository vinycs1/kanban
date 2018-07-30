import React, { Component } from 'react'
import newId from '../../utils/generateId'

class CreateTicket extends Component {
	constructor(props) {
		super(props)

		this.handleInputChange = this.handleInputChange.bind(this)

		this.state = {
			name: "",
			description: ""
		}
	}

	render() {
		return (
			<div style={{ "marginLeft": "50px" }}>
				<label>
					Nome:
				<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.handleInputChange}
					/>
				</label>
				
				<label>
					Descrição:
				<input
						name="description"
						type="text"
						value={this.state.description}
						onChange={this.handleInputChange}
					/>
				</label>
				<button onClick={() => this.handleSave(this.state)}>Salvar</button>

			</div>
		)
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		})
	}

	handleSave(ticket) {
		console.log("CLISK")
		if (ticket.name === "")
			return;
		ticket["id"] = newId()
		ticket["status"] = "todo"
		this.props.saveTicket(ticket)
	}
}

export default CreateTicket