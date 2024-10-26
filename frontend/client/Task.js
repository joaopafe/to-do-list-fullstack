class Task {
  static async getTasks(token) {
    return fetch("http://localhost:3000/task", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  }
}
