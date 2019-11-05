const express = require('express');
const socket = require('socket.io');
let app = express();

app.use(express.static('public'));

let server = app.listen(4000, function() {
    console.log('You are listening port 4000.');
});

//SetUp Socket
let io = socket(server);

//Fire Event
io.on('connection', function(socket) {
    console.log('Made socket connection.', socket.id); 

    //Handle chat Event
    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });

    //Handle Typing Event
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
});

