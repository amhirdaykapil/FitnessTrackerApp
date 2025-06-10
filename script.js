let activities = JSON.parse(localStorage.getItem("fitnessData")) || [];

document.getElementById("fitness-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("activity").value;
  const duration = parseInt(document.getElementById("duration").value);
  const calories = parseInt(document.getElementById("calories").value);
  const steps = parseInt(document.getElementById("steps").value) || 0;
  const date = new Date().toDateString();

  const activity = { name, duration, calories, steps, date };

  activities.push(activity);
  localStorage.setItem("fitnessData", JSON.stringify(activities));

  this.reset();
  updateUI();
});

function resetData() {
  if (confirm("Are you sure you want to delete all fitness data?")) {
    localStorage.removeItem("fitnessData");
    activities = [];
    updateUI();
  }
}

function updateUI() {
  const logList = document.getElementById("log-list");
  logList.innerHTML = "";

  let today = new Date().toDateString();
  let now = new Date();

  let todayTime = 0, todayCalories = 0, todaySteps = 0;
  let weekTime = 0, weekCalories = 0, weekSteps = 0;

  activities.forEach(act => {
    const actDate = new Date(act.date);
    const diff = (now - actDate) / (1000 * 60 * 60 * 24);

    const li = document.createElement("li");
    li.textContent = `${act.name} - ${act.duration} mins, ${act.calories} kcal, ${act.steps} steps (${act.date})`;
    logList.appendChild(li);

    if (act.date === today) {
      todayTime += act.duration;
      todayCalories += act.calories;
      todaySteps += act.steps;
    }

    if (diff <= 7) {
      weekTime += act.duration;
      weekCalories += act.calories;
      weekSteps += act.steps;
    }
  });

  document.getElementById("today-time").innerText = todayTime;
  document.getElementById("today-calories").innerText = todayCalories;
  document.getElementById("today-steps").innerText = todaySteps;

  document.getElementById("week-time").innerText = weekTime;
  document.getElementById("week-calories").innerText = weekCalories;
  document.getElementById("week-steps").innerText = weekSteps;

  // update progress bars
  document.getElementById("time-bar").style.width = Math.min(weekTime, 300) / 3 + "%";
  document.getElementById("calories-bar").style.width = Math.min(weekCalories, 5000) / 50 + "%";
  document.getElementById("steps-bar").style.width = Math.min(weekSteps, 70000) / 700 + "%";
}

updateUI();
