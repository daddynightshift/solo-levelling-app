const app = document.getElementById("root");

const goals = JSON.parse(localStorage.getItem("goals")) || [
  { name: "Push-ups", target: 100, current: 0 },
  { name: "Sit-ups", target: 100, current: 0 },
  { name: "Steps", target: 10000, current: 0 }
];
