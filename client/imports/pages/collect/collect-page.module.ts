import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollectPageComponent } from './collect-page.component';

@NgModule({
	imports: [
		BrowserModule,
	],
	declarations: [
		CollectPageComponent,
	],
	entryComponents: [
		CollectPageComponent,
	],
	exports: [
		CollectPageComponent,
	]
})

export class CollectPageModule {}