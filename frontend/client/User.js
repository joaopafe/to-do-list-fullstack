class Login {
  async signIn(username, password) {
    const body = JSON.stringify({
      username,
      password,
    });

    return fetch(`http://localhost:3000/user/login`, {
      method: "POST",
      body,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
