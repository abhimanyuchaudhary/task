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
var tempTasks = [];

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTasks : this.props.tasks,
      taskItems : <div> </div> ,
      deleted : []
    }

  }
componentDidMount() {
  container = this;
  this.setState({myTasks : this.props.tasks});
  this.makeListItem();
}
componentWillReceiveProps(newProps) {
  container = this;
  container.setState({ gapiReady: false });
  this.setState({myTasks : newProps.tasks});
  this.makeListItem();
}


makeListItem = () => {
  // console.log(this.props.tasks);
  var newItems = this.state.myTasks.map((task) =>
    <div>
      <ListItem button={true} divider={true} onClick={this.handleTaskClick.bind(this, task.id)}>
        <ListItemText primary={task.title} />
      </ListItem>
    </div>
  );
  this.setState({taskItems : newItems});
};

handleTaskClick = (id) => {
    // console.log(id);
    deleted.push(id);
    window.gapi.client.tasks.tasks.delete({
        'tasklist' : this.props.Id,
        'task' : id
    }).then(function(response) {
        deleted.push(id);
        
        var counter = 0;
        for(var i = 0; i < container.state.myTasks.length; i++){
          if(container.state.myTasks[i].id != id){
            tempTasks[counter] = container.state.myTasks[i];
            counter++;
          }
        }
    }).then(function(){
      container.setState({myTasks : tempTasks})
    }).then(function(){
      container.makeListItem();
    });


};



  render () {
      
      return (
        <List>
          {this.state.taskItems}
        </List>
        );
   
  }
}

export default MyList;