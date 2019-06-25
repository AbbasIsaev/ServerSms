class Users {
  constructor() {
    this.users = [];
  }

  add(id, displayName, room, isMobile = false) {
    this.users.push({
      id, displayName, room, isMobile
    })
  }

  get(id) {
    return this.users.find(u => u.id === id);
  }

  remove(id) {
    const user = this.get(id);
    if (user) {
      this.users = this.users.filter(u => u.id !== user.id);
    }
    return user;
  }

  getByRoom(room) {
    return this.users.filter(u => u.room === room);
  }
}

module.exports = function () {
  return new Users();
};
