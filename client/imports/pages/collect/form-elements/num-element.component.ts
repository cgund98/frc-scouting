import { Component, Input } from '@angular/core';

import template from './num-element.component.html';

@Component({
	selector: 'num-element',
	template
})

export class NumElementComponent {
	@Input() name: String;
	@Input() formName: String;
	val = 0;

	addValue() {
		this.val += 1;
	}
	subtractValue() {
		if (this.val > 0) {
			this.val -= 1;
		}
	}
}