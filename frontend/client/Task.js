class Task {
  static async getTasks(token) {
    return fetch("http://localhost:3000/task", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }

  static async postTask(token, description) {
    return fetch("http://localhost:3000/task", {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }

  static async putTask(token, taskId, description) {
    return fetch(`http://localhost:3000/task/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }

  static async deleteTask(token, taskId) {
    return fetch(`http://localhost:3000/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }
}
