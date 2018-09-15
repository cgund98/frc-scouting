import { Meteor } from 'meteor/meteor';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PrematchBlockComponent } from './prematch-block.component';

import template from './prematch-window.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';
import { Competitions } from '../../../../../both/collections/competitions.collection';

@Component({
    selector: 'prematch-window',
    template
})

export class PrematchWindowComponent implements OnInit {

    json: Array<any>;
    matchNum: number = 1;
    blueTeam1: number; blueTeam2: number; blueTeam3: number;
    redTeam1: number; redTeam2: number; redTeam3: number;

    @ViewChild('blueBlock1') blueBlock1: PrematchBlockComponent;

    async ngOnInit() {
    }

    async getEventData() {
        let event = SessionAmplify.get('competition');
        let eventQuery = Competitions.findOne({name: event});
        this.json = eventQuery ? eventQuery.matches : await Meteor.callPromise('getEventData', event);
        if (!eventQuery) Competitions.insert({name: event, matches: this.json});
        console.log(eventQuery);
        this.json = this.json.filter(function (e) {
            return e.comp_level == 'qm';
        });
        this.json = this.json.sort(function(a, b) { return a.match_number - b.match_number });
        this.updateBlocks();
    }

    updateMatchNum(event: any) {
        this.matchNum = parseInt(event.target.value);
        if (this.matchNum > 0 && this.matchNum < this.json.length) {
            this.updateBlocks();
            // console.log("Match #", this.matchNum);
        }
    }

    updateBlocks() {
        match = this.json[this.matchNum - 1];

        var blueTeams = match.alliances.blue.team_keys.map(function(e) {
            return parseInt(e.substring(3));
        });

        var redTeams = match.alliances.red.team_keys.map(function(e) {
            return parseInt(e.substring(3));
        });

        this.blueTeam1 = blueTeams[0];
        this.blueTeam2 = blueTeams[1];
        this.blueTeam3 = blueTeams[2];
        this.redTeam1 = redTeams[0];
        this.redTeam2 = redTeams[1];
        this.redTeam3 = redTeams[2];

    }
}
