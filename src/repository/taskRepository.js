const openDB = require("../configDB");

class TaskRepository {
  async createTable() {
    const db = await openDB();

    db.exec(
      `CREATE TABLE IF NOT EXISTS Task 
      (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, user_id INTEGER)`
    );
  }

  async listAll(userId) {
    const db = await openDB();

    return db.all(`SELECT * FROM Task WHERE user_id = ?`, [userId]);
  }

  async listById(id) {
    const db = await openDB();

    return db.all(`SELECT * FROM Task WHERE id = ?`, [id]);
  }

  async create(task, userId) {
    const db = await openDB();

    return db.all(`INSERT INTO Task (description, user_id) VALUES (?, ?)`, [
      task,
      userId,
    ]);
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
