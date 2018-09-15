import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { Competitions } from '../../../both/collections/competitions.collection';

import template from './app.component.html';

@Component({
    selector: 'app',
    template
})

export class AppComponent implements OnInit {

    eventSelectionOpen: boolean;
    ready: boolean = false;

    constructor(private router: Router) {}

    ngOnInit() {
        function checkForData(router) {
            console.log('Checking...');
            if (Meteor.user()) {
                return true;
            }
            return false;
        }
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function waitForData(handles) {
            for (var i=0; i < 1000; i++ ) {
                var ready = true;
                Tracker.autorun(() => {
                  handles.map(handle => {
                      if (ready) {ready = handle.ready()}
                      // console.log(ready);
                  })
                });
                if (ready) {return true};
                await sleep(10);
            }
            window.alert("Connection timed out.");
        }
        if (true) {
            const cHandle = Meteor.subscribe('competitions');
            this.ready = waitForData([cHandle]).then(function() {
                var url = this.router.url;
                console.log(url);
                let navUrl = url == '/' ? '/collect' : '/';
                this.router.navigateByUrl(navUrl, {skipLocationChange: true}).then(()=>
                this.router.navigate([url]));
            }.bind(this));
        }
    }

}
