var users = {};

const addUser = ({ id, userName, room }) => {
  const user = { id, userName, room };
  users[id] = user;
  return users[id];
};

const updateUser = ({ id, vote }) => {
  if (!users[id]) {
    return null;
  }
  users[id].vote = vote;
  return users[id];
};

const removeUser = (id) => {
  const user = { ...users[id] };
  if (user) {
    delete users[id];
  }
  return user;
};

const getUsersByRoom = (room) => {
  return Object.values(users).filter((user) => user.room === room);
};

export { users, addUser, removeUser, getUsersByRoom, updateUser };
