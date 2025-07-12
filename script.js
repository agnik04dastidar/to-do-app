document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const timeInput = document.getElementById("time-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item" + (task.completed ? " completed" : "");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        tasks[index].completed = checkbox.checked;
        saveTasks();
        renderTasks();
      });

      const taskInfo = document.createElement("div");
      taskInfo.className = "task-info";

      const taskDesc = document.createElement("span");
      taskDesc.className = "task-desc";
      taskDesc.textContent = task.description;

      const timeSpan = document.createElement("span");
      timeSpan.className = "task-time";
      timeSpan.textContent = task.timeRange || "";

      taskInfo.appendChild(taskDesc);
      taskInfo.appendChild(timeSpan);

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const editBtn = document.createElement("button");
      editBtn.title = "Edit Task";
      editBtn.innerHTML = `<img src="assets/edit.svg" alt="Edit" class="icon" />`;
      editBtn.onclick = () => {
        const newDesc = prompt("Edit task description:", task.description);
        const newTime = prompt("Edit time range:", task.timeRange || "");
        if (newDesc !== null && newDesc.trim() !== "") {
          tasks[index].description = newDesc.trim();
          tasks[index].timeRange = newTime.trim();
          saveTasks();
          renderTasks();
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.title = "Delete Task";
      deleteBtn.innerHTML = `<img src="assets/delete.svg" alt="Delete" class="icon" />`;
      deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this task?")) {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        }
      };

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      li.prepend(checkbox);
      li.appendChild(taskInfo);
      li.appendChild(actions);
      taskList.appendChild(li);
    });
  }

  addBtn.addEventListener("click", () => {
    const desc = taskInput.value.trim();
    const time = timeInput.value.trim();
    if (desc === "") {
      alert("Task cannot be empty.");
      return;
    }
    tasks.push({ description: desc, timeRange: time, completed: false });
    taskInput.value = "";
    timeInput.value = "";
    saveTasks();
    renderTasks();
  });

  renderTasks();
});
