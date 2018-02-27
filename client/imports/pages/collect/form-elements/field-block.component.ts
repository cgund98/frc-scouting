import { Component, Input, OnInit } from '@angular/core';

import template from './field-block.component.html';

@Component({
	selector: 'field-block',
  template,
})

export class FieldBlockComponent implements OnInit {
  @Input() position;

  ngOnInit() {
    if (this.position == "middle") {
      this.sideComponents = "climb";
      this.sideComponentsIcon = "graphics/climb.png";
    } else {
      this.sideComponents = "box-place";
      this.sideComponentsIcon = "graphics/pickup.png";
      console.log(this.position);
    }
  }

  
}