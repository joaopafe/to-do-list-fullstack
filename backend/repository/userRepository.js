const openDB = require("../configDB");

class UserRepository {
  async createTable() {
    const db = await openDB();

    db.exec(
      `CREATE TABLE IF NOT EXISTS User 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password_hash TEXT)`
    );
  }

  async findByUsername(username) {
    const db = await openDB();

    const results = await db.all(`SELECT * FROM User WHERE username = ?`, [
      username,
    ]);

    return results.length ? results[0] : null;
  }

  async create(username, password) {
    const db = await openDB();

    db.all(`INSERT INTO User (username, password_hash) VALUES (?, ?)`, [
      username,
      password,
    ]);
  }

  async update(username, newPassword) {
    const db = await openDB();

    return db.run(`UPDATE User SET password_hash = ? WHERE username = ?`, [
      newPassword,
      username,
    ]);
  }
}

module.exports = UserRepository;
