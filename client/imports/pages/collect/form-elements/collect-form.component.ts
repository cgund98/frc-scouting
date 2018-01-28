import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit} from '@angular/core';

import template from './collect-form.component.html';

@Component({
  selector: 'collect-form',
  template
})
export class CollectFormComponent {

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
}