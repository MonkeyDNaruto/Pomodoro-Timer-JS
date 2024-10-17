const taskContainer = document.querySelector(".task-container");
const submitButton = document.querySelector(".submit-button");
const timeLeftDisplay = document.querySelector("#time-left");
const sliderFill = document.querySelector(".fill");

const startCount = 25 * 60;
let timeLeft = startCount;
let timerId;

const tasks = [
  {
    name: "Practice CSS Animation",
    priority: 0,
  },
  {
    name: "Learning Js",
    priority: 2,
  },
  {
    name: "Learning Python",
    priority: 1,
  },
];

// sort by priority
const descendingTasks = tasks.sort(
  (taskA, taskB) => taskA.priority - taskB.priority
);

// convert seconds to minutes format for display
function convertToMin(secondsLeft) {
  const minutes = Math.floor(secondsLeft / 60);
  seconds = secondsLeft - minutes * 60;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// handle the start/pause funtionality
function handleClick(button) {
  switch (button.textContent) {
    case "ACTIVE":
      button.textContent = "PAUSED";
      clearInterval(timerId);
      break;
    case "PAUSED":
      button.textContent = "ACTIVE";
      countDown(button);
      break;
    default:
      const allButtons = document.querySelectorAll(".controller-button");
      allButtons.forEach((button) => {
        button.textContent = "START";
        button.classList.remove("active-button");
        clearInterval(timerId);
        timeLeft = startCount;
        timeLeftDisplay.textContent = convertToMin(timeLeft);
      });

      button.textContent = "ACTIVE";
      button.classList.add("active-button");
      countDown(button);
      break;
  }
}

// countdown timer
function countDown(button) {
  timerId = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = convertToMin(timeLeft);
    sliderFill.style.width = (timeLeft / startCount) * 100 + "%";
    if (timeLeft <= 0) {
      clearInterval(timerId);
      delete descendingTasks[button.id];
      button.parentNode.remove();
      timeLeft = startCount;
      timeLeftDisplay.textContent = convertToMin(timeLeft);
    }
  }, 1000);
}

// create tasks in the array
function render() {
  descendingTasks.forEach((task, index) => {
    const taskBlock = document.createElement("div");
    const deleteElement = document.createElement("p");
    const title = document.createElement("p");
    const controllerButton = document.createElement("button");

    taskBlock.classList.add("task-block");
    deleteElement.classList.add("delete-icon");
    controllerButton.classList.add("controller-button");

    deleteElement.textContent = "☒";
    title.textContent = task.name;
    controllerButton.textContent = "START";

    controllerButton.id = index;

    deleteElement.addEventListener("click", deleteTask);
    controllerButton.addEventListener("click", () =>
      handleClick(controllerButton)
    );

    taskBlock.append(deleteElement, title, controllerButton);
    taskContainer.append(taskBlock);
  });
}

render();

// delete a task
function deleteTask(e) {
  e.target.parentNode.remove();
  delete descendingTasks[e.target.parentNode.lastChild.id];
}

// add a task
function addTask() {
  const inputElement = document.querySelector("input");
  const value = inputElement.value;
  if (value) {
    taskContainer.innerHTML = "";
    tasks.push({
      name: value,
      priority: tasks.length,
    });
    inputElement.value = "";
    render();
  }
}

submitButton.addEventListener("click", addTask);
