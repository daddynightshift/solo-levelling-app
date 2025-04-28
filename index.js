const app = document.getElementById("root");

const savedGoals = JSON.parse(localStorage.getItem("goals")) || [
  { name: "Push-ups", target: 100, current: 0 },
  { name: "Sit-ups", target: 100, current: 0 },
  { name: "Steps", target: 10000, current: 0 }
];

const lastDate = localStorage.getItem("lastDate");
const today = new Date().toISOString().split("T")[0];

if (lastDate !== today) {
  // New day = reset all current progress
  savedGoals.forEach(goal => goal.current = 0);
  localStorage.setItem("lastDate", today);
  localStorage.setItem("goals", JSON.stringify(savedGoals));
}

const goals = savedGoals
function saveGoals() {
  localStorage.setItem("goals", JSON.stringify(goals));
}

function render() {
  app.innerHTML = `<h1>Level Up Tracker</h1>`;
  goals.forEach((goal, i) => {
    app.innerHTML += `
      <div>
        <strong>${goal.name}</strong><br>
        ${goal.current} / ${goal.target}
        <input type="number" id="input-${i}" placeholder="Add progress">
        <button onclick="updateGoal(${i})">Add</button>
        <button onclick="editGoal(${i})">Edit</button>
        <button onclick="deleteGoal(${i})">Delete</button>
        <hr>
      </div>
    `;
  });
  app.innerHTML += `
    <button onclick="addGoal()">+ Add New Goal</button>
  `;
}

function updateGoal(i) {
  const val = document.getElementById(`input-${i}`).value;
  goals[i].current += parseInt(val) || 0;
  saveGoals();
  render();
}

function addGoal() {
  const name = prompt("Goal name:");
  const target = parseInt(prompt("Target number:"));
  if (name && target) {
    goals.push({ name, target, current: 0 });
    saveGoals();
    render();
  }
}

function editGoal(i) {
  const name = prompt("New goal name:", goals[i].name);
  const target = parseInt(prompt("New target number:", goals[i].target));
  if (name && target) {
    goals[i].name = name;
    goals[i].target = target;
    saveGoals();
    render();
  }
}

function deleteGoal(i) {
  if (confirm("Delete this goal?")) {
    goals.splice(i, 1);
    saveGoals();
    render();
  }
}

render();
