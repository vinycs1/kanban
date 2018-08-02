import React, { Component } from 'react'
import './App.css';

import Kanban from './views/Kanban/Kanban'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Kanban
          </h1>
          <h6>by Vinicius Castro</h6>
        </header>
        <Kanban />
      </div>
    )
  }


}

export default App