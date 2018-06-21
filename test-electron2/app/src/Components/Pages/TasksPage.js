import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../text.js'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MyList from './Items/MyList.js';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
var container;
var API_KEY = 'AIzaSyAeh3LWtwcnPkkER4c2N0qN1aqHnF3Q92w';
var Id;
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};
var fullList;
var listComponents;
var tasks;
var tasksComponents;
var fullTasks;
var test = [];
class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Result : '',
      listId : '',
      listName: '',
      listsList : [],
      allTasks: []
    }
  }
  componentDidMount() {
    container = this;
    const {Id, Name} = this.props.location.state;
    this.setState({listId: Id, listName: Name});
    console.log(this.props.location.state.Id);
    this.loadGapi(function(){
      container.listTasks(function(){
        container.listTaskLists();
      });
    });
  }
  componentWillReceiveProps() {

    container = this;
    container.setState({ gapiReady: false });
    const {Id, Name} = this.props.location.state;
    container.setState({listId: Id, listName: Name});

    this.loadGapi(function(){
      container.listTasks(function(){
        container.listTaskLists();
      });
    });
  }
  componentWillUnmount() {
    console.log("unmount");
  }
  loadGapi = (callback) => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY); 
        window.gapi.client.load('tasks', 'v1', () => {
          callback();
        });
      });
    };

    document.body.appendChild(script);
  }
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  listTasks = (callback) => {
      window.gapi.client.tasks.tasks.list({
          'tasklist' : this.props.location.state.Id
      }).then(function(response) {
        var tasks = response.result.items;
        container.setState({allTasks : response.result.items});
        test = response.result.items;
        // console.log(container.state.allTasks);
        tasksComponents = tasks.map((task) =>
          <div>
            <ListItem button={true} divider={true} id={task.id}>
              <ListItemText primary={task.title} />
            </ListItem>
          </div>
          
        );
        fullTasks = (
          <div>
          <List>
          {tasksComponents}
          </List>
          </div>
        );
      }).then( function (l) {
        callback();
        container.setState({ gapiReady: true });
      });

    }
  listTaskLists = () => {
    console.log(this.state.listId);
        window.gapi.client.tasks.tasklists.list({
            'maxResults': 100
        }).then(function(response) {
          var taskLists = response.result.items;
          container.setState({listsList : taskLists});
          listComponents = taskLists.map((list) =>
              <Link to={{ pathname: "/TasksPage", state: { Id: list.id, Name: list.title} }}>
                <ListItem button>
                  <ListItemText primary={list.title} />
                </ListItem>
              </Link>
          );
          fullList = (
            <div>
            <List>
            {listComponents}
            </List>
            </div>
          );
        });

    }


  render () {
    if(this.state.gapiReady){
      return (
        <div>
           <Text title = {this.props.location.state.Name}/>
           {fullTasks}
           <Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>
        <Drawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {fullList}
          </div>
        </Drawer>
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

