import { Component, OnInit } from '@angular/core';

import template from './analyze-page.component.html';

@Component({
  selector: 'analyze-page',
  template
})

export class AnalyzePageComponent implements OnInit {
  analysisTab;

  ngOnInit() {
    this.analysisTab = true;
  }
  changeTab() {
    this.analysisTab = !this.analysisTab;
  }

}