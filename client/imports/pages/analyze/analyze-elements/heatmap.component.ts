import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';

import template from './heatmap.component.html';

import { Matches } from '../../../../../both/collections/matches.collection';

@Component({
  selector: 'heatmap',
  template,
})

export class HeatmapComponent implements OnInit {

  matches;

  @ViewChild('box1') box1: ElementRef;
  @ViewChild('box2') box2: ElementRef;
  box1Count;
  box2Count;

  ngOnInit() {
    this.box1Count=0;
    this.box2Count=0;
    this.matches = Matches.find({}).fetch();
    if (this.matches.length > 0) {
      this.refresh();
    }
  }

  refresh() {
    this.box1Count=0;
    this.box2Count=0;
    this.matches = Matches.find({}).fetch();
    for (var i=0; i < this.matches.length; i++) {
      match = this.matches[i];
      box1Id = this.box1.nativeElement.id;
      box2Id = this.box2.nativeElement.id;
      

      for (var j=0; j < match.runs.length; j++) {
        run = match.runs[j];
        if (run.placeLocation == box1Id) {
          this.box1Count += 1;
        } else if (run.placeLocation == box2Id) {
          this.box2Count += 1;
        }

        if (run.pickUpLocation == box1Id) {
          this.box1Count += 1;
        }else if (run.pickUpLocation == box2Id) {
          this.box2Count += 1;
        }
      }
    }
  }

}