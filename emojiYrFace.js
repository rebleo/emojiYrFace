// var socket = io.connect('https://rml444.itp.io:8085/');
//

	// socket.on('they', function (data) {
	// 		theyFace = document.getElementById('themImage').innerHTML += data;
	// 			});


// socket.on('start', function() {
// 			console.log("emoji go!");
// });

var thecontext;
var thecanvas;
var theyFace;
var meVideo;
var emoji = new Image();
//variable for ctracker
var ctracker;
var emojis = [];


var emojiGo = function() {
/////// communication / compatibility jig /////
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	meVideo = document.getElementById('selfieVideo');

	// if we have the method
	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true}, function(stream) {
				meVideo.src = window.URL.createObjectURL(stream) || stream;
				// meVideo.play();

				draw();
			}, function(error) {alert("Failure " + error.code);});
	}

////////////// make the page //////////////////

	emoji.src = '/24.png';

	thecanvas = document.getElementById('thecanvas');
 	thecontext = thecanvas.getContext('2d');
	thecontext.beginPath();
	thecontext.rect(0, 0, innerWidth, innerHeight);
	thecontext.fillStyle = "green";
	thecontext.fill();


	ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(meVideo);


} // end of emojiG0 == init()
//

var draw = function() {
		//EMOJI YR FACE
	// thecontext.drawImage(emoji, 0, 0, 100, 100);
	thecontext.drawImage(meVideo,25,25,meVideo.width,meVideo.height);
	// thecontext.drawImage(theyFace,300,100);


///whatever the canvas state is at this point will be sent over the network
 // var dataUrl = thecanvas.toDataURL('image/webp', 1);
 // 	selfiimage.thecontext(size,size) ---> pu thtat in the dataURL...

	//draw every 6 seconds
 setTimeout(draw,100);
   var positions = ctracker.getCurrentPosition();
	//  console.log(positions);
	 if (positions.length > 0) {
		 for (var i = 0; i < 1; i++) {
				thecontext.drawImage(emoji,positions[i][0],positions[i][1]);
			}
		}
}



window.addEventListener('load', emojiGo);
