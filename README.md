# FRC Scouting - Local Edition

This is the local version of FRC Scouting.  The app is a UI/UX focused scouting app for collection data on teams in FIRST FRC Robotics competitions.  While the app is primarily run on local host machine, there is also a [Github Pages version](https://github.com/cgund98/frc-scouting-visualize/) that can be viewed from any machine on the web.

## Prerequisites

1.  An OS with bash.  I use Ubuntu LTS.
2.  Meteor.js.  Find installation instructions [here](https://www.meteor.com/install)

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
