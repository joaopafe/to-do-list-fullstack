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

  async update(username, password, newPassword) {
    const db = await openDB();

    const rows = await db.run(
      `UPDATE User SET password = ? WHERE username = ? AND password = ?`,
      [newPassword, username, password]
    );

    return rows;
  }
}

module.exports = UserRepository;
