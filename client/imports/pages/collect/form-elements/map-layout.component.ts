import { Component, Input, Output, OnInit, EventEmitter, OnChanges } from '@angular/core';

import template from './map-layout.component.html';

@Component({
	selector: 'map-layout',
  template,
})

export class MapLayoutComponent implements OnInit {

  @Input() isAuton: boolean;
  totalPickedUp: number;
  totalPlaced: number;
  climbed: boolean;
  defendedAgainst: boolean;
  missedShot: boolean;
  runs: Array<any>;
  events: Array<any>;
  lineCrossed: boolean;

  @Output()
  update = new EventEmitter();


  ngOnInit() {
    this.totalPickedUp = 0;
    this.totalPlaced = 0;
    this.climbed = false;
    this.defendedAgainst = false;
    this.missedShot = false;
    this.lineCrossed = false;
    this.runs = [];
    this.events = [];
    this.emit();
  }

  skrt() {
    console.log('skrt');
  }
  toggleLineCrossed(event: any) {
    this.lineCrossed = !this.lineCrossed;
  }

  blockInteraction(event: any) { // Interaction with a field-block component
    if (event.type == 'pickup') { // Interaction was a pickup
      this.totalPickedUp += 1;

    } else if (event.type == 'place') { // Interaction was a place
      var run = {};
      run.userError = false;
      run.isAuton = this.isAuton;

      // Check if shot was missed/defendedAgainst and reset the variable
      run.missedShot = this.missedShot;
      run.defendedAgainst = this.defendedAgainst;
      this.missedShot = false;
      this.defendedAgainst = false;

      run.timePlaced = event.timestamp;
      run.placeLocation = event.target;
      this.totalPlaced += 1;

      for (var i = 0; i < this.events.length; i++) {
        var pastEvent = this.events[this.events.length - (1+i)];
        if (pastEvent.type == 'pickup') {
          run.timePickedUp = pastEvent.timestamp;
          run.pickUpLocation = pastEvent.target;
          break;
        } else if (pastEvent.type == 'place') {
          window.alert("You do not have a pickup event before the last dropoff.  You done goofed.");
          run.timePickedUp = NaN;
          run.pickUpLocation = NaN;
          run.userError = true;
          break;
        }
      }

      run.timeElapsed = (run.timePlaced - run.timePickedUp) / 1000;
      this.runs.push(run);
      console.log('Runs: ', this.runs);

    } else if (event.type == 'climb') { // Interaction was a climb
      this.climbed = !this.climbed;
    }
    this.events.push(event);
    this.emit();
  }

  powerUpInteraction(event: any) {
    var run = {};
    run.userError = false;
    run.isAuton = this.isAuton;

    var out = {} // Mimic the update function in field-block.component
    if (event.target.id) {
      out.target = event.target.id;
    } else {
      out.target = event.target.parentElement.id;
    }
    out.timestamp = Date.now();
    out.type = out.target.split('-')[2];

    event = out;

    // Check if shot was missed/defendedAgainst and reset the variable
    run.missedShot = this.missedShot;
    run.defendedAgainst = this.defendedAgainst;
    this.missedShot = false;
    this.defendedAgainst = false;

    run.timePlaced = event.timestamp;
    run.placeLocation = event.target;
    this.totalPlaced += 1;

    for (var i = 0; i < this.events.length; i++) {
      var pastEvent = this.events[this.events.length - (1+i)];
      if (pastEvent.type == 'pickup') {
        run.timePickedUp = pastEvent.timestamp;
        run.pickUpLocation = pastEvent.target;
        break;
      } else if (pastEvent.type == 'place') {
        window.alert("You do not have a pickup event before the last dropoff.  You done goofed.");
        run.timePickedUp = NaN;
        run.pickUpLocation = NaN;
        run.userError = true;
        break;
      }
    }

    run.timeElapsed = (run.timePlaced - run.timePickedUp) / 1000;
    this.runs.push(run);
    console.log('Runs: ', this.runs);

    this.events.push(event);
    this.emit();
  }

  undo() { // Undos the last action
    if (this.events.length == 0) { return; } // Breaks if there are no events

    lastEvent = this.events[this.events.length - 1];

    if (lastEvent.type == 'pickup') { // Last event was a pickup
      this.totalPickedUp -= 1;

    } else if (lastEvent.type == 'place') { // Last event was a place
      this.totalPlaced -= 1;
      this.runs.pop(); // Remove the last run
      console.log('Runs: ', this.runs);

    } else if (lastEvent.type == 'climb') {
      this.climbed = false;
    }

    this.events.pop(); // Removes the last event
    console.log('Events: ', this.events);
    this.emit();
  }

  toggleDefended(event: any) {
    event.preventDefault();
    this.defendedAgainst = !this.defendedAgainst;
    event.target.class;
  }

  toggleMissed(event: any) {
    event.preventDefault();
    this.missedShot = !this.missedShot;
    event.target.class;
  }

  emit() {
    var out = {
      totalPickedUp: this.totalPickedUp,
      totalPlaced: this.totalPlaced,
      climbed: this.climbed,
      runs: this.runs,
      autonLineCrossed: this.lineCrossed,
    }
    this.update.emit(out);
  }

}
