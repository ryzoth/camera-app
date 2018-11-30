// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };  //if you set facingMode to "user", it uses the front camera.  Back camera is "environment"
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
	saveAction = document.querySelector("#image--saver")

	// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Error: Couldn't access the camera!", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/png");
    cameraOutput.classList.add("taken");
	
};

/*var canvas = document.getElementById('canvas');

canvas.toBlob(function(blob) {
	var newImg = document.createElement('img'),
		url = URL.createObjectURL(blob);
		
	newImg.onload = function() {
		// no longer need to read the blob so it's revoked
		URL.revokeObjectURL(url);
	};
	
	newImg.src = url;
	document.body.appendChild(newImg);
});

saveAction.onclick = function() {
	canvas = cameraOutput;
	canvas.toBlob();
};*/

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);