import { Tasks } from '../../../both/collections/tasks.collection';
import { Task } from '../../../both/models/task.model';

export function loadTasks() {
  if (Tasks.find().cursor.count() === 0) {
    const tasks = [{
      title: "Bitches ain't shit",
    }, { 
      title: "But hoes and tricks",
    }, {
      title: "So lick on these nuts",
    },];

    tasks.forEach((task: Task) => Tasks.insert(task));
  }
}
