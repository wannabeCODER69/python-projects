const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");
const selectedDateText = document.getElementById("selectedDateText");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");
const progressBar = document.getElementById("progressBar");
const themeToggle = document.getElementById("themeToggle");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let tasksByDate = JSON.parse(localStorage.getItem("tasksByDate")) || {};

// Month being viewed
let viewDate = new Date();

// Date currently selected for checklist
let selectedDate = new Date();

/* ---------- HELPERS ---------- */
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

/* ---------- CALENDAR ---------- */
function renderCalendar() {
  calendar.innerHTML = "";

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  monthTitle.textContent = viewDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    const dateStr = formatDate(dateObj);

    const div = document.createElement("div");
    div.textContent = day;
    div.className = "day";

    if (dateStr === formatDate(selectedDate)) {
      div.classList.add("active");
    }

    div.onclick = () => {
      selectedDate = dateObj;
      selectedDateText.textContent = `Checklist for ${dateStr}`;
      renderCalendar();
      renderTasks();
    };

    calendar.appendChild(div);
  }
}

/* ---------- TASKS ---------- */
function renderTasks() {
  const dateKey = formatDate(selectedDate);
  const tasks = tasksByDate[dateKey] || [];

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = task.done;
    cb.onchange = () => toggleTask(index);

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("completed");

    li.append(cb, span);
    taskList.appendChild(li);
  });

  updateProgress(tasks);
}

function addTask() {
  const key = formatDate(selectedDate);
  if (!taskInput.value.trim()) return;

  if (!tasksByDate[key]) tasksByDate[key] = [];
  tasksByDate[key].push({ text: taskInput.value, done: false });

  taskInput.value = "";
  save();
  renderTasks();
}

function toggleTask(index) {
  const key = formatDate(selectedDate);
  tasksByDate[key][index].done = !tasksByDate[key][index].done;
  save();
  renderTasks();
}

/* ---------- PROGRESS ---------- */
function updateProgress(tasks) {
  if (!tasks.length) {
    progressBar.style.width = "0%";
    return;
  }
  const done = tasks.filter(t => t.done).length;
  progressBar.style.width = (done / tasks.length) * 100 + "%";
}

/* ---------- STORAGE ---------- */
function save() {
  localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
}

/* ---------- MONTH SWITCH ---------- */
prevMonthBtn.onclick = () => {
  viewDate.setMonth(viewDate.getMonth() - 1);
  renderCalendar();
};

nextMonthBtn.onclick = () => {
  viewDate.setMonth(viewDate.getMonth() + 1);
  renderCalendar();
};

/* ---------- DARK MODE ---------- */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

/* ---------- INIT ---------- */
selectedDateText.textContent = `Checklist for ${formatDate(selectedDate)}`;
renderCalendar();
renderTasks();
addBtn.onclick = addTask;
