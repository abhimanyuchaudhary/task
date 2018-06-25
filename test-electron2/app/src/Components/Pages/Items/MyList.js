import React, { View, Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

var taskItems;
var container;
var deleted = [];


class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks : this.props.tasks
    }

  }
componentDidMount() {
  container = this;
  console.log(this.props.Id);
  console.log(this.props);
  taskItems = this.state.myTasks.map((task) =>
    <div>
      <ListItem button={true} divider={true} onClick={this.handleTaskClick.bind(this, task.id)}>
        <ListItemText primary={task.title} />
      </ListItem>
    </div>
  );
}
handleTaskClick = (id) => {
 console.log(id);
 deleted.push(id);
 console.log(window.gapi.client);
 window.gapi.client.tasks.tasks.delete({
    'tasklist' : this.props.Id,
    'task' : id
});
 // this.listTasks();

};
listTasks = () => {

    window.gapi.client.tasks.tasks.list({
        'tasklist' : this.props.Id
    }).then(function(response) {
      taskItems = container.state.myTasks.map((task) =>
        <div>
          <ListItem button={true} divider={true} onClick={this.handleTaskClick.bind(this, task.id)}>
            <ListItemText primary={task.title} />
          </ListItem>
        </div>
      );
    });

  };




  render () {
      
      return (
        <List>
          {taskItems}
        </List>
        );
   
  }
}

export default MyList;