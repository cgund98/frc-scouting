import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import template from './app.component.html';

@Component({
    selector: 'app',
    template
})

export class AppComponent {
    eventSelectionOpen: boolean;

    constructor() {}

}
