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
var fullList;
class MyList extends React.Component {
  constructor(props) {
    super(props);

  }


componentDidMount() {
  this.makePartialList(function(){
    this.makeFullList();
  });

}

makePartialList = (callback) => {
  taskItems = this.props.tasks.tasks.map((tasks) =>
    <div>
      <ListItem button>
        <ListItemText primary={tasks.title} />
      </ListItem>
    </div>
  );
  callback();
}
makeFullList = () => {
  fullList = (
    <div>
      <List>
        {taskItems}
      </List>
    </div>
  );

}




  render () {

      return (
          {fullList}
        );
   
  }
}

export default MyList;