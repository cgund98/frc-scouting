import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

import { Competitions } from '../both/collections/competitions.collection';
import { Matches } from '../both/collections/matches.collection';

const clientDir = Meteor.absolutePath + "/../frc-scouting-visualize";
// const simpleGit = require('simple-git')(clientDir); // Set in settings.json
const fs = require('fs');

Meteor.methods({
    'getEventData'(event:string) {
        // Get matches for event from the Blue Alliance API
        let url = "https://www.thebluealliance.com/api/v3/event/" + event + "/matches";
        let options = {
            headers: {
                'X-TBA-Auth_Key': '6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M',
            }
        }
        try {
            return HTTP.call('GET', url, options).data;
        } catch (err) {
            console.log('Can\'t pull match data, network error');
            return [];
        }
    }
})

Meteor.publish('competitions', function competitionsPublication() {
    return Competitions.find({});
});
Meteor.publish('matches', function matchesPublication() {
    return Matches.find({});
});

SyncedCron.add({
    // Cron job to sync gh pages version
    name: 'Sync data with gh pages version',
    schedule: function(parser) {
    // parser is a later.parse object
        return parser.text('every 10 minutes');
    },
    job: function() {
        // return "yeet";
        let comps = Competitions.find({}).fetch();
        let matches = Matches.find({}).fetch();
        fs.writeFile(clientDir + "/src/assets/data/competitions.json", JSON.stringify(comps), function(err) {
            if (err) {
                console.log(err);
            }
        });
        fs.writeFile(clientDir + "/src/assets/data/matches.json", JSON.stringify(matches), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
});

Meteor.startup(() => {
    SyncedCron.start();
    // simpleGit.status((status) => {console.log(status)})

    console.log(clientDir)
});
