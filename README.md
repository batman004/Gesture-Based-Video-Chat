# PoseCall (Gesture-Based-Video-Chat)

![](https://user-images.githubusercontent.com/58564635/223690137-1d863120-0442-471d-93e3-440e9c4f69bf.jpg)

![](https://user-images.githubusercontent.com/58564635/223690390-8b4d6bb9-7ebc-4908-b0e2-6f602f3cdd23.jpg)


## Introduction
This is a gesture based video chat web app that uses [Agora.io](https://www.agora.io) to set up a WebRTC interface, similar to Google Hangouts, Skype or whichever other video chat platform you prefer, but with the twist of Machine Learning! I have added gesture based control using pre-trained model called PoseNet,for running real-time pose estimation in the browser using TensorFlow.js, and accordingly trigerring the call functions such as mute, unmute, camON and camOff

Use Case Diagram             |  Timeline
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/58564635/198947105-aced970f-08d9-45d2-8028-2d2044d383f4.png)  |  ![](https://user-images.githubusercontent.com/58564635/198948368-a888e5a0-d72f-4ca5-97cf-b93a1ef126db.jpeg)

## Demo Video
 [Link](https://youtu.be/I8tyPYf2_9I)


[![Netlify Status](https://api.netlify.com/api/v1/badges/bbef2d65-738d-4409-834a-f6e760e9f8e6/deploy-status)](https://app.netlify.com/sites/posecall/deploys)


## Pre Requisites
- [A simple web server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)
- A developer account with [agora.io](https://console.agora.io/)
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
