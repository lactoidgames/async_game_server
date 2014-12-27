var net = require('net');
var assert = require('assert');
var Channels       = require('./ChannelPool.js');

var Server = {
    listen_port: 8080
};

var server = net.createServer(function (c) {
    console.log('client connected');
    c.setEncoding('utf8');

    Channels.addConnection(c);

    console.log(Channels.hasConnection(c));

    c.on('data', function (chunk) {
        assert.equal(typeof chunk, 'string');
        console.log('got %d chanracters of string data', chunk.length);
        console.log(chunk);

        try {
            var payload = JSON.parse(chunk);
            console.log(payload);
            if (payload.type) {
                // connect
                // join
                // leave
                // message
                switch (payload.type) {
                    case "join":

                        assert.ok(payload.hasOwnProperty("channel"));
                        console.log("Creating Game Channel called " + payload.channel);
                        Channels.createGameChannel(payload.channel, c);
                        break;

                    case "leave":
                        var channel = Channels.getGameChannel(payload.channel);
                        Channels.removeConnection(c);
                        break;

                    case "message":
                        var channel = Channels.getGameChannel(payload.channel);
                        channel.sendMessage(payload.data);
                        break;
                }
            } else {
                c.write("you sent a command that is unrecognized. Example message for game connection would be {'type':'join', 'channel':'gameId'}");
            }
        } catch (e) {
            console.log(e);
            c.write("You need to send JSON to this Socket API. Epic Failure");
        }
    });

    c.on('end', function () {
        console.log('client disconnected');
        // send leave and cleanup the Channels
        Channels.removeConnection(c);
    });

    //c.write('hello\r\n');

    c.pipe(c);
});

server.listen(Server.listen_port, function () {
    console.log('server bound on port ' + Server.listen_port);
});
