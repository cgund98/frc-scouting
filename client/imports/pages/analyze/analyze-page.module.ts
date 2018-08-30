import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyzePageComponent } from './analyze-page.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { ANALYZE_ELEMENTS_DECLARATIONS } from './analyze-elements';

@NgModule({
  imports: [
    BrowserModule,
    NgxDatatableModule,
    NgxPaginationModule,
  ],
  declarations: [
    AnalyzePageComponent,
    ...ANALYZE_ELEMENTS_DECLARATIONS,
  ],
  entryComponents: [
    AnalyzePageComponent,
  ],
  exports: [
    AnalyzePageComponent,
  ]
})

export class AnalyzePageModule {}
