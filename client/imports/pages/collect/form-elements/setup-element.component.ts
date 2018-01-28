import { Component, Input } from '@angular/core';

import template from './setup-element.component.html';

@Component({
	selector: 'setup-element',
	template
})

export class SetupElementComponent {
	@Input() teamNum: String;
	@Input() matchNum: String;
}