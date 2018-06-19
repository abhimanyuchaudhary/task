import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../text.js'
import Button from '@material-ui/core/Button';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
var container;
var API_KEY = 'AIzaSyAeh3LWtwcnPkkER4c2N0qN1aqHnF3Q92w';
var Id;
class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Result : '',
      listId : '',
      listName: ''
    }
  }
  componentDidMount() {
    container = this;
    const {Id, Name} = this.props.location.state;
    this.state.listId = Id;
    this.state.listName = Name;
    console.log(this.state.listId);
    this.listTasks();
  }
  loadGapi = () => {
    console.log("here");
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('tasks', 'v1', () => {
          this.setState({ gapiReady: true });
        });
      });
    };

    document.body.appendChild(script);
  }
  listTasks = () => {
    this.loadGapi();
    console.log(this.state.listId);
      window.gapi.client.tasks.tasks.list({
          'tasklist' : this.state.listId
      }).then(function(response) {
        var l = '';
        var tasks = response.result.items;
        if (tasks && tasks.length > 0) {
          for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            l = l + " " + task.title;
          }
        } else {
          l = "no Tasks"
        }
        return l;
      }).then( function (l) {
        container.setState({Result : l});
      });

    }



  render () {
    if(this.state.gapiReady){
      return (
        <div>
           <Text title = {this.state.listName}/>
           <Text title = {this.state.Result}/>
       </div>
        );
    }
    else {
      return (
      <h1> waiting </h1>
      );
    }


  }
}
export default TasksPage;

