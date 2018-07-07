import React, { Component } from 'react';
import Timers from './timers';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Timers</h1>
        </header>

        <Timers />
      </div>
    );
  }
}

export default App;
