import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import Button from '@material-ui/core/Button';

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
      <Link to="/ListsPage">
         <Button variant="contained" color="primary">List Page</Button>
      </Link>
  		);

  }
}

export default LandingPage;