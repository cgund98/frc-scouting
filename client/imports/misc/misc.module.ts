import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EventSelectionComponent } from './event-selection.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
    ],
    declarations: [
        EventSelectionComponent,
    ],
    entryComponents: [
        EventSelectionComponent,
    ],
    exports: [
        EventSelectionComponent,
    ]
})

export class MiscModule {}
