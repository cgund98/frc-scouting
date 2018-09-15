import { Component, OnInit, Input, Output, EventEmitter,
         OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import template from './prematch-block.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';

@Component({
  selector: 'prematch-block',
  template
})

export class PrematchBlockComponent implements OnInit {

  matches;
  @Input() teamNum: number;
  @Input() color: string;

  @Output() update = new EventEmitter();

  autonRows = [{propName: "Click me!"},];
  teleopRows;

  autonColumns = [
  { name: '<p>Auton</p>',
    prop: 'propName', width: 85 },
  { name: 'Fails', prop: 'fails', width: 75 },
  { name: 'Singles', prop: 'singles', width: 75 },
  { name: 'Multi', prop: 'multis', width: 75 },
  ];

  teleopColumns = [
  { name: '<p>Teleop</p>', prop: 'location', width: 85 },
  { name: 'Avg', prop: 'average', width: 75 },
  { name: 'Eff', prop: 'efficiency', width: 75 },
  { name: 'Max', prop: 'max', width: 75 },
  ];

  ngOnInit() {
    this.matches = Matches.find({}).fetch();
    if (this.matches.length > 0) {
      this.refresh();
    }
  }

  updateTeamNum(event: any) {
    this.teamNum = parseInt(event.target.value);
    this.refresh();
    this.emit();
  }

  emit() {
    var out = {
      teamNum: this.teamNum
    };
    this.update.emit(out);
  }

  ngOnChanges() {
    this.refresh();
  }

  refresh() {

    var teamStats = this.getTeamStats();

    if (teamStats.missing) {
      autonRows = [
      { propName: 'Missing!' },
      { propName: 'Missing!' },
      { propName: 'Missing!' },
      ];
      teleopRows = [
      { location: 'Missing!' },
      { location: 'Missing!' },
      { location: 'Missing!' },
      ];
      this.autonRows = autonRows;
      this.teleopRows = teleopRows;
      return;
    }

    this.autonRows = this.getAutonRows(teamStats);
    this.teleopRows = this.getTeleopRows(teamStats);
  }

  getTeamStats() {
    this.matches = Matches.find({}).fetch();

    var teamStats = {
      missing: true,
      matchesPlayed: 1,
      totalPickedUp: 0,
      totalPlaced: 0,
      climbs: 0,
      totalPlaced: 0,
      lowTeleopPlaced: 0,
      highTeleopPlaced: 0,
      lowAutonPlaced: 0,
      lowAutonSingles: 0,
      lowAutonMultis: 0,
      lowAutonFails: 0,
      highAutonSingles: 0,
      highAutonMultis: 0,
      highAutonFails: 0,
      highAutonPlaced: 0,
      lowTeleopMissed: 0,
      highTeleopMissed: 0,
      lowAutonMissed: 0,
      highAutonMissed: 0,
      runs: 0,
      autonLineCrosses: 0,
      runTimes: [],
    };

    for (var i=0; i < this.matches.length; i++) {
      var match = this.matches[i];
      var matchLowAuton, matchHighAuton, matchLowAutonFails, matchHighAutonFails = 0;

      if (this.teamNum == match.teamNum ) {
        teamStats.missing = false;
        teamStats.matchesPlayed += 1;
        teamStats.totalPickedUp += match.totalPickedUp;
        teamStats.runs += match.runs.length;
        teamStats.autonLineCrosses += ((match.autonLineCrossed) ? 1 : 0);

        if (match.climbed) {
          teamStats.climbs += 1;
        }
        if (!teamStats.runTimes) {
          teamStats.runTimes = [];
        }

        for (var k=0; k < match.runs.length; k++) {
          var run = match.runs[k];
          if (!run.missedShot) {
            if (run.placeLocation.includes('middle')) {
              if (run.isAuton) {
                teamStats.highAutonPlaced +=1;
                matchHighAuton += 1;
              } else {
                teamStats.highTeleopPlaced += 1;
              }
            } else {
              if (run.isAuton) {
                teamStats.lowAutonPlaced +=1;
                matchLowAuton +=1;
              } else {
                teamStats.lowTeleopPlaced += 1;
              }
            }
          } else {
            if (run.placeLocation.includes('middle')) {
              if (run.isAuton) {
                teamStats.highAutonMissed +=1;
                matchHighAutonFails += 1;
              } else {
                teamStats.highTeleopMissed += 1;
              }
            } else {
              if (run.isAuton) {
                teamStats.lowAutonMissed +=1;
                matchLowAutonFails += 1;
              } else {
                teamStats.lowTeleopMissed += 1;
              }
            }
          }

          if (run.timeElapsed) {
            teamStats.runTimes.push(run.timeElapsed);
          }
        }
      }

      teamStats.highAutonSingles += ((matchHighAuton == 1) ? 1: 0);
      teamStats.highAutonMultis += ((matchHighAuton > 1) ? 1: 0);
      teamStats.highAutonFails += ((matchHighAutonFails > 0 && matchHighAuton == 0 && matchHighAuton == 0) ? 1 : 0);
      teamStats.lowAutonSingles += ((matchLowAuton == 1) ? 1: 0);
      teamStats.lowAutonMultis += ((matchLowAuton > 1) ? 1: 0);
      teamStats.lowAutonFails += ((matchLowAutonFails > 0 && matchLowAuton == 0 && matchLowAuton == 0) ? 1 : 0);
    }
    return teamStats;
  }

  getAutonRows(teamStats) {

    var switchRow = {
      propName: 'Switch',
      fails: teamStats.lowAutonFails,
      singles: teamStats.lowAutonSingles,
      multis: teamStats.lowAutonMultis,
    };
    var scaleRow = {
      propName: 'Scale',
      fails: teamStats.highAutonFails,
      singles: teamStats.highAutonSingles,
      multis: teamStats.highAutonMultis,
    };
    var lineRow = {
      propName: 'Line',
      fails: teamStats.matchesPlayed - teamStats.autonLineCrosses,
      singles: teamStats.autonLineCrosses,
    };

    var rows = [switchRow, scaleRow, lineRow];
    return rows;
  }

  getTeleopRows(teamStats) {

    var highTeleopTotal = teamStats.highTeleopPlaced + teamStats.highTeleopMissed;
    var lowTeleopTotal = teamStats.lowTeleopPlaced + teamStats.lowTeleopMissed;

    var switchRow = {
      location: 'Switch',
      average: parseFloat(teamStats.lowTeleopPlaced) / teamStats.matchesPlayed,
      efficiency: parseFloat(teamStats.lowTeleopPlaced) / lowTeleopTotal,
    };
    var scaleRow = {
      location: 'Scale',
      average: parseFloat(teamStats.highTeleopPlaced) / teamStats.matchesPlayed,
      efficiency: parseFloat(teamStats.highTeleopPlaced) / highTeleopTotal,
    };
    var climbRow = {
      location: 'Climbs',
      average: teamStats.climbs,
    };

    var rows = [switchRow, scaleRow, climbRow];
    return rows;
  }

}
