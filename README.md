# Gesture-Based-Video-Chat

![](https://miro.medium.com/max/1400/1*XEu9XT-U1RKmuTtz8k3qMQ.png)

This is a gesture based video chat web app that uses [Agora.io](https://www.agora.io) to set up a WebRTC interface, similar to Google Hangouts, Skype or whichever other video chat platform you prefer, but with the twist of AI! I have added gesture based control with uses a pre-trained model called PoseNet, as well as some for running real-time pose estimation in the browser using TensorFlow.js, and accordingly trigerring call functions
## Pre Requisites
- [A simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)
- An SSL certificate or way to have an https connection (I use [ngrok](https://ngrok.com))
- A developer account with [Agora.io](https://www.agora.io)
- An understanding of HTML/CSS/JS 
- A basic understanding of how PoseNet functions work 
- An understand of how Bootstrap and JQuery functions

## Hosted Demo ##
Coming Soon

## How to Run the Demo ##
To test the video chat app, start a [simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) with a secure connection _(https)_. 

### Obtain an App ID
To build and run the sample application, get an App ID:

Create a developer account at agora.io. 

Once you finish the signup process, you will be redirected to the Dashboard.

Navigate in the Dashboard tree on the left to Projects > Project List.

Save the App ID from the Dashboard for later use.

Generate a temp Access Token (valid for 24 hours) from dashboard page with given channel name, save for later use.

### Next Steps
1. open homepage.html and click on "Try Now".This will redirect you to the video call interface

2. Once you have the App ID and token, enter a channel name, userID and join the channel

3. since the AI component functions using tensorflow.js, it runs in the browser itself and required no additional setup. 

4. All browsers have the `localhost` url Whitelisted as secure, so you can use that to test. 

5. Once the server is ready we can run our test.

>NOTE: use two (or more) browser tabs to simulate a local host and a single/multiple remote host(s).
