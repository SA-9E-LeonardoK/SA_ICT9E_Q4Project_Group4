// =====================
// DLSU Student Portal
// tasks-proj.js
// =====================

// ---- Task Data ----
let tasks = [
  { name: "MMA Skills Test",          due: "May 30, 2026", status: "notStarted" },
  { name: "MATHEMATICS Drill",         due: "May 10, 2026", status: "notStarted" },
  { name: "ENGLISH Practical Research",due: "May 30, 2026", status: "inProgress" },
  { name: "PHILOSOPHY Research",       due: "May 3, 2026",  status: "done"       }
];

// ---- Progress map ----
const progressMap = {
  notStarted: 10,
  inProgress: 50,
  done: 100
};

// ---- Render all tasks ----
function displayTasks() {
  document.getElementById("notStartedList").innerHTML = "";
  document.getElementById("inProgressList").innerHTML = "";
  document.getElementById("doneList").innerHTML = "";

  tasks.forEach((task, index) => {
    const progress = progressMap[task.status] || 0;

    const card = document.createElement("div");
    card.className = "task-card";
    card.innerHTML = `
      <p class="task-name">${task.name}</p>
      <p class="task-due">Due: ${task.due}</p>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width: 0%;" data-width="${progress}%"></div>
      </div>
      <select class="card-status-select" onchange="changeStatus(${index}, this.value)">
        <option value="notStarted" ${task.status === "notStarted" ? "selected" : ""}>Not Started</option>
        <option value="inProgress" ${task.status === "inProgress" ? "selected" : ""}>In Progress</option>
        <option value="done"       ${task.status === "done"       ? "selected" : ""}>Done</option>
      </select>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;

    const listId = task.status === "notStarted" ? "notStartedList"
                 : task.status === "inProgress" ? "inProgressList"
                 : "doneList";

    document.getElementById(listId).appendChild(card);
  });

  // Animate progress bars
  requestAnimationFrame(() => {
    document.querySelectorAll(".progress-bar-fill").forEach(bar => {
      setTimeout(() => { bar.style.width = bar.dataset.width; }, 60);
    });
  });
}

// ---- Add task ----
function addTask() {
  const name   = document.getElementById("taskName").value.trim();
  const due    = document.getElementById("taskDue").value;
  const status = document.getElementById("taskStatus").value;

  if (!name || !due) {
    alert("Please enter the task name and due date.");
    return;
  }

  // Format date nicely
  const dateObj = new Date(due + "T00:00:00");
  const formatted = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  tasks.push({ name, due: formatted, status });

  document.getElementById("taskName").value   = "";
  document.getElementById("taskDue").value    = "";
  document.getElementById("taskStatus").value = "notStarted";

  displayTasks();
}

// ---- Change status ----
function changeStatus(index, newStatus) {
  tasks[index].status = newStatus;
  displayTasks();
}

// ---- Delete task ----
function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// ---- Nav highlight ----
document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(n => n.classList.remove("active"));
      item.classList.add("active");
      const labels = {
        home: "Home", classes: "Classes", dashboard: "Dashboard",
        tasks: "Tasks", profile: "Profile", feed: "Student Feed"
      };
      const titleEl = document.querySelector(".topbar-title");
      if (titleEl) titleEl.textContent = labels[item.dataset.page] || item.dataset.page;
    });
  });

  document.getElementById("addTaskBtn").addEventListener("click", addTask);

  displayTasks();
});

const hamburger = document.getElementById('hamburger');
const dropdown  = document.getElementById('hamburger-dropdown');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('active');
});

// Close when clicking anywhere else
document.addEventListener('click', () => {
  dropdown.classList.remove('active');
});