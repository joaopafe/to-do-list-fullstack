const username = localStorage.getItem("username");
const token = localStorage.getItem("token");
const createTaskModal = document.getElementById("create-task-modal");
const editTaskModal = document.getElementById("edit-task-modal");
const toDoList = document.getElementById("to-do-list");
let response = {};
let responseBody = {};

async function getTasks(token) {
  response = await Task.getTasks(token);

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (response.status === 400 || response.status === 404) {
    window.alert(
      "Não foi possível listar suas atividades. Tente novamente mais tarde"
    );
  }

  if (response.status === 401) {
    window.alert(
      "Sua autenticação foi expirada. Logue novamente para utilizar a plataforma"
    );

    window.location.href = "../loginPage/login-page.html";
  }

  if (response.status === 200) {
    responseBody = await response.json();

    listTasks(responseBody);
  }
}

function listTasks(taskList) {
  taskList.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = `task-${task.id}`;

    taskDiv.innerHTML = `
      <div class="check-icon">
        <img src="../images/check-task.png" alt="Status de checagem" />
      </div>

      <div class="task-name">${task.description}</div>

      <div class="edit-and-delete-task">
        <div class="edit-task">
          <div class="edit-text">Editar</div>
          <div class="edit-icon" onclick="openModal(editTaskModal, ${task.id})">
            <img src="../images/edit-task.png" alt="Editar atividade" />
          </div>
        </div>

        <div class="delete-task">
          <div class="delete-text">Excluir</div>
          <div class="delete-icon">
            <img src="../images/delete-task.png" alt="Excluir atividade" />
          </div>
        </div>
      </div>
    `;

    document.getElementById("to-do-list").appendChild(taskDiv);
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");

  window.location.href = "../loginPage/login-page.html";
}

function openModal(element, taskId) {
  if (taskId !== undefined) taskForEdition = taskId;

  element.style.display = "flex";
  element.showModal();
}

function closeModal(element) {
  element.style.display = "none";
  element.close();
}

async function createTask() {
  const description = document.getElementById("task-create-description").value;

  response = await Task.postTask(token, description);
  responseBody = await response.json();

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (response.status === 400 || response.status === 404) {
    window.alert(
      "Não foi possível criar sua atividade. Tente novamente mais tarde"
    );
  }

  if (response.status === 401) {
    window.alert(
      "Sua autenticação foi expirada. Logue novamente para utilizar a plataforma"
    );

    window.location.href = "../loginPage/login-page.html";
  }

  if (response.status === 201) {
    toDoList.innerHTML = "";
    closeModal(createTaskModal);
    getTasks(token);
  }
}

async function editTask() {
  const description = document.getElementById("task-edit-description").value;

  response = await Task.putTask(token, taskForEdition, description);
  responseBody = await response.json();

  if (response.status === 500) {
    window.alert("Servidor fora de ar. Tente novamente mais tarde");
  }

  if (response.status === 400 || response.status === 404) {
    window.alert(
      "Não foi possível editar sua atividade. Tente novamente mais tarde"
    );
  }

  if (response.status === 401) {
    window.alert(
      "Sua autenticação foi expirada. Logue novamente para utilizar a plataforma"
    );

    window.location.href = "../loginPage/login-page.html";
  }

  if (response.status === 200) {
    toDoList.innerHTML = "";
    closeModal(editTaskModal);
    getTasks(token);
  }
}

document.getElementById("welcome-section").innerHTML = `
Olá ${username}! <br />
Aqui se encontram suas atividades.
`;

createTaskModal.style.display = "none";

getTasks(token);
