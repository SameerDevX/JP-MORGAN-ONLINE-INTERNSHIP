import React, { Component } from 'react';
import { ServerRespond } from './DataStreamer';
import './App.css';
import Graph from './Graph';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data} />);
    }
    return null;
  }

  getDataFromServer() {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Data Graphing Tool</h1>
        </header>
        <div className="App-content">
          {this.renderGraph()}
        </div>
      </div>
    );
  }
}

export default App;
