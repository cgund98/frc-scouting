import { Component, Input } from '@angular/core';

import template from './toggle-element.component.html';

@Component({
	selector: 'toggle-element',
	template
})

export class ToggleElementComponent {
	@Input() name: String;
	@Input() formName: String;
	selected = false;

	toggle(event: any) {
		if (this.selected) {
			if (event.target.className.includes("yes")) {
				event.preventDefault();
			} else {
				this.selected = !this.selected;
				var children = event.target.parentNode.childNodes;
				children.forEach(function(child) {
					if (child.className) {
						child.className = child.className.replace(' active', '');
					}
				});
				event.target.className = event.target.className += ' active';
			}
		} else {
			if (event.target.className.includes("yes")) {
				this.selected = !this.selected;
				var children = event.target.parentNode.childNodes;
				children.forEach(function(child) {
					if (child.className) {
						child.className = child.className.replace(' active', '');
					}
				});
				event.target.className = event.target.className += ' active';
			} else {
				event.preventDefault()
			}
		}
		$("."+this.formName).prop('checked', this.selected);
	}
}