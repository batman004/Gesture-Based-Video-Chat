// UI button functions 

let gesture_toggle = false


$(function () {
  $('[data-toggle="popover"]').popover()
})


// logic for gesture toggle button

const mic = document.getElementById('mic-btn')
mic.addEventListener('click', handleMicClick)

function handleMicClick() {
  if (mic.classList.contains('btn-dark')) {
    mic.classList.remove('btn-dark')
    mic.classList.add('btn-danger')
  } else {
    mic.classList.add('btn-dark')
    mic.classList.remove('btn-danger')
  }
}

const toggle = document.getElementById('gesture-control-toggle')
toggle.addEventListener('click', () => {
  if (toggle.checked) {
      start()
      console.log('%cStarted', "color: green; font-size: 18px;")
  } else {
    pause()
    console.log('%cPaused', "color: red; font-size: 18px;")
  }
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
      console.log("See you soon !");
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
    // toggleBtn($("#mic-btn")); // toggle button colors
    // const mic = document.getElementById('mic-btn')
    // toggleBtn(mic)
    $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash'); // toggle the mic icon
    if ($("#mic-icon").hasClass('fa-microphone')) {
      localStream.unmuteAudio(); // enable the local mic
      toggleVisibility("#mute-overlay", false); // hide the muted mic icon
    } else {
      localStream.muteAudio(); // mute the local mic
      toggleVisibility("#mute-overlay", true); // show the muted mic icon
    }
  }


  function unmuteMic(localStream){
    toggleBtn($("#mic-btn"));
    // toggleBtn($("#mic-btn"));
    $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
    // localStream.unmuteAudio(); // enable the local mic
    toggleVisibility("#mute-overlay", false); // hide the muted mic icon
  }

  function muteMic(localStream){
    toggleBtn($("#mic-btn"));
    $("#mic-icon").toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
    // localStream.muteAudio(); // disable the local mic
    toggleVisibility("#mute-overlay", true); // show the muted mic icon
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


  function camOn(localStream){
    toggleBtn($("#video-btn"));
    console.log('%cCam On', 'color: green; font-size: 20px;')
    // localStream.unmuteVideo(); // enable the local video
    toggleVisibility("#no-local-video", false); // hide the user icon when video is enabled
  }

  function camOff(localStream){
    toggleBtn($("#video-btn"));
    console.log('%cCam Off', 'color: red; font-size: 20px;')
    // localStream.muteVideo(); // disable the local video
    toggleVisibility("#no-local-video", true); // show the user icon when video is enabled
  }