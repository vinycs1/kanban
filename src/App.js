import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';

import List from './components/List'


class App extends Component {
  state = {
    todo: {
      '1': { id: 1, name: 'Item 1' },
      '2': { id: 2, name: 'Item 2' },
      '3': { id: 3, name: 'Item 3' },
      '4': { id: 4, name: 'Item 4' }
    },
    doing: {},
    done: {}
  }

  render() {
    return (
      <div className="App">
        <List label={"TODO"} tickets={this.state.todo}/>
        <List label={"DOING"} tickets={this.state.doing}/>
        <List label={"DONE"} tickets={this.state.done} />
      </div>

    )
  }
}

export default DragDropContext(HTML5Backend)(App)
