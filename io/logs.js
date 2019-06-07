class Logs {
  constructor() {
    this.logs = {};
  }

  add(name, text, date, room, color) {
    if (this.logs[room]) {
      const answers = [...this.logs[room]];
      answers.push({name, text, date, room, color});
      this.logs[room] = answers;
    } else {
      this.logs[room] = [];
    }
  }

  getAll() {
    return this.logs;
  }

  getLast10(room) {
    if (this.logs[room]) {
      return this.logs[room].slice(-10);
    }
    return [];
  }
}

module.exports = function () {
  return new Logs();
};
