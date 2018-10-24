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
var sock = require('socket.io').listen(server);

// In caso di connessione stampo un messaggio su console
sock.sockets.on('connection', function(socket){
    console.log('A client is connected!');
    socket.emit('message', 'You are connected!');
    socket.broadcast.emit('message', 'Another client has just connected!');
    
    socket.on('message', function(msg){
        console.log(JSON.stringify(socket));
        console.log(msg);
    });
});



// Metto il server in ascolto del client
server.listen(8080);