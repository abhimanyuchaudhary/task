import React, { View, Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Icon from '../../Resources/Images/tasksicon.png';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
var container;
var startId;
var API_KEY = 'AIzaSyAeh3LWtwcnPkkER4c2N0qN1aqHnF3Q92w';
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gapiReady : false,
      sId : ''
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
        });
      });
    };

    document.body.appendChild(script);
  }
  loadClientWhenGapiReady = (script) => {
      console.log('Trying To Load Client!');
      console.log(script)
      if(script.getAttribute('gapi_processed')){
        console.log('Client is ready! Now you can access gapi. :)');
        if(window.location.hostname==='localhost'){
          window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest")
          .then((response) => {
            console.log("Connected to metafields API locally.");
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
            },
            function (err) {
              console.log("Error connecting to metafields API locally.");

            }
          );
        }
      }
      else{
        console.log('Client wasn\'t ready, trying again in 100ms');
        setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
      }
    }
    initGapi = () => {
        console.log('Initializing GAPI...');
        console.log('Creating the google script tag...');

        const script = document.createElement("script");
        script.onload = () => {
          console.log('Loaded script, now loading our api...')
          // Gapi isn't available immediately so we have to wait until it is to use gapi.
          this.loadClientWhenGapiReady(script);
        };
        script.src = "https://apis.google.com/js/client.js";
        
        document.body.appendChild(script);
      }
  componentDidMount() {
    container = this;
    console.log("there");
    if (!this.state.gapiReady) {
      this.initGapi();
      this.loadGapi();

      console.log("therehere");
    } else {
      console.log('gapi loaded');
    }
  }

  listTaskLists = () => {
    console.log(window.gapi.client.tasks);
    window.gapi.client.tasks.tasklists.list({
        'maxResults': 10
    }).then(function(response) {
      var l = '';
      var taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
        for (var i = 0; i < taskLists.length; i++) {
          var taskList = taskLists[i];
          console.log(taskList.title);
        }
      } else {
        console.log("TNo Tasks")
      }
    });

  }





  render () {
      // if(this.state.gapiReady){

        return (
          <div id = "LandingPageMain" style = {{height: '414px'}}>
          <Grid container wrap="nowrap" spacing={40} alignContent="center" justify ="center" alignItems="center" direction="column">
            <Grid item>
                       <img style={{width: '80px', height: '80px'}} src={Icon}/>
            </Grid>
            <Grid item>
                <Typography variant="display1" align="center" component="h3">
                  TASKS
                </Typography>
            </Grid>
            <Grid item>
                <Link to={{ pathname: "/TasksPage", state: { listId: 'MDk5NjEwMzY5OTE5NDUwNTk5NDk6NDg0MDU4NDM1NDA1ODk2NTow'} }}>
                   <Button variant="contained">TasksPage</Button>
                </Link>
            </Grid>
            <Grid item>
                <Link to = "/ListsPage">
                   <Button variant="contained">ListsPage</Button>
                </Link>
            </Grid>
            <Grid item>
                   <Button variant="contained" onClick={this.listTaskLists}>Test</Button>
            </Grid>
          </Grid>
          </div>
          );
      // }
   


  }
}

export default LandingPage;