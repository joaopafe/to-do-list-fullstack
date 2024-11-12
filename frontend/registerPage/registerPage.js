function redirectToLogin() {
  window.location.href = "../loginPage/login-page.html";
}

function validatePasswords(password, confirmPassword) {
  if (password === confirmPassword) return true;

  if (password !== confirmPassword) return false;
}

async function executeSignUp() {
  const username = document.getElementById("input-username").value;
  const password = document.getElementById("input-password").value;
  const confirmPassword = document.getElementById(
    "input-confirm-password"
  ).value;

  const passwordsAreEquals = validatePasswords(password, confirmPassword);

  if (passwordsAreEquals === false)
    window.alert("As senhas não convergem. Tente novamente");

  if (passwordsAreEquals === true) {
    await executeLoading();

    const response = await User.signUp(username, password);
    const responseBody = await response.json();

    if (response.status === 500) {
      window.alert("Servidor fora de ar. Tente novamente mais tarde");
    }

    if (response.status === 400) {
      window.alert(responseBody.validation.body.message);
    }

    if (response.status === 201) {
      window.alert("Usuário cadastrado com sucesso");

      window.location.href = "../loginPage/login-page.html";
    }
  }
}
