import { Component, Input, OnInit } from '@angular/core';

import template from './map-layout.component.html';

@Component({
	selector: 'map-layout',
  template,
})

export class MapLayoutComponent {

  totalPickedUp;
  totalPlaced;
  climbed;
  runs;
  events;


  ngOnInit() {
    this.totalPickedUp = 0;
    this.totalPlaced = 0;
    this.climbed = false;
    this.runs = [];
    this.events = [];
  }

  blockInteraction(event) {
    if (event.type == 'pickup') { // Interaction was a pickup
      this.totalPickedUp += 1;

    } else if (event.type == 'place') { // Interaction was a place
      run = {};
      run.userError = false;
      run.timePlaced = event.timestamp;
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

      run.placeLocation = event.target;
      run.timeEndured = (run.timePlaced - run.timePickedUp) / 1000;
      this.runs.push(run);
      console.log('Runs: ', this.runs);

    } else if (event.type == 'climb') { // Interaction was a climb
      this.climbed = true;
    }
    this.events.push(event);
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

    this.events.pop();
    console.log('Events: ', this.events);
  }

}