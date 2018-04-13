import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import template from './analyze-window.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';

@Component({
  selector: 'analyze-window',
  template
})

export class AnalyzeWindowComponent implements OnInit {

  matches;

  rows = [
    {teamNum: "Please click to refresh"}
  ];
  columns = [
    { name: 'Team Number', prop: 'teamNum', width: 150,
      height: 50, },
    { name: 'Total Placed', prop: 'totalPlaced', width: 150,
      height: 50, },
    { name: 'High Placed', prop: 'highPlaced', width: 150,
      height: 50, },
    { name: 'Low Placed', prop: 'lowPlaced', width: 150,
      height: 50, },
    { name: 'Auton High', prop: 'highAutonPlaced', width: 75},
    { name: 'Auton Low', prop: 'lowAutonPlaced', width: 75, },
    { name: 'Climbs', prop: 'climbs', width: 100,
      height: 50, },
      { name: 'Avg. Run Time', prop: 'avgRunTime', width: 150,
      height: 50, },
      { name: 'Matches', prop: 'matchesPlayed', width: 100 },
  ];

  ngOnInit() {
    this.matches = Matches.find({}).fetch();
    if (this.matches.length > 0) {
      this.refresh();
    }
  }

  refresh() {
    this.matches = Matches.find({}).fetch();

    var teamStats = [];

    for (var i=0; i < this.matches.length; i++) {
      var match = this.matches[i];
      var teamFound = false;

      for (var j=0; j < teamStats.length; j++) {
        var team = teamStats[j];
        if (team.teamNum == match.teamNum ) {
          teamFound = true;
          team.matchesPlayed += 1;
          team.totalPickedUp += match.totalPickedUp;
          team.runs += match.runs.length;
          if (match.climbed) {
            team.climbs += 1;
          }
          if (!team.runTimes) {
            team.runTimes = []
          }

          for (var k=0; k < match.runs.length; k++) {
            var run = match.runs[k];
            if (!run.missedShot) {
              team.totalPlaced += 1;
              if (run.placeLocation.includes('middle')) {
                team.highPlaced += 1;
              } else {
                team.lowPlaced += 1;
              }
            }

            if (run.timeElapsed) {
              team.runTimes.push(run.timeElapsed);
            }
          }
        }
      }
      if (!teamFound) {
        var team = {};
        team.teamNum = match.teamNum;
        team.matchesPlayed = 1;
        team.totalPickedUp = match.totalPickedUp;
        team.totalPlaced = match.totalPlaced;
        team.climbs = 0;
        team.totalPlaced = 0;
        team.lowPlaced = 0;
        team.highPlaced = 0;
        team.lowAutonPlaced = 0;
        team.highAutonPlaced = 0;
        team.runs = match.runs.length;
        if (match.climbed) {
          team.climbs += 1;
        }
        if (!team.runTimes) {
          team.runTimes = []
        }

        for (var k=0; k < match.runs.length; k++) {
          var run = match.runs[k];
          if (!run.missedShot) {
            team.totalPlaced += 1;
            if (run.placeLocation.includes('middle')) {
              team.highPlaced += 1;
              if (run.isAuton) {
                team.highAutonPlaced +=1;
              }
            } else {
              team.lowPlaced += 1;
              if (run.isAuton) {
                team.lowAutonPlaced +=1;
              }
            }
          }

          if (run.timeElapsed) {
            team.runTimes.push(run.timeElapsed);
          }
        }
        teamStats.push(team);
      }

    }

    var rows = [];

    for (var i=0; i < teamStats.length; i++) {
      var row = {};
      var teamStat = teamStats[i];
      row.totalPlaced = teamStat.totalPlaced;
      row.climbs = teamStat.climbs;
      row.teamNum = teamStat.teamNum;
      row.lowPlaced = teamStat.lowPlaced;
      row.highPlaced = teamStat.highPlaced;
      row.lowAutonPlaced = teamStat.lowAutonPlaced;
      row.highAutonPlaced = teamStat.highAutonPlaced;
      row.matchesPlayed = teamStat.matchesPlayed;

      var totalTimes = 0;
      for (var j=0; j < teamStat.runTimes.length; j++) {
        totalTimes += teamStat.runTimes[j];
      }
      row.avgRunTime = Math.round(totalTimes / teamStat.runTimes.length * 10) / 10;
      rows.push(row);
    }
    this.rows = rows;
  }

}