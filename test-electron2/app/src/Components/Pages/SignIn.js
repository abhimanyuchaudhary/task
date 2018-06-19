import React, { View, Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Icon from '../../Resources/Images/tasksicon.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ReactGoogleAuth from 'react-google-auth';
import Example from './Example';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
var container;
var startId;
var API_KEY = 'AIzaSyAeh3LWtwcnPkkER4c2N0qN1aqHnF3Q92w';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiReady : false,
      sId : '',
      isSignedIn : false
    }
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
          console.log(window.gapi.client.tasks);
          window.gapi.client.tasks.tasklists.list({
              'maxResults': 10
          }).then(function(response) {
            var l = '';
            var taskLists = response.result.items;
            if (taskLists && taskLists.length > 0) {
              for (var i = 0; i < taskLists.length; i++) {
                var taskList = taskLists[i];
                if(taskList.title == "My Tasks"){
                  container.setState({sId : taskList.id});
                }
                console.log(taskList.title);
              }
            } else {
              console.log("No Tasks")
            }
          });
        });
      });
    };

    document.body.appendChild(script);
  }

  componentDidMount() {
    container = this;

  }




  render () {
      return (
          <div className="Box Box-thick">
              <Example />
          </div>
        );

  }
}

export default SignIn;