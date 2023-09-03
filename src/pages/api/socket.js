import { Server } from "socket.io";
import {
  addUser,
  removeUser,
  updateUser,
  getUsersByRoom,
  createRoom,
  getRoomInfo,
  updateRoom,
  resetUserVotesByRoom,
  logCollectionValues,
} from "@/lib/manageUsers";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    // DB logger with set timing interval for development puroposes
    // setInterval(function () {
    //   logCollectionValues();
    // }, 5000);
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

        createRoom(user);

        socket.join(user.room);
        io.to(user.room).emit("room-users", {
          room: user.room,
          users: getUsersByRoom(user.room),
          roomInfo: getRoomInfo(user.room),
        });
      });

      socket.on("user-vote", (data) => {
        const user = updateUser({ id: socket.id, vote: data.vote });

        if (user) {
          io.to(user.room).emit("room-users", {
            room: user.room,
            users: getUsersByRoom(user.room),
            roomInfo: getRoomInfo(user.room),
          });
        }
      });

      socket.on("room-info-update", (data) => {
        const roomInfo = updateRoom({
          room: data.room,
          revealState: data?.revealState,
          userStory: data?.userStory,
        });

        if (roomInfo) {
          io.to(data.room).emit("room-users", {
            room: data.room,
            users: getUsersByRoom(data.room),
            roomInfo,
          });
        }
      });

      socket.on("start-new-vote", (data) => {
        const roomInfo = updateRoom({
          room: data.room,
          revealState: "close",
          userStory: {
            title: null,
            description: null,
          },
        });

        resetUserVotesByRoom(data.room);

        if (roomInfo) {
          io.to(data.room).emit("room-users", {
            room: data.room,
            users: getUsersByRoom(data.room),
            roomInfo,
          });
        }
      });

      socket.on("disconnect", () => {
        const user = removeUser(socket.id);
        if (user) {
          io.to(user.room).emit("room-users", {
            room: user.room,
            users: getUsersByRoom(user.room),
            roomInfo: getRoomInfo(user.room),
          });
        }
      });
    });
  }
  res.end("");
}
