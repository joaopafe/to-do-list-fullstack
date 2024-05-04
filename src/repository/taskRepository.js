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

  async listById(id) {
    const db = await openDB();

    return db.all(`SELECT * FROM Task WHERE id = ?`, [id]);
  }

  async create(task) {
    const db = await openDB();

    return db.all(`INSERT INTO Task (description) VALUES (?)`, [task]);
  }

  async update(id, description) {
    const db = await openDB();

    return db.all(`UPDATE Task SET description = ? WHERE id = ?`, [
      description,
      id,
    ]);
  }

  async delete(id) {
    const db = await openDB();

    return db.all(`DELETE FROM Task WHERE id = ?`, [id]);
  }
}

module.exports = TaskRepository;
