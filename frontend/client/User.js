class User {
  static async signIn(username, password) {
    const body = JSON.stringify({
      username,
      password,
    });

    return fetch("http://localhost:3000/user/login", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async signUp(username, password) {
    const body = JSON.stringify({
      username,
      password,
    });

    return fetch("http://localhost:3000/user", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async updatePassword(username, password, newPassword) {
    const body = JSON.stringify({
      username,
      password,
      newPassword,
    });

    return fetch("http://localhost:3000/user", {
      method: "PUT",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
