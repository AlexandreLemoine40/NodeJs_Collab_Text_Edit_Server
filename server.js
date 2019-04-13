var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./test-quill.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Initialisation du contenu de l'éditeur
var content = 'Quill';

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');

    // Quand un nouveau client se connecte on reçoit son pseudo
    socket.on('newClient', function(pseudo) {
        socket.pseudo = pseudo;
        console.log(pseudo);
    });

    // Quand on reçoit un message du client
    socket.on('message', function(message) {
        console.log(message);
    });

    // A terminer
    // Quand un client modifie son éditeur
    socket.on('typed', function(text,position) {
      socket.broadcast.emit(text);
      console.log(text);
    });
});




server.listen(8080);
