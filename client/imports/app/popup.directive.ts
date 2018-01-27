import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[popup-host]',
})

export class PopupDirective {
	constructor(public viewContainerRef: ViewContainerRef) { }
}