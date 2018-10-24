var http = require('http');
var fs = require('fs');

// Creo un server che restituisca al client il documento index.html
var server = http.createServer( function(req, res){
    fs.readFile('./index.html', 'utf-8', function(err, data){
        res.writeHead(200, {'Content-type':'text/html'});
        res.write(data);
        res.end();
    });
});

// Attendo che un client si connetta al server
var socket = require('socket.io').listen(server);

// In caso di connessione stampo un messaggio su console
socket.sockets.on('connection', function(socket){
    socket.emit('message', 'You are connected!');
    
    socket.on('message', function(msg){
        console.log(socket.username+': '+msg);
    });

    socket.on('username', function(username){
        socket.username = username;
        socket.emit('start_chat', username+' welcome to the Super Chat Project');
    });

    socket.on('msg', function(msg){
        console.log(msg);
        var obj = {username: socket.username, text: msg};
        socket.broadcast.emit('msg', JSON.stringify(obj));
    });
});



// Metto il server in ascolto del client
server.listen(8080);