import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollectPageComponent } from './collect-page.component';

import { COLLECT_FORM_DECLARATIONS } from './form-elements';

@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		CollectPageComponent,
		...COLLECT_FORM_DECLARATIONS,
	],
	entryComponents: [
		CollectPageComponent,
	],
	exports: [
		CollectPageComponent,
	]
})

export class CollectPageModule {}