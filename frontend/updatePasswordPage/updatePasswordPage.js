const usernameElement = document.getElementById("input-username");
const passwordElement = document.getElementById("input-password");
const newPasswordElement = document.getElementById("input-new-password");

async function updatePassword() {
  const username = usernameElement.value;
  const password = passwordElement.value;
  const newPassword = newPasswordElement.value;

  const response = await User.updatePassword(username, password, newPassword);
  const responseBody = await response.json();

  validate(response, responseBody);
}

function validate(response, responseBody) {
  if (response.status === 200) {
    window.alert("Senha atualizada com sucesso.");

    window.location.href = "../mainPage/main-page.html";
  }

  if (response.status === 404) {
    window.alert(`Erro ao atualizar senha: ${responseBody.message}`);
  }

  if (response.status === 400) {
    window.alert(
      `Erro ao atualizar senha: ${responseBody.validation.body.message}`
    );
  }
}

function backPage() {
  window.location.href = "../mainPage/main-page.html";
}
