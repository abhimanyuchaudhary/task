import React, { View, Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
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
class LandingPage extends React.Component {
  constructor(props) {
    super(props);
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
            <Link to="/ListsPage">
               <Button variant="contained" color="white">Start</Button>
            </Link>
        </Grid>
      </Grid>
      </div>
  		);

  }
}

export default LandingPage;