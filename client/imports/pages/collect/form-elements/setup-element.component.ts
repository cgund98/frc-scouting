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
  @Input() posNum: number;
  @Input() color: string;
  json;

  @Output()
  update = new EventEmitter();

  ngOnInit() {
    this.json = require('../../../../../test.json');
    this.json = this.json.filter(function (e) {
      return e.comp_level == 'qm';
    });
    this.json = this.json.sort(function(a, b) { return a.match_number - b.match_number });
    this.teamNum = null;
    if (!Session.get('matchNum')) {
      this.matchNum = 1;
    } else {
      this.matchNum = Session.get('matchNum');
    }
    if (!Session.get('posNum')) {
      this.posNum = 1;
    } else {
      this.posNum = Session.get('posNum');
    }
    if (!Session.get('color')) {
      this.color = "blue";
    } else {
      this.color = Session.get('color');
    }
    if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) {
      this.updateTeamNumFromMatchNum();
    // console.log("Match #", this.matchNum);
    }

    this.emit();
  }

  updateMatchNum(event: any) {
    this.matchNum = parseInt(event.target.value);
    Session.set('matchNum', this.matchNum);
    if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) {
      this.updateTeamNumFromMatchNum();
    // console.log("Match #", this.matchNum);
    }
    this.emit();
  }
  updateTeamNum(event: any) {
    this.teamNum = parseInt(event.target.value);
    this.emit();
  }
  updatePosNum(event: any) {
    this.posNum = parseInt(event.target.value);
    Session.set('posNum', this.posNum);
    if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) {
      this.updateTeamNumFromMatchNum();
    // console.log("Match #", this.matchNum);
    }
    this.emit();
  }
  updateColor() {
    this.color = ((this.color == "blue") ? "red" : "blue");
    Session.set('color', this.color);
    if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) {
      this.updateTeamNumFromMatchNum();
    // console.log("Match #", this.matchNum);
    }
    this.emit();
  }

  updateTeamNumFromMatchNum() {
    match = this.json[this.matchNum - 1];
    var blueTeams = match.alliances.blue.team_keys.map(function(e) {
      return parseInt(e.substring(3));
    });
    var redTeams = match.alliances.red.team_keys.map(function(e) {
      return parseInt(e.substring(3));
    });
    if (this.color == 'red') {
      this.teamNum = redTeams[this.posNum - 1];
    } else if (this.color == 'blue') {
      this.teamNum = blueTeams[this.posNum - 1];
    }
  }

  emit() {
    var out = {
      teamNum: this.teamNum,
      matchNum: this.matchNum,
      posNum: this.posNum,
      color: this.color,
    }
    this.update.emit(out);
  }

}