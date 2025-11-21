// Load tasks on page load
document.addEventListener("DOMContentLoaded", loadTasks);

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    createTaskElement(task);
    saveTask(task);
    input.value = "";
}

function createTaskElement(task) {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button class="delete">X</button>
    `;

    // Toggle complete on click
    li.querySelector(".task-text").addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete task
    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

// Update localStorage after edits or deletions
function updateLocalStorage() {
    const taskElements = document.querySelectorAll("#taskList li");
    const tasks = [];

    taskElements.forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
