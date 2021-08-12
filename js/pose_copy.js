// the link to the model by Teachable Machine
const URL = "https://teachablemachine.withgoogle.com/models/YnZ2KQft9/";
let model, webcam, ctx, labelContainer, maxPredictions;

let run_gesture=false

function init(run_gesture){
    if(run_gesture){
    await init_pose()
    }
}

async function init_pose() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    
    window.requestAnimationFrame(loop);

    // change this (use frame instead of canvas ) take ss and run w frame 

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

// make own function which calls draw function after a time interal (check webcam.update())


// setInterval(() => {
//     client.getLocalVideoStats((localVideoStats) => {
//       for(var uid in localVideoStats){
//         console.log(`Video CaptureFrameRate from ${uid}: ${localVideoStats[uid].CaptureFrameRate}`);
//       }
//     }
//     )})

async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}



async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element

    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);
   // create switchcase from posenet op 

    // trigger functions based on op's 

    // run func on same app id and channel 

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;

     // trigger video call functions based on count of probability of a
     // particular class crossing the threshold 

     let count0=0,count1=0,count2=0,count3=0,threshold=4;
    if (prediction[0].probability.toFixed(2) >= 0.75){
        count0++;
    }
    else if(prediction[1].probability.toFixed(2) >= 0.75) {
        count1++;
    }
    else if(prediction[2].probability.toFixed(2) >= 0.75) {
        count2++;
    }
    else if(prediction[3].probability.toFixed(2) >= 0.75) {
        count3++;
    }

    if(count0>threshold){
        toggleVideo(globalStream)

    }

    else if (count1>threshold){
        toggleVideo(globalStream)
    }

    else if (count2>threshold){
        toggleMic(globalStream);
    }

    else if (count3>threshold){
        toggleMic(globalStream);
    }
   


    }

    // finally draw the poses
    drawPose(pose);
}





// function to pause the gesture control
function pause(){

    // await webcam.setup();
    webcam.stop()

}


// initialise agora element 
// take ref of the local vid stream 




function drawPose(pose) {
    if (webcam.canvas) {
        // ctx.drawImage(webcam.canvas, 0, 0);
        streamCanvasType.drawImage(cameraElement,0,0,streamCanvas.width,streamCanvas.height);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
    }
}

 