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
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
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
  componentWillUnmount() {
    container = this;
    console.log("hg");
    console.log(window.gapi.client.tasks);
      window.gapi.client.tasks.tasklists.list({
          'maxResults': 10
      }).then(function(response) {
        var taskLists = response.result.items;
        if (taskLists && taskLists.length > 0) {
          for (var i = 0; i < taskLists.length; i++) {
            var taskList = taskLists[i];
            if(taskList.title == "My Tasks"){
              startId = taskList.id;
            }
          }
        } else {
          console.log("TNo Tasks")
        }
      });
  }




  render () {
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
            <Link to={{ pathname: "/TasksPage", state: { listId: startId} }}>
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

  }
}

export default LandingPage;