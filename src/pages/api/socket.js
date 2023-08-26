import { Server } from "socket.io";
import {
  addUser,
  removeUser,
  updateUser,
  getUsersByRoom,
} from "@/lib/manageUsers";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      allowEIO3: true,
      path: "/api/socket_io",
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("user-joined", (data) => {
        const user = addUser({
          id: socket.id,
          userName: data.userName,
          room: data.room,
        });

        socket.join(user.room);
        io.to(user.room).emit("room-users", {
          room: user.room,
          users: getUsersByRoom(user.room),
        });
      });

      socket.on("user-vote", (data) => {
        const user = updateUser({ id: socket.id, vote: data.vote });

        if (user) {
          io.to(user.room).emit("room-users", {
            room: user.room,
            users: getUsersByRoom(user.room),
          });
        }
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
          io.to(user.room).emit("room-users", {
            room: user.room,
            users: getUsersByRoom(user.room),
          });
        }
      });
    });
  }
  res.end("");
}