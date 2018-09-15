import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'

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
            window.alert('Can\'t pull match data, network error');
            return [];
        }
    }
})

Meteor.startup(() => {
  // code to run on server at startup
});
