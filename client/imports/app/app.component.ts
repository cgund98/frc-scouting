import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Tasks } from '../../../both/collections/tasks.collection';
import { Task } from '../../../both/models/task.model';

import template from './app.component.html';

@Component({
  selector: 'app',
  template
})
export class AppComponent {
  tasks: Observable<Task[]>;

  constructor() {
    this.tasks = Tasks.find({}).zone();
  }

  openNewTask() {
  	$('.popup-wrapper').css('animation', '1s easeInDown');
  }
}