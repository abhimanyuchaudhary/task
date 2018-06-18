# gTask
Basic idea is to make a desktop app for Google Task using Electron
  * React will be used to build the front end, and call APIs
  * Electron will be used to package it into a desktop app
  * A top bar widget would be nice too I think
## Sample Google Task API call from node - see listtasks.js for exact usage
  * Call to list all the list
  ```javascript
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
  ```
# How to run
After installing NPM and Yarn  
Go to testelectron2/app
```
npm install;
yarn add electron --dev
yarn add electron-builder --dev
yarn global add foreman # for process management
yarn install
yarn start
```

  * [Refer to the Tasks API here](https://developers.google.com/tasks/v1/reference/tasklists/list)
# TO DO
  * ~~Electron with react~~ https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404  
  * ~~How to call Api~~ (see listtasks.js) 
  * ~~Google Auth in react~~
  * ~~using css in react~~ https://material-ui.com
  * Fix login logout - like it's in the index.html file rn we have to put it in the react code. I haven't tried but this might prove difficult because google auth is weird
  * The mytasks page doesn't always load properly because of api client, might even give problem later on when switching lists
  * Makeit so that signout takes you to landing page and all buttons are not pressable till logged in, for this bring the buttons to react
  * maybe change how api si called, do the .fetch thing
  * Front-End
    1. Main page with the actual list of tasks
      * UI design
      * React code
    2. secondary page that will have all the lists of the user
      * UI design
      * React code
    3. Maybe a page with completed tasks
    4. Maybe a settings page
