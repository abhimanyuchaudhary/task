import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Text from '../text.js'
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MyList from './Items/MyList.js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
var container;
var API_KEY = 'AIzaSyAeh3LWtwcnPkkER4c2N0qN1aqHnF3Q92w';
var Id;
const bottomButtonDiv= {
   position: 'fixed',
   bottom: 0,
   width : '100%',
   backgroundColor : 'grey',
   margin : '0'
}
const addButtonDiv= {
  
}
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
var tasks = [];
var tasksComponents;
var fullTasks;
var test = [];
var nextProps;
var deleted = [];

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Result : '',
      listId : '',
      listName: '',
      listsList : [],
      allTasks: [],
      input : ''
    }
  }
  componentDidMount() {
    container = this;
    const {Id, Name} = this.props.match.params;
    this.loadGapi(function(){
      container.listTasks(function(){
        container.listTaskLists();
      });
    });
  }
  componentWillReceiveProps(newProps) {
    container = this;
    container.setState({ gapiReady: false });
    const {Id, Name} = newProps.match.params;
    this.props = newProps;
    console.log(this.props.match.params, newProps.match.params);
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
    // const {Id, Name} = this.props.match.params;
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
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  listTasks = (callback) => {
      window.gapi.client.tasks.tasks.list({
          'tasklist' : this.props.match.params.Id
      }).then(function(response) {
        tasks = response.result.items;
        if(response.result.items == null){
          tasks = [];
        }
        container.setState({allTasks : response.result.items});
      }).then( function (l) {
        callback();
        container.setState({ gapiReady: true });
      });

    };

  listTaskLists = () => {
    // console.log(this.state.listId);
        window.gapi.client.tasks.tasklists.list({
            'maxResults': 100
        }).then(function(response) {
          var taskLists = response.result.items;
          container.setState({listsList : taskLists});
          listComponents = taskLists.map((list) =>
              <Link to={"/TasksPage/"+list.id+"/"+list.title} params = {{ Id: list.id, Name: list.title}}>
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

    };
  insertTasks = (callback) => {

      window.gapi.client.tasks.tasks.insert({
          'tasklist' : this.props.match.params.Id,
          'title' : this.state.input
      }).then(function(response) {
        // console.log(response);
        container.listTasks(function(){
          // console.log(tasks);
        });
      });

    };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleEnter = () => {
    // console.log(this.state.input);
    this.insertTasks();
    this.setState({open: false});
  };
  onChange = (event) => {
    this.setState({input: event.target.value});
  }

  render () {
    if(this.state.gapiReady){
      return (
        <div>
           <Text title = {this.props.match.params.Name}/>
           <MyList tasks={tasks} Id={this.props.match.params.Id}/>

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
        <div style = {bottomButtonDiv}>
        <IconButton
          onClick={this.toggleDrawer('bottom', true)}
        >
          <MoreVertIcon />
        </IconButton>
          {/*<Button onClick={this.toggleDrawer('bottom', true)}>Open Bottom</Button>*/}
          <Button variant="raised" color = "primary" style = {addButtonDiv} onClick={this.handleClickOpen}>Add a new Task </Button>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="email"
                onChange={this.onChange.bind(this)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleEnter} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
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


