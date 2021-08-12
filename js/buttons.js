// UI buttons

let gesture_toggle = false


$(function () {
  $('[data-toggle="popover"]').popover()
})


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

    $("#gesture-btn").click(function(){
      toggleGesture();
    });
  
    $("#exit-btn").click(function(){
      console.log("so sad to see you leave the channel");
      leaveChannel(); 
    });
  }

  
  function toggleBtn(btn){
    btn.toggleClass('btn-dark').toggleClass('btn-danger');
  }
  
  function toggleVisibility(elementID, visible) {
    if (visible) {
      $(elementID).attr("style", "display:block");
    } else {
      $(elementID).attr("style", "display:none");
    }
  }
  
  function toggleMic(localStream) {
    toggleBtn($("#mic-btn")); // toggle button colors
    $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
    if ($("#mic-icon").hasClass('fa-microphone')) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
  }

  function toggleGesture() {
    $("#gesture-icon").toggleClass('fad fa-american-sign-language-interpreting').toggleClass('fa fa-hand-paper-o'); 
    if ($("#gesture-icon").hasClass('fad fa-american-sign-language-interpreting')) {
      init(); // fire up the pose.js script
      gesture_toggle = true

    } else {
      pause(); //stop the posenet model

    }
  }


  
  function toggleVideo(localStream) {
    toggleBtn($("#video-btn")); // toggle button colors
    $("#video-icon").toggleClass('fa-video').toggleClass('fa-video-slash'); // toggle the video icon
    if ($("#video-icon").hasClass('fa-video')) {
      localStream.unmuteVideo(); // enable the local video
      toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
    } else {
      localStream.muteVideo(); // disable the local video
      toggleVisibility("#no-local-video", true); // show the user icon when video is disabled
    }
  }