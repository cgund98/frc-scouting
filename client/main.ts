import 'zone.js';
import 'reflect-metadata';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './imports/app/app.module';

SessionAmplify = _.extend({}, Session, {
    keys: _.object(_.map(amplify.store(), function(value, key) {
        return [key, JSON.stringify(value)]
    })),
    set: function (key, value) {
        Session.set.apply(this, arguments);
        amplify.store(key, value);
    },
});

Meteor.startup(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});
