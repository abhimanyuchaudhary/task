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
class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Result : ''
    }
  }
  componentDidMount() {
  	container = this;
    var listId = this.props.location.state;
    console.log(listId);
    this.setState({listId : listId});
  }
  listTasks = () => {
      window.gapi.client.tasks.tasks.list({
          'tasklist' : this.state.listId
      }).then(function(response) {
        // appendPre('Task Lists:');
        var l = '';
        var tasks = response.result.items;
        if (tasks && tasks.length > 0) {
          for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            l = l + " " + task.title;
            // console.log(l);
          }
        } else {
          l = "no Tasks"
          // console.log(l)
        }
        return l;
      }).then( function (l) {
        // console.log(l);
        container.setState({Result : l});
      });

    }

  render () {
  	return (
  		<div>
  		<Button variant="contained" color="primary" onClick={this.listTasks}>
  		Click here to call API
  		 </Button>
  		<Text title = {this.state.Result}/>
  		</div>
  		);

  }
}
export default TasksPage;

