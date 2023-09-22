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
    "\n"
  );
};

const addUser = ({ id, userName, room }) => {
  const user = { id, userName, room, vote: null };
  usersCollection[id] = user;
  return usersCollection[id];
};

const updateUser = ({ id, vote }) => {
  if (!usersCollection[id]) {
    return null;
  }
  usersCollection[id].vote = vote;
  return usersCollection[id];
};

const removeUser = (id) => {
  const user = { ...usersCollection[id] };
  if (user) {
    delete usersCollection[id];
    if (roomInfoCollection[user.room]) {
      roomInfoCollection[user.room].userCount--;
      if (roomInfoCollection[user.room].userCount <= 0) {
        delete roomInfoCollection[user.room];
      }
    }
  }
  return user;
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
      revealState: false,
      roomAdmin: user.id,
      userCount: 1,
      userStory: {
        title: null,
        description: null,
      },
    };
  } else {
    roomInfoCollection[user.room].userCount++;
  }
};

const updateRoom = ({ room, revealState, userStory }) => {
  if (!roomInfoCollection[room]) {
    return null;
  }
  if (revealState) {
    roomInfoCollection[room].revealState = revealState;
  }
  if (userStory) {
    roomInfoCollection[room].userStory = userStory;
  }
  return roomInfoCollection[room];
};

const getRoomInfo = (room) => {
  return roomInfoCollection[room];
};

export {
  usersCollection,
  roomInfoCollection,
  addUser,
  removeUser,
  getUsersByRoom,
  updateUser,
  resetUserVotesByRoom,
  createRoom,
  getRoomInfo,
  updateRoom,
  logCollectionValues,
};
