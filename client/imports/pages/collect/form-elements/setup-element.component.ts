import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Session } from 'meteor/session';

import template from './setup-element.component.html';

@Component({
	selector: 'setup-element',
	template
})


export class SetupElementComponent {
	@Input() teamNum: number;
	@Input() matchNum: number;

  @Output()
  update = new EventEmitter();

  ngOnInit() {
    this.teamNum = null;
    if (!Session.get('matchNum')) {
      this.matchNum = 1;
    } else {
      this.matchNum = Session.get('matchNum');
    }
    this.emit();
  }

  updateMatchNum(event: any) {
    this.matchNum = parseInt(event.target.value);
    Session.set('matchNum', this.matchNum);
    this.emit();
  }
  updateTeamNum(event: any) {
    this.teamNum = parseInt(event.target.value);
    this.emit();
  }
  emit() {
    var out = {
      teamNum: this.teamNum,
      matchNum: this.matchNum,
    }
    this.update.emit(out);
  }

}