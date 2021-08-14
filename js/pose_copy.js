
// the link to pre-trained model

const URL = 'https://teachablemachine.withgoogle.com/models/YnZ2KQft9/'
let model, webcam, ctx, labelContainer, maxPredictions

// flag variable to stop gesture control
let run = true

/* To be Fixed :
check if video cam is on and window already created.
then access video stream and pass into predict
if confidence level of a particular class >0.85, trigger function */

async function init () {

  if(!run){
    return
  }

  const modelURL = URL + 'model.json'
  const metadataURL = URL + 'metadata.json'

  // load the model and metadata
  // Note: the pose library adds a tmPose object to your window (window.tmPose)
  model = await tmPose.load(modelURL, metadataURL)
  maxPredictions = model.getTotalClasses()

  // function to setup a webcam 

  const width = 400
  const height = 400
  const flip = true 
  webcam = new tmPose.Webcam(width, height, flip) 
  await webcam.setup() 
  await webcam.play()
  window.requestAnimationFrame(loop)

/*Fix #2
change this (use frames from localStream instead of canvas )*/

  // get elements from the DOM
  const canvas = document.getElementById('video-canvas')
  canvas.width = width
  canvas.height = height
  ctx = canvas.getContext('2d')

}


function start() {
  run=true;
  init()
}

async function loop (timestamp) {
  if(run){
  webcam.update() // update the webcam frame
  await predict()
  window.requestAnimationFrame(loop)
  
  }
}

async function predict () {
  //  run input through posenet

  /* Fix #3
  pass in same canvas as video stream into estimatePose*/

  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas)
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput)

  // Declared variables to keep track of each type of pose to trigger relevant function

  let muteThreshold        = 0,
      unmuteThreshold      = 0,
      muteVideoThreshold   = 0,
      unmuteVideoThreshold = 0,
      threshold            = 4

  let isMuted = false,
      isVideoOn = true

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
            prediction[i].className +
            ': ' +
            prediction[i].probability.toFixed(2)

    // console.log('  ' + classPrediction)

    if (prediction[0].probability.toFixed(2) >= 0.85) {
      muteThreshold++
    } else if (prediction[1].probability.toFixed(2) >= 0.85) {
      unmuteThreshold++
    } else if (prediction[2].probability.toFixed(2) >= 0.85) {
      muteVideoThreshold++
    } else if (prediction[3].probability.toFixed(2) >= 0.85) {
      unmuteVideoThreshold++
    }

    // console.log(muteThreshold + '  ' + unmuteThreshold + '  ' + muteVideoThreshold + '  ' + unmuteVideoThreshold)

  }

  if ((muteThreshold > threshold) && !isMuted) {
    globalStreamLocal.muteAudio()
    isMuted = !isMuted
    // muteMic(globalStreamLocal)
    unmuteThreshold = 0
  } else if ((unmuteThreshold > threshold) && !isMuted) {
    globalStreamLocal.unmuteAudio()
    isMuted = !isMuted
    // unmuteMic(globalStreamLocal)
    muteThreshold = 0

  } else if ((muteVideoThreshold > threshold) && isVideoOn) {
    globalStreamLocal.muteVideo()
    isVideoOn = !isVideoOn
    // camOn(globalStreamLocal)
    unmuteVideoThreshold = 0

  } else if ((unmuteVideoThreshold > threshold) && !isVideoOn) {
    globalStreamLocal.unmuteVideo()
    isVideoOn = !isVideoOn
    console.log('unmute')
    // camOff(globalStreamLocal)
    muteVideoThreshold = 0
  }

  // finally draw the poses
  drawPose(pose)
}

// function to pause the gesture control
function pause () {
  const canvas = document.getElementById('video-canvas')
  ctx = canvas.getContext('2d')

  if(webcam) {
  webcam.stop()
  ctx.clearRect(0,0,canvas.width,canvas.height)
  console.log('%cWebcam Stopped', 'color: red; font-size: 20px;')
}
  run=false
}

function drawPose (pose) {

  if (webcam.canvas) {
    ctx.drawImage(webcam.canvas, 0, 0)
    // draw the key points and skeleton
    if (pose) {
      const minPartConfidence = 0.5
      tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx)
      tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx)
    }
  }
  else{
    ctx.clearRect(0,0,canvas.width,canvas.height)
  }
}
