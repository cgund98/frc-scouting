import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import template from './field-block.component.html';

@Component({
	selector: 'field-block',
  template,
})

export class FieldBlockComponent implements OnInit {
  @Input() position;
  sideComponents;
  sideComponentsIcon;

  @Output()
  change = new EventEmitter();


  ngOnInit() {
    if (this.position == "middle") {
      this.sideComponents = "climb";
      this.sideComponentsIcon = "graphics/climb.png";
    } else {
      this.sideComponents = "pickup";
      this.sideComponentsIcon = "graphics/pickup.png";
    }
  }

  interaction(event) {
    out = {};
    if (event.target.id) {
      out.target = event.target.id;
    } else {
      out.target = event.target.parentElement.id;
    }
    out.timestamp = Date.now();
    out.type = out.target.split('-')[2];

    this.change.emit(out);
  }

  
}