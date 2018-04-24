#!/bin/bash

EVENT='2018inmis'

curl -H "X-TBA-Auth_Key: 6GAtJKQu3pi8o2MWlrCiil3kCaYONueEAngycXBAc6W5d4FJmdLDEXQ3aznfBd9M" www.thebluealliance.com/api/v3/event/${EVENT}/matches > test.json
