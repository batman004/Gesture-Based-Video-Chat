
var cameraVideoProfile = '480p_4'; // 640 × 480 @ 30fps  & 750kbs
var screenVideoProfile = '480p_2'; // 640 × 480 @ 30fps

// global variables for accessing videostream

let globalStream;

let streamCanvas = document.createElement("canvas");
streamCanvas.height = 1080;
streamCanvas.width = 1920;
userCameraHeight = 960;
userCameraWidth = 540;
streamCanvas.style =
  "opacity:0;position:fixed;z-index:-1;left:-100000;top:-100000;";
scaleFactor = 10;
let streamCanvasType = streamCanvas.getContext("2d");



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


let cameraElement = document.createElement("video");
cameraElement.style =
  "opacity:0;position:fixed;z-index:-1;left:-100000;top:-100000;";
document.body.appendChild(cameraElement);

let screenElement = document.createElement("video");
screenElement.style =
  "opacity:0;position:fixed;z-index:-1;left:-100000;top:-100000;";
document.body.appendChild(screenElement);


function getUserVideo() {
  return navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
}

userVideoStream = await getUserVideo();
cameraElement.srcObject = userVideoStream;
cameraElement.play();

camFrameRate = userVideoStream.getVideoTracks().getSettings().frameRate;

console.log(camFrameRate)

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
  
      localStream.play('video-canvas'); // play the given stream within the local-video div
  
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
  



