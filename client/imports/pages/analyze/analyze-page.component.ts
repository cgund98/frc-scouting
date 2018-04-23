import { Component, OnInit } from '@angular/core';

import template from './analyze-page.component.html';

import { Matches } from '../../../../both/collections/matches.collection';

@Component({
  selector: 'analyze-page',
  template
})

export class AnalyzePageComponent implements OnInit {
  analysisTab;
  matches;


  ngOnInit() {
    this.analysisTab = true;
    var i = 0;
    while(true) {
      this.matches = Matches.find({}).fetch();
      if (this.matches.length > 0 || i > 10000) {
        console.log('Loaded...');
        break;
      }
      i++;
    }
  }
  changeTab() {
    this.analysisTab = !this.analysisTab;
  }

}