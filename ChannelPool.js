var GameConnection = require('./GameConnection.js');
var GameChannel    = require('./GameChannel.js');

var Channels = function () {};

Channels.prototype = {
    connections: {},
    gameChannels: {},

    /**
     * Add a connection to the connection pool
     * @param connection
     */
    addConnection: function (connection) {
        if (!this.hasConnection(connection)) {
            var connectionId = this.getConnectionId(connection);
            this.connections[connectionId] = new GameConnection(connection);
        }
    },

    /**
     * Remove a connection from the connection pool
     * @param connection
     */
    removeConnection: function (connection) {
        if (!this.hasConnection(connection)) {
            console.log("removing the connection");
        }
    },

    /**
     * Returns the connection status of a connection
     * @param connection
     * @returns {stream.fd|*|fd}
     */
    hasConnection: function (connection) {
        // if the file descriptor is already in the connections,
        // then we already have this connection.
        var connectionId = this.getConnectionId(connection);
        return this.connections.hasOwnProperty(connectionId);
    },

    /**
     * Given a connection return the connection identifier
     * @param connection
     * @returns {stream.fd|*|fd}
     */
    getConnectionId: function (connection) {
        console.log("returning connection id");
        return connection._handle.fd;
    },

    /**
     * Does this channel exist
     * @param channelId
     * @returns {boolean}
     */
    hasGameChannel: function (channelId) {
        return this.gameChannels.hasOwnProperty(channelId);
    },

    /**
     * Creates and bootstraps a new channel, or binds a connection to that channel
     * @param channelId
     * @param connection
     */
    createGameChannel: function (channelId, connection) {
        if (!this.hasGameChannel(channelId)) {
            console.log("Creating the Game Channel with id " + channelId);
            this.gameChannels[channelId] = new GameChannel(channelId);
        }
        var connectionId = this.getConnectionId(connection)
        this.gameChannels[channelId].addGameConnection(this.connections[connectionId]);
        this.gameChannels[channelId].sendMessage(JSON.stringify({
            type: "message",
            payload: this.connections[connectionId].uuid + " has joined"
        }));
    },

    /**
     * Get a game channel
     * @param channelId
     * @returns {*}
     */
    getGameChannel: function (channelId) {
        if (!this.hasGameChannel(channelId)) {
            console.log("There is no game channel with the id " + channelId);
            return null;
        }
        console.log("Found game channel with id " + channelId);
        return this.gameChannels[channelId];
    }
};

module.exports = new Channels();
