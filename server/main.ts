import { Meteor } from 'meteor/meteor';

import { loadTasks } from './imports/fixtures/tasks';

Meteor.startup(() => {
  // code to run on server at startup
  loadTasks();
});
