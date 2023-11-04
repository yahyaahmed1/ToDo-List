// DOM Challenge:

let input = document.querySelector("input.input");
let addBtn = document.querySelector("input.add");
let tasks = document.querySelector(".tasks");

// Empty Array for Tasks
let arrTasks = [];

// check if there is data in local storage
if (localStorage.getItem("tasks")) {
  arrTasks = JSON.parse(localStorage.getItem("tasks"));
}

// get data from local storage
GetData();

// Add Task
addBtn.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array
    input.value = ""; // Empty Input Field
  }
};
// click on task
tasks.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    // remove div from page
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    // toggle complete for task
    toggleComleted(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done");
    e.target.classList.toggle("strike");
  }
});

function addTaskToArray(Task) {
  // const Task Data
  const task = {
    id: Date.now(),
    title: Task,
    completed: false,
  };
  // add task to array
  arrTasks.push(task);
  addTasksToPage(arrTasks);
  // add array to local storage
  addToLocalStorage(arrTasks);
}

function addTasksToPage(arrTasks) {
  // empty tasks div
  tasks.innerHTML = "";
  // loop on array of tasks
  arrTasks.forEach((task) => {
    // Div for Each Task
    let div = document.createElement("div");
    div.className = "task";
    // check if task is completed
    if (task.completed) {
      div.className = "task done strike";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // Delete Button For Each Task
    let span = document.createElement("span");
    span.className = "del";
    span.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    // add button to div
    div.appendChild(span);
    // add the task to tasks container
    tasks.appendChild(div);
  });
}

function addToLocalStorage(arrTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrTasks));
}

function GetData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

function deleteFromLocalStorage(taskId) {
  arrTasks = arrTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrTasks);
}

function toggleComleted(taskId) {
  for (let i = 0; i < arrTasks.length; i++) {
    if (arrTasks[i].id == taskId) {
      arrTasks[i].completed == false ? (arrTasks[i].completed = true) : (arrTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrTasks);
}
