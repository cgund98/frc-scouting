import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app.routes';
import { CollectPageModule } from '../pages/collect/collect-page.module';
import { AnalyzePageModule } from '../pages/analyze/analyze-page.module';
import { MiscModule } from '../misc/misc.module';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CollectPageModule,
    AnalyzePageModule,
    MiscModule,
  ],
  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent
  ],
  providers: [
  {provide: APP_BASE_HREF, useValue : '/' }
  ]
})

export class AppModule {}
