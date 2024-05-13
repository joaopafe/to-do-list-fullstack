const openDB = require("../configDB");

class UserRepository {
  async createTable() {
    const db = await openDB();

    db.exec(
      `CREATE TABLE IF NOT EXISTS User 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`
    );
  }

  async create(username, password) {
    const db = await openDB();

    db.all(`INSERT INTO User (username, password) VALUES (?, ?)`, [
      username,
      password,
    ]);
  }
}

module.exports = UserRepository;
