import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import Text from './Components/text.js'
import Button from '@material-ui/core/Button';
import ListsPage from './Components/Pages/ListsPage.js'
import LandingPage from './Components/Pages/LandingPage.js'
import TasksPage from './Components/Pages/TasksPage.js'
import SignIn from './Components/Pages/SignIn.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
            <Route exact path="/" component={SignIn}/>
            <Route path="/LandingPage" component={LandingPage}/>
            <Route path="/ListsPage" component={ListsPage}/>        
            <Route path="/TasksPage/:Id/:Name" component = {TasksPage}/>
        </div>
      </Router>
    );
  }
}

export default App;
