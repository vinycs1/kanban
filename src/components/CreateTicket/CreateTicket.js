import React, { Component } from 'react'
import newId from '../../utils/generateId'

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
			<div style={{ "marginLeft": "50px" }}>
				<label>
					Nome:
				<input
						name="name"
						type="text"
						value={this.state.name}
						onChange={this.onInputChange}
					/>
				</label>

				<label>
					Descrição:
				<input
						name="description"
						type="text"
						value={this.state.description}
						onChange={this.onInputChange}
					/>
				</label>
				<button onClick={() => this.onClickSave(this.state)}>Salvar</button>

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
		ticket.tags ={}
		
		this.props.saveTicket(ticket)
	}

	initialTime() {
		return {
			"totalSpended": 0,
			"start": 0,
			"stop": 0,
			"currentTime": 0,
			"isRunning": false
		}
	}
}

export default CreateTicket