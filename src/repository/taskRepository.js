const openDB = require("../configDB");

class TaskRepository {
  async createTable() {
    const db = await openDB();

    db.exec(
      `CREATE TABLE IF NOT EXISTS Task 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT)`
    );
  }

  async listAll() {
    const db = await openDB();

    return db.all(`SELECT * FROM Task`);
  }
}

module.exports = TaskRepository;
