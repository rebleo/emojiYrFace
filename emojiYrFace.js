//     ( emoji ourFace )
//a chat room for two Emoticons
//https://rml444.itp.io:8085/index.html
//a programming exercise by rebecca (marks) leopold, 2016
//thx Shawn Van Every && Rubin Huang && Nicole He
////also thx zac, kevin, jasmine, aaron for letting me "share" yr idea.
//http://www.potatoyourface.com/
//using clmtrackr - https//github.com/auduno/clmtrackr

var socket = io.connect('');

var theCanvas;
var theContxt;
var emos = [];
var theyFace;
var meFace;
// var theyData;
var emoji = new Image();//

var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

socket.on('connect', function() {
				console.log("Connected");
			});

//recieve their image as dataurl
 socket.on('they', function (theyData) {
	//  console.log("it's them!");
		theyFace = document.getElementById('themImage');
		theyFace.src = theyData;
		// console.log(theyData);

});

var emojiGo = function() {
	console.log("loaded");
  // ctrack.init(pModel);
/////// communication / compatibility jig /////
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	meFace = document.getElementById('selfieVideo');

	// if we have the method
	if (navigator.getUserMedia) {
		navigator.getUserMedia({video: true}, function(stream) {
				meFace.src = window.URL.createObjectURL(stream) || stream;
				meFace.play();
				//call draw after get video info
				draw();

			}, function(error) {alert("Failure " + error.code);});
	}

////////////// make the page //////////////////
	emoji.src = '/24.png';
//create the canvas make it green
	theCanvas = document.getElementById('thecanvas1');
 	theContxt = theCanvas.getContext('2d');

	var theTitleCanvas = document.getElementById('thecanvas2');
	var theTitleText = theTitleCanvas.getContext('2d');

	theTitleText.font="20px Georgia";
	theTitleText.fillText("😶",75,20);

//push the emojis into the emos array
	var emo1 = document.getElementById('icon1');
	var emo2 = document.getElementById('icon1');
	var emo3 = document.getElementById('icon1');
	var emo4 = document.getElementById('icon1');
	var emo5 = document.getElementById('icon1');
 	emos.push(emo1,emo2,emo3,emo4,emo5);

 // 	console.log(emos);

//init the CLM tracker
	ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(meFace);



} // end of emojiG0 == init()


var draw = function() {
//ANYTHING DRAWN ON CANVAS WILL BE EMITTED YOU FOOL!
 	theContxt.drawImage(meFace,0,0,meFace.width,meFace.height);

//all this clm tracker emotion stuff i don't entirely understand
	var cp = ctracker.getCurrentParameters();
	 //angry, disgusted, fear, sad, suprised, happy
	var er = ec.meanPredict(cp);
	var positions = ctracker.getCurrentPosition();

	// theContxt.drawImage(emos[0], 100,100);
  // console.log(positions);
	//for the position of yr face
	if (positions.length > 0) {

		if (er) {
//this part needs to be cleaned up/fixed
			for (var i = 0; i < 1; i++) {
				for (var j = 0; j < er.length; j++){
						if (er[j].value > 0.4) {
							document.getElementById('icon'+(j+1)).style.visibility = 'visible';
							theContxt.drawImage(emos[j+1],positions[i][0], positions[i][1]-75);
					// theContxt.drawImage(emos[j+1], 100,100)
					} else {
						document.getElementById('icon'+(j+1)).style.visibility = 'hidden';
				 	theContxt.drawImage(emoji,positions[i][0], positions[i][1]-75);
				}
			}
		}

//draw the hardcoded emoji to the face tracking position

		 }
	 }
///whatever the canvas state is at this point will be sent over the network
 	var meData = theCanvas.toDataURL('image/jpeg', 0.2);

 // 	socket.emit('canvas1', dataCanvas1);
	socket.emit('dataMyFace',meData);
	// draw every 6 seconds
 	setTimeout(draw,100);
}
window.addEventListener('load', emojiGo);
