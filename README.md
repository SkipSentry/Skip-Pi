# SkipPi
Use AI to automatically press the skip button for long skipable Youtube ads on your smart TV (currently Roku only). 

**Inspiration:**

YouTube has extremely long skipable ads. I'm all about supporting content creators but there are often better ways to support them other than going through a 5 hour guided meditation ad while you are doing other things in the background. The frustration of having to stop what I am doing to find the remote and skip it myself is what sparked this project.

**How it works:**

SkipPi will take a picture of your screen every 5ish seconds and have the AI inspect the image. If it detects a skip button it will make an HTTP request to your smart TV (currently Roku only) telling it to hit the 'Enter' key which will press the 'Skip Ads' button on a YouTube video. Currently the AI is about 94% accurate and I am working to improve upon it (I'm a programmer dipping into data science stuff for the first time).

Why is it currently Roku only? Well for starters I only have a Roku and not.....every smart TV in existence. Another reason is that Roku has a surprisingly friendly API which makes it easy to make HTTP calls to. 

There is commented out code in ```/api/StartSkip.py```  that will send a message to an Arduino Leonardo which will act as a USB keyboard if you happen to have a Leonardo laying around and a non Roku smart TV.

**Requirements:**
```
-Raspberry Pi (minimuim 3b+, may work on others I only have a 3b+)
-Raspberry Pi Camera Module OR USB WebCam
-MicroSD Card for Raspberry Pi
-Raspberry Pi OS installed on microSD card
-Python installed >= v3.5
```

**Setup:**
```
-Pull this code down from GitHub.

-If downlaoded as a zip file unzip the file in the directory of your choosing.

-Open a terminal and go to the directory you placed this code.

-Run command in the terminal 'pip install requirements.txt'

-Once the above command completes type 'export FLASK_APP = app.py' and hit enter.

-Once the above command completes type 'flask run --host=0.0.0.0' and hit enter.

-It may take a bit to start up, once it does you should see a message like 'Running on port 5000'.

```
The app should now be running on port 5000 at the IP address of the Raspberry Pi (ex: 192.168.1.5:5000) and you should be able to connect to it with a web browser. If you are unsure of your Raspberry Pi's IP address, in a terminal run the _ifconfig_ command.

Once you are in the web app follow the instructions to connect to your smart TV and have piece of mind that you will only have to endure 5 seconds of that 3 hour Christmas concert ad.

**Pi Camera Position:**

Position the camera in the bottom right corner of your smart TV (currently Roku only). Try to get as much of the screen in camera view as possible. It is possible to angle the camera so that it is not blocking the screen. If the AI is not picking up any skip buttons when there are skip buttons try moving the camera to a better position. If you look under the Positions tab in the web app it has more information and examples.


**Future Plans:**

-_Code cleanup and comments._ The AI took a lot more work than I expected so some of the code needs a little tidying up.

-_Android app and standalone server._ I have an Android app about half finished that will do everything SkipPi does without complicated installs or access to a Raspberry Pi. I was thinking of making a standalone AI server to do the actual image predictions that the Android app would talk to. The standalone server can be hosted by the user locally or maybe I'll host one myself out on the internet somewhere who knows.

-_Expand feature sets and UI._ Most of the UI was made so I could keep track of what the AI was doing but I would like to have a camera preview page, maybe a page for logs, and maybe some other things to make life easier.

-_Write an install script._ Instead of manually typing out all the setup.





**Food for thought:**

Pi-Hole is wonderful no doubt about that, but it has always been a cat and mouse game with youtube ads. I was looking around in the Pi-Hole API to see if there could be some way to tell it that the last query was a ad and not a video and to add it to the blocklist. Something like that possibly would be pretty neat if it works.





