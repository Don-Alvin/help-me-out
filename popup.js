document.addEventListener("DOMContentLoaded", () => {
	const startRecordingButton = document.getElementById("button");

	let isRecording = false;

	startRecordingButton.addEventListener("click", () => {
		if (isRecording) {
			console.log("stop recording");
		} else {
			startRecording();
		}
	});

	function startRecording() {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ action: "request_recording" },
				function (response) {
					if (!chrome.runtime.lastError) {
						console.log(response);
					} else {
						console.log(chrome.runtime.lastError);
					}
				}
			);
		});
		isRecording = true;
	}

	function stopRecording() {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ action: "stop_recording" },
				function (response) {
					if (!chrome.runtime.lastError) {
						console.log(response);
					} else {
						console.log(chrome.runtime.lastError);
					}
				}
			);
		});

		isRecording = false;
	}
});

// document.addEventListener("DOMContentLoaded", function () {
// 	const startRecordingButton = document.getElementById("button");
// 	const closeButton = document.getElementById("close");

// 	let mediaStream = null;
// 	let mediaRecorder = null;
// 	let isRecording = false;

// 	startRecordingButton.addEventListener("click", () => {
// 		if (!isRecording) {
// 			startRecording();
// 		} else {
// 			stopRecording();
// 		}
// 	});

// 	closeButton.addEventListener("click", () => {
// 		chrome.extension
// 			.getBackgroundPage()
// 			.chrome.extension.getViews({ type: "popup" })[0]
// 			.close();
// 	});

// 	function startRecording() {
// 		const sources = ["screen", "tab", "window"];

// 		chrome.desktopCapture.chooseDesktopMedia(sources, (streamId) => {
// 			if (!streamId) {
// 				console.error("User canceled the screen capture request");
// 				return;
// 			}

// 			navigator.mediaDevices
// 				.getUserMedia({
// 					audio: false,
// 					video: {
// 						mandatory: {
// 							chromeMediaSource: "desktop",
// 							chromeMediaSourceId: streamId,
// 						},
// 					},
// 				})
// 				.then((stream) => {
// 					mediaStream = stream;
// 					mediaRecorder = new MediaRecorder(stream);

// 					mediaRecorder.ondataavailable = (event) => {
// 						if (event.data.size > 0) {
// 							console.log("Received data:", event.data);
// 						}
// 					};

// 					mediaRecorder.onstop = () => {
// 						mediaStream.getTracks().forEach((track) => {
// 							track.stop();
// 						});
// 						isRecording = false;
// 						startRecordingButton.textContent = "Start Recording";
// 					};

// 					mediaRecorder.start();
// 					isRecording = true;
// 					startRecordingButton.textContent = "Stop Recording";
// 				})
// 				.catch((error) => {
// 					console.error("Error accessing user media:", error);
// 				});
// 		});
// 	}

// 	function stopRecording() {
// 		if (mediaRecorder && isRecording) {
// 			mediaRecorder.stop();
// 		}
// 	}
// });
