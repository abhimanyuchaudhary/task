import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './text.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Text title = "test"/>
      </div>
    );
  }
}

export default App;
