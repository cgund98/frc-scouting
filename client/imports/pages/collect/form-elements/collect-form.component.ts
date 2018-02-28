import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Session } from 'meteor/session';
import { MapLayoutComponent } from './map-layout.component';
import { SetupElementComponent } from './setup-element.component';

import template from './collect-form.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';

@Component({
  selector: 'collect-form',
  template
})
export class CollectFormComponent implements OnInit {

	currentTab = 'setup';
	matchNum;
	teamNum;
	teleop;
	isAuton;

	@ViewChild('map') mapLayout: MapLayoutComponent;
	@ViewChild('setup') setupComponent: SetupElementComponent;
	@ViewChild('setupLink') setupLink: ElementRef;
	// @ViewChild('autonLink') autonLink: ElementRef;
	@ViewChild('teleopLink') teleopLink: ElementRef;
	@ViewChild('stageInput') stageInput: ElementRef;

	constructor() {}

	ngOnInit() {
		this.isAuton = this.stageInput.nativeElement.checked;
	}

	toggleStage(event: any) {
		event.preventDefault();
		this.stageInput.nativeElement.click();
		this.isAuton = this.stageInput.nativeElement.checked;
	}

	updateSetupVariables(event: any) {
		this.matchNum = event.matchNum;
		this.teamNum = event.teamNum;
		if (!this.teamNum) {
			this.teamNum = '??';
		}
	}

	updateTeleopObject(event: any) {
		this.teleop = event;
	}

	changeTab(event: any) {
		if (event.preventDefault) { event.preventDefault(); }
		target = event.target;
		targetName = target.className;
		if ( !target.className.includes(this.currentTab) ) {
			this.currentTab = event.target.className;
			var children = target.parentNode.childNodes;
			var tabs = $('.form-tab');
			children.forEach(function(child) {
				if (child.className) {
					child.className = child.className.replace(' active', '');
				}
			});
			target.className = event.target.className += ' active';
			tabs.removeClass('active');
			tabs.each(function(index, element) {
				//console.log(element.className.includes(this.currentTab));
				if ( element.className.includes(targetName) ) {
					element.className += ' active'
				}
			});
		}
	}

	submitForm(event: any) {
		event.preventDefault();
		var alert = '';
		var isError = false;

		if (this.teamNum == '??') {
			isError = true;
			alert = 'You did not enter a team number.';
		}

		if (isError) {
			window.alert(alert);
			return;
		}

		var match = {
			matchNum: this.matchNum,
			teamNum: this.teamNum,
			totalPickedUp: this.teleop.totalPickedUp,
      totalPlaced: this.teleop.totalPlaced,
      climbed: this.teleop.climbed,
			runs: this.teleop.runs,
			autonLineCrossed: this.teleop.autonLineCrossed,
		}

		Matches.insert(match);
		Session.set('matchNum', this.matchNum + 1);
		this.mapLayout.ngOnInit();
		this.setupComponent.ngOnInit();
		this.setupLink.nativeElement.click();
	}

}