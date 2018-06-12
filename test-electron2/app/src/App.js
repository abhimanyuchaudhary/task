import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete credentials.json.
const SCOPES = ['https://www.googleapis.com/auth/tasks.readonly'];
const TOKEN_PATH = 'credentials.json';

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Slides API.
  authorize(JSON.parse(content), listTasks);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return callback(err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the user's first 10 task lists.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listTaskLists(auth) {
  const service = google.tasks({version: 'v1', auth});
  service.tasklists.list({
    maxResults: 10,
  }, (err, {data}) => {
    if (err) return console.error('The API returned an error: ' + err);
    const taskLists = data.items;
    if (taskLists) {
      console.log('Task lists:');
      taskLists.forEach((taskList) => {
        console.log(`${taskList.title} (${taskList.id})`);
      });
    } else {
      console.log('No task lists found.');
    }
  });
}

function listTasks(auth) {
  const service = google.tasks({version: 'v1', auth});
  service.tasks.list({
    tasklist: 'MTI1NzMwMjIzNjgxNDAwMDExMjM6MDU1NDU5NjU1NTIzNTQ1ODow',
  }, (err, {data}) => {
    if (err) return console.error('The API returned an error: ' + err);
    const tasks = data.items;
    if (tasks) {
      console.log('Task lists:');
      tasks.forEach((tasks) => {
        console.log(`${tasks.title} (${tasks.id})`);
      });
    } else {
      console.log('No task found.');
    }
  });
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
