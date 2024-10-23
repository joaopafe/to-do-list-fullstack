function redirectToRegister() {
  window.location.href = "../registerPage/register-page.html";
}

async function executeSign() {
  const username = document.getElementById("input-username").value;
  const password = document.getElementById("input-password").value;

  await executeLoading();

  const response = await Login.signIn(username, password);
  const responseBody = await response.json();

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 404
  ) {
    window.alert("Credenciais inválidas. Tente novamente");
  }

  if (response.status === 200) {
    localStorage.setItem("token", responseBody.token);
    window.alert("Login realizado com sucesso");
  }
}
