# Gesture-Based-Video-Chat

![](https://miro.medium.com/max/1400/1*XEu9XT-U1RKmuTtz8k3qMQ.png)

This is a gesture based video chat web app that uses [Agora.io](https://www.agora.io) to set up a WebRTC interface, similar to Google Hangouts, Skype or whichever other video chat platform you prefer, but with the twist of AI! I have added gesture based control with uses computer vision algorithms such as posenet to detect a pose and trigger functions accordingly.


[![Netlify Status](https://api.netlify.com/api/v1/badges/bbef2d65-738d-4409-834a-f6e760e9f8e6/deploy-status)](https://app.netlify.com/sites/posecall/deploys)

## Pre Requisites
- [A simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)
- An SSL certificate or way to have an https connection (I use [ngrok](https://ngrok.com))
- A developer account with [Agora.io](https://www.agora.io)
- An understanding of HTML/CSS/JS 
- A basic understanding of how posenet functions work 
- An understand of how Bootstrap and JQuery functions

## Hosted Demo ##
Coming Soon

## How to Run the Demo ##
To test the video chat app, start a [simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) with a secure connection _(https)_. 

since the AI component functions using tensorflow.js, it runs in the browser itself and required no additional setup. 

All browsers have the `localhost` url Whitelisted as secure, so you can use that to test. 

Once the server is ready we can run our test.

>NOTE: use two (or more) browser tabs to simulate a local host and a single/multiple remote host(s).
