import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TASKS_DECLARATIONS } from './tasks';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    ...TASKS_DECLARATIONS
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}