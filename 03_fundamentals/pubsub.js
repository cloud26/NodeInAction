var events = require('events'),
    net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

// By default, Node will warn once there are more than 10 listeners
channel.setMaxListeners(50);

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);

    var welcome = "Welcome!\n" + "Guests online: " + this.listeners('broadcast').length;
    client.write(welcome + "\n");
});

channel.on('leave', function(id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', function() {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    
    channel.emit('join', id, client);
    /*
    client.on('connect', function() {
        channel.emit('join', id, client);
    });
    */
    client.on('data', function(data) {
        data = data.toString();
        if (data == "shutdown\r\n") {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });
    client.on('close', function() {
        channel.emit('leave', id);
    });
});

server.listen(8888);
