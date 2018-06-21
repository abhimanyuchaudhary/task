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
function handleTaskClick(id){
 console.log(id);
};
class MyList extends React.Component {
  constructor(props) {
    super(props);

  }
componentDidMount() {
  container = this;
  taskItems = this.props.tasks.map((task) =>
    <div>
      <ListItem button={true} divider={true} onClick={handleTaskClick.bind(this,task.id)}>
        <ListItemText primary={task.title} />
      </ListItem>
    </div>
  );

}




  render () {
      
      return (
        <List>
          {taskItems}
        </List>
        );
   
  }
}

export default MyList;