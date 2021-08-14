// UI button functions 

// logic for gesture toggle button

const toggle = document.getElementById('gesture-control-toggle')
toggle.addEventListener('click', () => {
  if (toggle.checked) {
      start()
      console.log('%cStarted', "color: green; font-size: 18px;")
  } else {
    pause()
    var x = document.getElementById("video-canvas");  // Hide the canvas when not in use 
    x.style.display = "none";
    console.log('%cPaused', "color: red; font-size: 18px;")
  }
})

// initially fade the buttons before joining the call

function enableUiControls(localStream) {

    $("#mic-btn").prop("disabled", false);
    $("#video-btn").prop("disabled", false);
    $("#screen-share-btn").prop("disabled", false);
    $("#exit-btn").prop("disabled", false);
    $("#gesture-btn").prop("disabled", false);
  
    $("#mic-btn").click(function(){
      toggleMic(localStream);
    });
  
    $("#video-btn").click(function(){
      toggleVideo(localStream);
    });

    $("#exit-btn").click(function(){
      console.log("See you soon !");
      leaveChannel(); 
    });
  }


  function toggleVisibility(elementID, visible) {
    if (visible) {
      $(elementID).attr("style", "display:block");
    } else {
      $(elementID).attr("style", "display:none");
    }
  }
  

  function toggleMic(localStream) {

    $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
    if ($("#mic-icon").hasClass('fa-microphone')) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
  }

  function toggleVideo(localStream) {
    $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
    if ($("#video-icon").hasClass('fa-video')) {
      localStream.unmuteVideo(); // enable the local video
      toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
    } else {
      localStream.muteVideo(); // disable the local video
      toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
    }
  }


  function unmuteMic(){
    if($("#mic-icon").hasClass('fa-microphone-slash')){
      $("#mic-icon").toggleClass('fa-microphone-slash').toggleClass('fa-microphone');}
      else{
        $("#mic-icon").addClass('fa-microphone')
      }
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  }

  function muteMic(){
    if($("#mic-icon").hasClass('fa-microphone')){
      $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash');}
      else{
        $("#mic-icon").addClass('fa-microphone-slash')
      }

    toggleVisibility("#mute-overlay", true); // show the muted mic icon
  }

  function camOn(){
   if($("#video-icon").hasClass('fa-video-slash')){
    $("#video-icon").toggleClass('fa-video-slash').toggleClass('fa-video');}
    else{
      $("#video-icon").addClass('fa-video')
    }
    // console.log('%cCam On', 'color: green; font-size: 20px;')
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  }

  function camOff(){
    if($("#video-icon").hasClass('fa-video')){
    $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash');}
    else{
      $("#video-icon").addClass('fa-video-slash')
    }
    // console.log('%cCam Off', 'color: red; font-size: 20px;')
    toggleVisibility("#no-local-video", true); // show the user icon when video is enabled
  }