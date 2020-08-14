// Setup basic express server
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server, {
    path: '/socketio/socket.io'
});

var serverName = 'socketio-' + process.env.HOSTNAME;
var port = process.env.PORT || 3000;

var mongoAdapter = require('socket.io-adapter-mongo');
var mongoUserName = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASS;
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT;
var mongoDbname = process.env.MONGO_DBNAME;
var mongoUri = 'mongodb://' + mongoUserName + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + (mongoDbname ? '/' + mongoDbname : '');
io.adapter(mongoAdapter(mongoUri));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
    console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
// app.use(express.static(__dirname + '/public'));

// Chatroom

var numUsers = 0;
io.use(function (socket, next) {
    var token = socket.handshake.query.token;
    console.log('new handshake token ' + token);
    // TODO implementation here
    if (true) {
        return next();
    }
    return next(new Error('authentication error'));
});

//Heath check for ELB
app.get('/health-check', function (req, res) {
    res.statusCode = 200;
    res.send({ "status": 'UP' });
});
io.on('connection', function (socket) {
    // join room
    socket.on('join_room_action', function (room) {
        console.log('socket id ' + socket.id + ' join room ' + room);
        socket.join(room);
    });

    // leave room
    socket.on('leave_room_action', function (room) {
        console.log('socket id ' + socket.id + ' leave room ' + room);
        socket.leave(room);
    });

    // send msg to a room
    socket.on('room_msg', function (room, topic, data) {
        console.log('socket.io will send to room ' + room + ' and topic name *'+  topic + '* with data below:');
        console.log(data);
        io.to(room).emit(topic, data);
    });
});
