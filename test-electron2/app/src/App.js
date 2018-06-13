import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Text from './Components/text.js'


class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      Result: "1"
    }
  }

componentDidMount() {
  App = this;
}
listTaskLists = () => {
    
    window.gapi.client.tasks.tasklists.list({
        'maxResults': 10
    }).then(function(response) {
      // appendPre('Task Lists:');
      var l = '';
      var taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
        for (var i = 0; i < taskLists.length; i++) {
          var taskList = taskLists[i];
          l = taskList.title;
          console.log(l);
          // console.log(list);
        }
      } else {
        l = "no Tasks"
        console.log(l)
      }
      return l;
    }).then( function (l) {
      console.log(l);
      console.log(l);
      this.setState({Result : l});
    });

  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.listTaskLists}>
        Click here to call API
         </button>
         <pre id = "content"> </pre>
        <Text title = {this.state.Result}/>
      </div>
    );
  }
}

export default App;
