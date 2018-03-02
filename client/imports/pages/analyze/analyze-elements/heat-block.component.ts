import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';

import template from './heat-block.component.html';


@Component({
  selector: 'heat-block',
  template,
})

export class HeatBlockComponent implements OnInit {
  @Input() position;
  @Input() matches;
  sideComponents;
  sideComponentsIcon;

  @ViewChild('box1') box1: ElementRef;
  @ViewChild('box2') box2: ElementRef;
  @ViewChild('box3') box3: ElementRef;
  @ViewChild('box4') box4: ElementRef;
  box1Count;
  box2Count;
  box3Count;
  box4Count;

  ngOnInit() {
    this.box1Count=0;
    this.box2Count=0;
    this.box3Count=0;
    this.box4Count=0;
    if (this.position == "middle") {
      this.sideComponents = "climb";
      this.sideComponentsIcon = "graphics/climb.png";
    } else {
      this.sideComponents = "pickup";
      this.sideComponentsIcon = "graphics/pickup.png";
    }
    this.ngOnChanges();
  }

  ngOnChanges() {
    this.box1Count=0;
    this.box2Count=0;
    this.box3Count=0;
    this.box4Count=0;
    for (var i=0; i < this.matches.length; i++) {
      match = this.matches[i];
      box1Id = this.box1.nativeElement.id;
      box2Id = this.box2.nativeElement.id;
      box3Id = this.box3.nativeElement.id;
      box4Id = this.box4.nativeElement.id;
      

      for (var j=0; j < match.runs.length; j++) {
        run = match.runs[j];
        if (run.placeLocation == box1Id) {
          this.box1Count += 1;
        } else if (run.placeLocation == box2Id) {
          this.box2Count += 1;
        } else if (run.placeLocation == box3Id) {
          this.box3Count += 1;
        } else if (run.placeLocation == box4Id) {
          this.box4Count +=1;
        }

        if (run.pickUpLocation == box1Id) {
          this.box1Count += 1;
        }else if (run.pickUpLocation == box2Id) {
          this.box2Count += 1;
        } else if (run.pickUpLocation == box3Id) {
          this.box3Count += 1;
        } else if (run.pickUpLocation == box4Id) {
          this.box4Count += 1;
        }
      }
    }
  }



}