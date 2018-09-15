import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import template from './setup-element.component.html';

import { Competitions } from '../../../../../both/collections/competitions.collection';

@Component({
	selector: 'setup-element',
	template
})


export class SetupElementComponent {
	@Input() teamNum: number;
	@Input() matchNum: number;
	@Input() posNum: number;
	@Input() color: string;
	json: Array<any>; // Array of matches from TBA

	@Output()
	update = new EventEmitter();

	async ngOnInit() {
		// this.json = require('../../../../../test.json');
		await this.getEventData();
		this.teamNum = null;

		let getSesVar = SessionAmplify.get('matchNum')
		this.matchNum = getSesVar ? getSesVar : 1
		getSesVar = SessionAmplify.get('posNum')
		this.posNum = getSesVar ? getSesVar : 1
		getSesVar = SessionAmplify.get('color')
		this.color = getSesVar ? getSesVar : 'blue';

		if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) this.updateTeamNumFromMatch();

		this.emit();
	}

	async getEventData() {
		// Get match data:
		// Checks to see if there is an entry in local db, if not gets it from TBA
		let event = SessionAmplify.get('competition');
		let eventQuery = Competitions.findOne({name: event});
		this.json = eventQuery ? eventQuery.matches : await Meteor.callPromise('getEventData', event);
		if (!eventQuery) Competitions.insert({name: event, matches: this.json});
		console.log(eventQuery);
		this.json = this.json.filter(function (e) {
		return e.comp_level == 'qm';
		});
		this.json = this.json.sort(function(a, b) { return a.match_number - b.match_number });
	}

	updateMatchNum(event: any) {
		// Update match # from User changing the input element
		this.matchNum = parseInt(event.target.value);
		SessionAmplify.set('matchNum', this.matchNum);
		if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) this.updateTeamNumFromMatch();
		this.emit();
	}
	updateTeamNum(event: any) {
		// Update team # from User changing the input element
		this.teamNum = parseInt(event.target.value);
		this.emit();
	}
	updatePosNum(event: any) {
		// Update position # from User changing the input element
		this.posNum = parseInt(event.target.value);
		SessionAmplify.set('posNum', this.posNum);
		if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) this.updateTeamNumFromMatch();
		this.emit();
	}
	updateColor() {
		// Update color from User changing the button
		this.color = (this.color == "blue") ? "red" : "blue";
		SessionAmplify.set('color', this.color);
		if (this.matchNum > 0 && this.matchNum < this.json.length && this.posNum < 4) this.updateTeamNumFromMatch();
		this.emit();
	}

	updateTeamNumFromMatch() {
		// Update team # from change in any of the other variables, determined from TBA data
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
