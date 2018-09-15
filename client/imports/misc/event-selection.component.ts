import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Competitions } from '../../../both/collections/competitions.collection';

import template from './event-selection.component.html';

@Component({
    selector: 'event-selection',
    template
})

export class EventSelectionComponent implements OnInit {

    openValue: boolean = false;
    @Output() openChange = new EventEmitter();

    competition = new FormControl('', Validators.required);
    currentComp: string;

    @Input()
    get open() {
        return this.openValue;
    }

    set open(val) {
        this.openValue = val;
        this.openChange.emit(this.openValue);
    }

    ngOnInit() {
        this.currentComp = SessionAmplify.get("competition");
    }

    test() {
        console.log(this.openValue);
    }

    change() {
        if (this.competition.invalid) {console.log('invalid');return}
        let res = Competitions.findOne({name: this.competition.value});
        SessionAmplify.set("competition", this.competition.value)
        this.currentComp = this.competition.value;
        this.open = false;

    }

}
