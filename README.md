# PoseCall (Gesture-Based-Video-Chat)

![](https://miro.medium.com/max/1400/1*XEu9XT-U1RKmuTtz8k3qMQ.png)

## Introduction
This is a gesture based video chat web app that uses [Agora.io](https://www.agora.io) to set up a WebRTC interface, similar to Google Hangouts, Skype or whichever other video chat platform you prefer, but with the twist of AI! I have added gesture based control with uses computer vision algorithms such as posenet to detect a pose and trigger functions accordingly.


[![Netlify Status](https://api.netlify.com/api/v1/badges/bbef2d65-738d-4409-834a-f6e760e9f8e6/deploy-status)](https://app.netlify.com/sites/posecall/deploys)


This is a gesture based video chat web app that uses [Agora.io](https://www.agora.io) to set up a WebRTC interface, similar to Google Hangouts, Skype or whichever other video chat platform you prefer, but with the twist of Machine Learning! I have added gesture based control with uses a pre-trained model called PoseNet,for running real-time pose estimation in the browser using TensorFlow.js, and accordingly trigerring the call functions such as mute, unmute, camON and camOff

## Pre Requisites
- [A simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)
- A developer account with [Agora.io](https://www.agora.io)
- An understanding of HTML/CSS/JS 
- A basic understanding of how PoseNet functions work 
- An understand of how Bootstrap and JQuery functions

## Hosted Demo ##
[PoseCall](posecall.netlify.app/)

## How to Run the Demo ##
To test the video chat app, start a [simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) with a secure connection _(https)_. 

### Obtain an App ID
To build and run the sample application, get an App ID:

1. Create a developer account at agora.io. 

2. Once you finish the signup process, you will be redirected to the Dashboard.

3. Navigate in the Dashboard tree on the left to Projects > Project List.

4. Save the App ID from the Dashboard for later use.

5. Generate a temp Access Token (valid for 24 hours) from dashboard page with given channel name, save for later use.

### Next Steps
1. open homepage.html and click on "Try Now".This will redirect you to the video call interface

2. Once you have the App ID and token, enter a channel name, userID and join the channel

3. since the AI component functions using tensorflow.js, it runs in the browser itself and required no additional setup. 

4. All browsers have the `localhost` url Whitelisted as secure, so you can use that to test. 

5. Once the server is ready we can run our test.

>NOTE: use two (or more) browser tabs to simulate a local host and a single/multiple remote host(s).
