var GameConnection = function (connection) {
    this.connection = connection;
    var now = new Date().getTime();
    this.uuid = connection._handle.fd + "-" + now;
};

GameConnection.prototype = {
    connection: null,
    uuid: "",
    channels: [],
    channelMap: {},
    /**
     * Bind a channel to the game connection, track the timestamp of the connection
     * @param channelId
     */
    setChannel: function (channelId) {
        if (!this.channelMap.hasOwnProperty(channelId)) {
            // track when the connection was made
            this.channelMap.channelId = new Date().getTime();
        }
    },

    leaveChannel: function (channelId) {
        if (this.channelMap.hasOwnProperty(channelId)) {
            // given the channelId, leave the session...
            console.log("Do something to leave this channel");
        }
    }
};

module.exports = GameConnection;

