if (Meteor.isClient) {
  console.log("meteor client loaded");
  
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    webRTC.rtc.on('chat_msg', function(data, socket) {
      var roomList = webRTC.rtc.rooms[data.room] || [];
      console.log(socket);
      for (var i = 0; i < roomList.length; i++) {
        var socketId = roomList[i];

        if (socketId !== socket.id) {
          var soc = webRTC.rtc.getSocket(socketId);

          if (soc) {
            soc.send(JSON.stringify({
              "eventName": "receive_chat_msg",
              "data": {
                "messages": data.messages,
                "color": data.color
              }
            }), function(error) {
              if (error) {
                console.log(error);
              }
            });
          }
        }
      }
    });
  });
}
