var GameChannel = function (channelId) {
    this.channelId = channelId;
};

GameChannel.prototype = {
    channelId: null,
    connections: {},
    messages: [],
    created: new Date().getTime(),
    lastActive: new Date().getTime(),

    sendMessage: function (message) {
        console.log("sending message to channel with message " + message);

        for (var connection in this.connections) {
            self.connections[connection].connection.write(message);
            console.log(this.connections[connection].uuid);
        }
    },

    addGameConnection: function (connection) {
        console.log("adding game connection for " + connection);
        this.connections[connection.uuid] = connection;
        connection.setChannel(this.channelId);
    },

    removeGameConnection: function (connection) {
        var gameConnectionId = connection.uuid;
        if (this.connections.hasOwnProperty(gameConnectionId)) {
            console.log("Removing " + gameConnectionId + " from the connection pool");
            delete this.connections[gameConnectionId];
        }
    }
};

module.exports = GameChannel;
