# FRC Scouting - Local Edition

This is the local version of FRC Scouting.  The app is a UI/UX focused scouting app for collection data on teams in FIRST FRC Robotics competitions.  While the app is primarily run on local host machine, there is also a [Github Pages version](https://github.com/cgund98/frc-scouting-visualize/) that can be viewed from any machine on the web.

## Features

1.  Collection page: 
  1.  Automatic team selection:  Every time you select a competition for the first time, the app needs an internet connection, and will pull event data from The Blue Alliance.  Afterwards, the data will be stored locally and no connection is necessary.  Team # will automatically be determined from the other variables, so setup will need to happen once and will automatically select info for the next match!
  2.  Intuitive Collection:  The data collection is done through an intuitive map.  You essentially click where the robot interacts with the field, toggle certain buttons if necessary, and that's it!

2.  Analysis page:
  1.  Simple table with sortable categories
  2.  Prematch window (with automatic team selection):  Simply set the match # and it will display important data for each team.  Incredibly useful for prematch strategizing

3.  While this app is run locally, there is a second version of the app (only the analysis part) that runs on Github Pages.  That means that anyone can analyze the data on any machine!  Note that for the local and gh pages to work, you will need to have the host machine connected to the internet.  See [here](https://github.com/cgund98/frc-scouting-visualize/) for more info

4.  Pretty UI :)


## Prerequisites

1.  A host pc running an OS with bash.  I use Ubuntu LTS.
2.  A host pc with Meteor installed.  Find installation instructions [here](https://www.meteor.com/install)

## Setup

The GHP version and the local version of the app are closely dependent on one another.  
1.  Clone the repo. If you are also using the GHP version, you will need both apps and to clone them in the same directory.  I keep my apps as `~/Coding/frc-scouting` and `~/Coding/frc-scouting-visualize`.
3.  Run `meteor` to install everything and start the server. 
4.  Now to connect other machines to the app (we need 6 total machines to scout every team every match) you will need to connect them to the same network.  You aren't allowed to use a wireless connection at a FIRST event, so we use Ethernet and a switch.  
5.  Once the machines are on the same network, find the IP of the host machine.  On linux, this is done with `ifconfig`.  The other machines will be able to go to `http://<host_machine_ip>:3000/` to connec to the app.
6.  That's it!

## Development server

Run `meteor` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Further help

If you have any suggestions, feel free to [contact me](mailto:gundlachcallum@gmail.com)!  Take a look through the code if you want, though comments are fairly sparse as I worked on this project all by myself.  
