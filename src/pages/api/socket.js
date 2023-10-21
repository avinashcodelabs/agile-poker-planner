import {
  addUser,
  createRoom,
  getRoomInfo,
  getUsersByRoom,
  logCollectionValues,
  removeUser,
  resetUserVotesByRoom,
  updateRoom,
  updateUser,
} from "@/lib/manageUsers";
import { Server } from "socket.io";

export default function handler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
    logCollectionValues();
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

      socket.on("user-update", (data) => {
        const user = updateUser({ id: socket.id, data });

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
          newAdminId: data?.newAdminId,
        });

        if (data?.startNewVote) resetUserVotesByRoom(data.room);

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
