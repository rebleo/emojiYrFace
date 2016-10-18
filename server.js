var https = require('https');
var fs = require('fs'); // Using the filesystem module
var url =  require('url');

var options = {

  key: fs.readFileSync('my-key.pem'),
  cert: fs.readFileSync('my-cert.pem')
};

// var clientCount = 0;
// var clientList = [];

function handleIt(req, res) {
	var parsedUrl = url.parse(req.url);

	var path = parsedUrl.pathname;
	if (path == "/") {
		path = "index.html";
	}

	fs.readFile(__dirname + path,

		// Callback function for reading
		function (err, fileContents) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + req.url);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(fileContents);
			console.log("connected to rml444")
  		}
  	);

	// Send a log message to the console
	console.log("Got a request " + req.url);
}

var httpServer = https.createServer(options, handleIt);
httpServer.listen(8087);

// WebSocket Portion
var io = require('socket.io').listen(httpServer);

// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {
		console.log("We have a new client: " + socket.id);


		//this is the socket for the incoming image footage
		socket.on('dataMyFace', function(meData){
			// console.log("it's me!");
				socket.broadcast.emit('they', meData);

		});

	
	});
