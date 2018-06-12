# gTask
So I figured out how to run electron with react,https://gist.github.com/matthewjberger/6f42452cb1a2253667942d333ff53404  
Now we have to figure out how to do API calls from react, I read somewhere that Node APIs work with react but that didn't seem to work so https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/  
Basic idea is to make a desktop app for Google Task using Electron
  * React will be used to build the front end
  * Electron will be used to package it into a desktop app
  * Node.js will be used for back-end for API calls
  * A top bar widget would be nice too I think
## Sample Google Task API call from node
  * Call to list all the list
  ```javascript
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
  ```
  * Call to list tasks [The weird string is the code for the particular list]
  ```javascript
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
  ```
  
  * [Refer to the Tasks API here](https://developers.google.com/tasks/v1/reference/tasklists/list)
# TO DO
  * Front-End
    1. Main page with the actual list of tasks
      * UI design
      * React code
    2. secondary page that will have all the lists of the user
      * UI design
      * React code
    3. Maybe a page with completed tasks
    4. Maybe a settings page
