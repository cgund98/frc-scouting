import { Component, Input, OnInit } from '@angular/core';

import template from './map-layout.component.html';

@Component({
	selector: 'map-layout',
  template,
})

export class MapLayoutComponent {

  ngOnInit() {
    this.totalPickedUp = 0;
    this.totalPlaced = 0;
    this.climbed = false;
    this.runs = [];
  }

}