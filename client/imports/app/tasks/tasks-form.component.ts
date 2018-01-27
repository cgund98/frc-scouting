import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

import template from './tasks-form.component.html';
import { Tasks } from '../../../../both/collections/tasks.collection';

@Component({
  selector: 'tasks-form',
  template
})
export class TasksFormComponent implements OnInit {
	addForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder
	) {}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			title: ['', Validators.required],
		});
	}

	addTask(): void {
		if (this.addForm.valid) {
			Tasks.insert(this.addForm.value);

			this.addForm.reset();
		}
	}
}