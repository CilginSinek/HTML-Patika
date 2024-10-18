exports.SocketFunc = (io) => {
  io.on("connection", (socket) => {
    // !socket.user
    //   ? socket.disconnect()
    //   : socket.broadcast("user connected", {
    //       user: socket.user,
    //       time: Date().now(),
    //       message: "Connected",
    //     });
    console.log("adam geldi")

    socket.on("sendMessage", (data) => {
      socket.broadcast.emit("takeMessage", data);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("userDisconneted", "user disconnected");
    });
  });
};
