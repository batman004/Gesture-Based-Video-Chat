// url for hosted pre-trained machine learning model
const URL = "https://teachablemachine.withgoogle.com/models/515-mqdK-/";
let model, webcam, ctx, labelContainer, maxPredictions;

// global variables for accessing videostream

let globalStream;

// Agora RTC Client declare
let client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });


// auto upload logs
AgoraRTC.Logger.enableLogUpload(); 


function initClientAndJoinChannel(agoraAppId, token, channelName, uid) {
    // initialise client 
    client.init(agoraAppId, function () {
        console.log("AgoraRTC client initialized");
        // join channel upon successfull init
        joinChannel(channelName, uid, token); 
    }, function (err) {
        console.log("[ERROR] : AgoraRTC client init failed", err);
    });
}


// Local client added to call

client.on('stream-published', function (evt) {
    console.log("Publish local stream successfully");
  });
  
// connect remote streams (addding other users )

client.on('stream-added', function (evt) {
    var stream = evt.stream;
    var streamId = stream.getId();
    console.log("new stream added: " + streamId);
    // Check if the stream is local
    if (streamId != localStreams.screen.id) {
        console.log('subscribed to remote stream:' + streamId);
        // Subscribe to the stream.
        client.subscribe(stream, function (err) {
        console.log("[ERROR] : subscribe stream failed", err);
        });
    }
});

// subscribe to stream. if the full screen div is empty then add new user to full screen  
client.on('stream-subscribed', function (evt) {
    var remoteStream = evt.stream;
    var remoteId = remoteStream.getId();
    remoteStreams[remoteId] = remoteStream;
    console.log("Subscribe remote stream successfully: " + remoteId);
    if( $('#full-screen-video').is(':empty') ) { 
        mainStreamId = remoteId;
        remoteStream.play('full-screen-video');
        $('#main-stats-btn').show();
        $('#main-stream-stats-btn').show();
    } else if (remoteId == 49024) {
        // move the current main stream to miniview
        remoteStreams[mainStreamId].stop(); // stop the main video stream playback
        client.setRemoteVideoStreamType(remoteStreams[mainStreamId], 1); // subscribe to the low stream
        addRemoteStreamMiniView(remoteStreams[mainStreamId]); // send the main video stream to a container
        // set the screen-share as the main 
        mainStreamId = remoteId;
        remoteStream.play('full-screen-video');
    } else {
        client.setRemoteVideoStreamType(remoteStream, 1); // subscribe to the low stream
        addRemoteStreamMiniView(remoteStream);
    }
});

client.on("peer-leave", function(evt) {
    var streamId = evt.stream.getId(); // the the stream id
    if(remoteStreams[streamId] != undefined) {
      remoteStreams[streamId].stop(); // stop playing the feed
      delete remoteStreams[streamId]; // remove stream from list
      if (streamId == mainStreamId) {
        var streamIds = Object.keys(remoteStreams);
        var randomId = streamIds[Math.floor(Math.random()*streamIds.length)]; // select from the remaining streams
        remoteStreams[randomId].stop(); // stop the stream's existing playback
        var remoteContainerID = '#' + randomId + '_container';
        $(remoteContainerID).empty().remove(); // remove the stream's miniView container
        remoteStreams[randomId].play('full-screen-video'); // play the random stream as the main stream
        mainStreamId = randomId; // set the new main remote stream
      } else {
        var remoteContainerID = '#' + streamId + '_container';
        $(remoteContainerID).empty().remove(); // 
      }
    }
});


// show mute icon whenever a remote has muted their mic
client.on("mute-audio", function (evt) {
    toggleVisibility('#' + evt.uid + '_mute', true);
  });
  
client.on("unmute-audio", function (evt) {
    toggleVisibility('#' + evt.uid + '_mute', false);
});

// show user icon whenever a remote has disabled their video
client.on("mute-video", function (evt) {
    var remoteId = evt.uid;
    // if the main user stops their video select a random user from the list
    if (remoteId != mainStreamId) {
    // if not the main vidiel then show the user icon
        toggleVisibility('#' + remoteId + '_no-video', true);
    }
});

client.on("unmute-video", function (evt) {
    toggleVisibility('#' + evt.uid + '_no-video', false);
});

  
// join a channel
function joinChannel(channelName, uid, token) {
    client.join(token, channelName, uid, function(uid) {
        console.log("User " + uid + " join channel successfully");
        createCameraStream(uid);
        localStreams.camera.id = uid; // keep track of the stream uid 
    }, function(err) {
        console.log("[ERROR] : join channel failed", err);
    });
  }

// video streams for channel
function createCameraStream(uid) {
    var localStream = AgoraRTC.createStream({
      streamID: uid,
      audio: true,
      video: true,
      // screen: false
    });
    localStream.setVideoProfile(cameraVideoProfile);
    localStream.init(function() {
      console.log("getUserMedia successfully");
  
      localStream.play('local-video'); // play the given stream within the local-video div
  
      //take shared variable here; ref for local stream 
      globalStream=localStream;
  
      // publish local stream
      client.publish(localStream, function (err) {
        console.log("[ERROR] : publish local stream error: " + err);
      });
    
      enableUiControls(localStream); // move after testing
      localStreams.camera.stream = localStream; // keep track of the camera stream for later
    }, function (err) {
      console.log("[ERROR] : getUserMedia failed", err);
    });
}
  





// leave a channel  

function leaveChannel() {
  
client.leave(function() {
    console.log("client leaves channel");
    localStreams.camera.stream.stop() // stop the camera stream playback
    client.unpublish(localStreams.camera.stream); // unpublish the camera stream
    localStreams.camera.stream.close(); // clean up and close the camera stream
    $("#remote-streams").empty() // clean up the remote feeds
    //disable the UI elements
    $("#mic-btn").prop("disabled", true);
    $("#video-btn").prop("disabled", true);
    $("#screen-share-btn").prop("disabled", true);
    $("#exit-btn").prop("disabled", true);
    // hide the mute/no-video overlays
    toggleVisibility("#mute-overlay", false); 
    toggleVisibility("#no-local-video", false);
    // show the modal overlay to join
    $("#modalForm").modal("show"); 
}, function(err) {
    console.log("client leave failed ", err); //error handling
});
}
  















// initialising PoseNet script
async function init() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    // window.requestAnimationFrame(loop);

    // change this (use frame instead of canvas ) take ss and run w frame 

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = 200; canvas.height = 200;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function predict() {

    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // finally draw the poses
    drawPose(pose);
}


// function to define pose lines drawn on person for pose detection
function drawPose(pose) {
    if (webcam.canvas) {
        ctx.drawImage(webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}
