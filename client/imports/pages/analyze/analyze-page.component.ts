import { Meteor } from 'meteor/meteor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PrematchWindowComponent } from './analyze-elements/prematch-window.component';

import template from './analyze-page.component.html';

import { Matches } from '../../../../both/collections/matches.collection';

@Component({
  selector: 'analyze-page',
  template
})

export class AnalyzePageComponent implements OnInit {

    analysisTab;
    matches;
    firstSwitch: boolean = true;

    @ViewChild('prematch') prematchWindow: PrematchWindowComponent;

    ngOnInit() {
        Meteor.subscribe('matches');
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
        if (!this.analysisTab && this.firstSwitch) this.prematchWindow.getEventData(); this.firstSwitch = false;
    }

}
