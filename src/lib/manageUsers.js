var usersCollection = {};
var roomInfoCollection = {};

const logCollectionValues = () => {
  console.log(
    "*".repeat(25),
    "\nserver DB logs \nusersCollection",
    usersCollection,
    "\nroomInfoCollection",
    roomInfoCollection,
    "\n",
    "#".repeat(25),
    "\n",
  );
};

const addUser = ({ id, userName, room }) => {
  const user = { id, userName, room, vote: null };
  usersCollection[id] = user;
  return usersCollection[id];
};

const updateUser = ({ id, data }) => {
  if (!usersCollection[id]) {
    return null;
  }
  usersCollection[id] = { ...usersCollection[id], id, ...data };
  return usersCollection[id];
};

const removeUser = (id) => {
  const removedUser = { ...usersCollection[id] };
  if (removedUser) {
    delete usersCollection[id];
    if (roomInfoCollection[removedUser.room]) {
      roomInfoCollection[removedUser.room].userCount--;
      if (roomInfoCollection[removedUser.room].userCount <= 0) {
        delete roomInfoCollection[removedUser.room];
      } else if (roomInfoCollection[removedUser.room].roomAdmin == id) {
        const newAdmin = Object.values(usersCollection).find(
          (user) => user.room === removedUser.room,
        );
        roomInfoCollection[removedUser.room].roomAdmin = newAdmin.id;
      }
    }
  }
  return removedUser;
};

const resetUserVotesByRoom = (room) => {
  Object.entries(usersCollection).forEach(([userId, user]) => {
    if (user.room === room) usersCollection[userId].vote = null;
  });
};

const getUsersByRoom = (room) => {
  return Object.values(usersCollection).filter((user) => user.room === room);
};

const createRoom = (user) => {
  if (!roomInfoCollection[user.room]) {
    roomInfoCollection[user.room] = {
      room: user.room,
      revealState: "close",
      roomAdmin: user.id,
      userCount: 1,
      userStory: {
        title: "",
        description: null,
      },
    };
  } else {
    roomInfoCollection[user.room].userCount++;
  }
};

const updateRoom = ({ room, revealState, userStory, newAdminId }) => {
  if (!roomInfoCollection[room]) {
    return null;
  }
  if (revealState) {
    roomInfoCollection[room].revealState = revealState;
  }
  if (userStory) {
    roomInfoCollection[room].userStory = userStory;
  }
  if (newAdminId) {
    roomInfoCollection[room].roomAdmin = newAdminId;
  }
  return roomInfoCollection[room];
};

const getRoomInfo = (room) => {
  return roomInfoCollection[room];
};

export {
  addUser,
  createRoom,
  getRoomInfo,
  getUsersByRoom,
  logCollectionValues,
  removeUser,
  resetUserVotesByRoom,
  roomInfoCollection,
  updateRoom,
  updateUser,
  usersCollection,
};
