# Task
Basic idea is to make a desktop app for Google Task using Electron
  * React will be used to build the front end, and call APIs
  * Electron will be used to package it into a desktop app
  * A top bar widget would be nice too I think

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
  * ~~Fix login logout - like it's in the index.html file rn we have to put it in the react code. I haven't tried but this might prove difficult because google auth is weird [SO It's almost fixed, button is in react but will have to design front end so that placement can be figured out]~~
  * ~~The mytasks page doesn't always load properly because of api client~~
  * Makeit so that signout takes you to landing page and all buttons are not pressable till logged in, for this bring the buttons to react
  * So if someone refreshes he is logged out, we don't want this but not a priority rn.
  * Making loading animation
  * Make it look good
  * ~~make a task deletable, or do able rather~~
  * ~~Tasks can be deleted but if a list is empties while deleting things stop working~~
  * ~~maybe change how api si called, do the .fetch thing~~

