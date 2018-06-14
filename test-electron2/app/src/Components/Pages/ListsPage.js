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
class ListsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	Result : ""
    };
  }
  componentDidMount() {
  	container = this;
  }
  listTaskLists = () => {
      
      window.gapi.client.tasks.tasklists.list({
          'maxResults': 10
      }).then(function(response) {
        // appendPre('Task Lists:');
        var l = '';
        var taskLists = response.result.items;
        if (taskLists && taskLists.length > 0) {
          for (var i = 0; i < taskLists.length; i++) {
            var taskList = taskLists[i];
            l = l + " " + taskList.title;
            console.log(l);
          }
        } else {
          l = "no Tasks"
          console.log(l)
        }
        return l;
      }).then( function (l) {
        console.log(l);
        container.setState({Result : l});
      });

    }
  render () {
  	return (
  		<div>
  		<Button variant="contained" color="primary" onClick={this.listTaskLists}>
  		Click here to call API
  		 </Button>
  		<Text title = {this.state.Result}/>
  		</div>
  		);

  }
}
export default ListsPage;

