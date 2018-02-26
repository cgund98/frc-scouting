import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

import template from './collect-form.component.html';

@Component({
  selector: 'collect-form',
  template
})
export class CollectFormComponent {

	formElements = ['team-number', 'match-number', 'scale-boxes', 'switch-boxes', 'climbed', 'auton-scale-boxes', 'auton-switch-boxes'];


	currentTab = 'setup';

	changeTab(event: any) {
		event.preventDefault();
		var target = event.target;
		var targetName = target.className;
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
		var formSelectors = [];
		var formVals = {};
		var alert = '';
		var error = false;

		this.formElements.forEach(function(el) {
			formSelectors.push('.' + el);
			var elValue = $('.'+el)[0].value;
			if ( elValue == 'on') {
				formVals[el] = $('.'+el)[0].checked;
			} else if(elValue === '') {
				alert = 'Match setup not completed';
				error = true;
			} else {
				formVals[el] = parseInt(elValue);
			}
		});
		//console.log(this.formElements);
		//console.log(formSelectors);
		console.log(formVals);
		if (error) {
			window.alert(alert);
			return;
		}
	}

}