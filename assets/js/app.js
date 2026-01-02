const taskList = document.getElementById("task-list");

// Event Listeners
eventListeners();

function eventListeners() {
  // Handle the form submission
  document.querySelector("#form").addEventListener("submit", addTask);
  // Handle Enter key on task input
  document.querySelector("#form").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask(e);
    }
  });
  // Delete task
  taskList.addEventListener("click", deleteTask);
  // Content loaded
  document.addEventListener("DOMContentLoaded", localStorageDone);
}

// Add task to the form
function addTask(e) {
  e.preventDefault();
  const taskList = document.getElementById("task-list");
  const task = document.getElementById("task").value;
  const emoji = document.getElementsByClassName("emoji-items").value;
  const eraseButton = document.createElement("a");
  eraseButton.classList = "delete-task";
  eraseButton.innerText = "❌";

  if (task.length === 0) {
    return swal({
      title: "⚠️",
      text: "You must write a task!",
      icon: "warning",
      button: "Oh no!",
    });
  }

  const existingTasks = getTasksFromLocalStorage();
  if (existingTasks.includes(task)) {
    return swal({
      title: "⚠️",
      text: "This task already exists!",
      icon: "warning",
      button: "Oh no!",
    });
  }

  const li = document.createElement("li");
  li.innerText = task;

  li.appendChild(eraseButton);

  taskList.appendChild(li);
  const input = document.getElementsByClassName("emoji-wysiwyg-editor")[0];
  input.innerHTML = "";
  document.getElementById("task").value = "";

  addTaskToLocalStorage(task, emoji);

  swal({
    title: "🎉!",
    text: "Your task has been added!",
    icon: "success",
    button: "Oh yeah!",
  });
}
// Remove tasks from the list
function deleteTask(e) {
  e.preventDefault();
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover you task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      if ((e.target.className === "delete-task", "decoration")) {
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement.innerText);
        swal("Poof! Your task has been deleted!", {
          icon: "success",
        });
      }
    } else {
      swal("Your task is safe!", {
        icon: "info",
      });
    }
  });
}

// Mostrar datos de LocalStorage en la lista
function localStorageDone() {
  let tasks, emojis;

  tasks = getTasksFromLocalStorage();

  emojis = getTasksFromLocalStorage();

  tasks.forEach(function (task, emoji) {
    const eraseButton = document.createElement("a");
    eraseButton.classList = "delete-task";
    eraseButton.innerText = "❌";
    const li = document.createElement("li");
    li.innerText = task;
    li.appendChild(eraseButton);
    taskList.appendChild(li);
  });
}

// Local torage functions
function addTaskToLocalStorage(task, emoji) {
  let tasks;
  tasks = getTasksFromLocalStorage();
  // Añadir el nuevo task
  tasks.push(task);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

function addThemeToLocalStorage(theme) {
  localStorage.setItem("theme", theme);
}

function getThemeFromLocalStorage() {
  return localStorage.getItem("theme");
}

// Delete a task from local storage
function deleteTaskFromLocalStorage(task, emoji) {
  let tasks, taskErase;
  // Removes the ❌ from the task
  taskErase = task.substring(0, task.length - 1);

  tasks = getTasksFromLocalStorage();

  tasks.forEach(function (task, emoji, index) {
    if (taskErase === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme functions
function white() {
  document.body.style.backgroundColor = "white";
  document.body.style.color = "black";
  document.querySelector(".emoji-picker-icon").style.color = "black";
  addThemeToLocalStorage("white");
}

function black() {
  document.body.style.backgroundColor = "#191919";
  document.body.style.color = "white";
  document.querySelector(".emoji-picker-icon").style.color = "white";
  addThemeToLocalStorage("black");
  document.getElementsByName("text").style.border = "white";
}

function checkTheme() {
  const theme = getThemeFromLocalStorage();
  if (theme === "black") {
    black();
  } else {
    white();
  }
}

// On load
checkTheme();
