var socket = io.connect('https://rml444.itp.io:8085/');
//
// socket.on('they', function (data, clients) {
// 	for (var i = 0; i < clients.length; i++){
// 			// var pix = new makeTheyFace(data);
// 		theyFace = document.getElementById('themImage').innerHTML += data;
// 			}
//
// 	});

	socket.on('they', function (data) {
			theyFace = document.getElementById('themImage').innerHTML += data;
				});


// socket.on('start', function() {
// 			console.log("emoji go!");
// });

var thecontext;
var thecanvas;
var theyFace;
// var emoji = new Image();


var emojiGo = function() {
/////// communication / compatibility jig /////
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	var meVideo = document.getElementById('selfieVideo');
	//###########
	// var themVideo = document.getElementById('themImage');

	// if we have the method
	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true}, function(stream) {
				meVideo.src = window.URL.createObjectURL(stream) || stream;
				meVideo.play();
			}, function(error) {alert("Failure " + error.code);});
	}

////////////// make the page //////////////////
	// emoji.src = '/24.png';
	thecanvas = document.getElementById('thecanvas');
 	thecontext = thecanvas.getContext('2d');
	thecontext.beginPath();
	thecontext.rect(0, 0, innerWidth, innerHeight);
	thecontext.fillStyle = "red";
	thecontext.fill();

} // end of emojiG0 == init()
//
// function makeTheyFace(source, elementId){
// 	this.pix = new Image();
// 	this.source = source;
// 	this.pix.src = source;
// 	this.elementId = elementId;
// }

var draw = function() {
		//EMOJI YR FACE
	// thecontext.drawImage(emoji, 0, 0, 100, 100);
	thecontext.drawImage(meVideo,100,100,meVideo.width,meVideo.height);
	thecontext.drawImage(theyFace,300,100);


///whatever the canvas state is at this point will be sent over the network
 var dataUrl = thecanvas.toDataURL('image/webp', 1);
 // 	selfiimage.thecontext(size,size) ---> pu thtat in the dataURL...
	meVideo.src = dataUrl;
 	socket.emit('they', dataUrl);
	//draw every 6 seconds
 setTimeout(draw,6000);
}

draw();

window.addEventListener('load', emojiGo);
