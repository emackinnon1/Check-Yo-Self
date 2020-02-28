// function that creates tasks and passes them into array
// function that pushes array of tasks into new todo list
// function that displays the todos
// function that stores todos
// function that sorts todos by date
// function that pulls todos from storage
// function that

// create tasks
// hold them in an array, loop through to display them on new-task-aside
// when you click button to make to do list

// DOM nodes
var addTaskBtn = document.querySelector('.add-task-btn');
var newTaskInput = document.querySelector('.new-task-input');
var taskTitle = document.querySelector('.task-title');
var currentTasksDisplay = document.querySelector('.current-tasks-display');

// global variables
var currentTasks = [];


addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);

window.onload = function() {
  if (!localStorage.getItem('toDos')) {
    document.querySelector('.prompt').classList.remove('hidden');
  }
}

function makeNewCurrentTask() {
  // var currentTasks = [];
  if (newTaskInput.value === '') {
    return;
  }
  var task = new Task(newTaskInput.value);

  currentTasks.push(task);
  displayCurrentTasks(currentTasks);

  var currentTaskNodeList = document.querySelectorAll('.current-task');

  console.log("current task node list", currentTaskNodeList);
  console.log("current task array", currentTasks);
}

function displayCurrentTasks(potentialTaskList) {
  currentTasksDisplay.innerHTML = '';
  for (var i = 0; i < potentialTaskList.length; i++) {
    currentTasksDisplay.innerHTML += `
      <li class="current-task task${i}"><img class="delete-current-task" src="assets/delete.svg" alt="">${potentialTaskList[i].taskDescription}</li>
    `;
  }
  newTaskInput.value = '';
}

function deleteCurrentTask(event) {
  if (event.target.matches('.delete-current-task')) {
    console.log(event.target.closest('li').classList[1].slice(4));
    var index = event.target.closest('li').classList[1].slice(4);
    currentTasks.splice(index, 1);
    event.target.closest('li').remove();

    var currentTaskNodeList = document.querySelectorAll('.current-task');

    console.log("current task node list", currentTaskNodeList);
    console.log("current task array", currentTasks);
  }
}

function displayToDos() {
  var toDoListArray = JSON.parse(localStorage.getItem('toDos'));
  for (var i = 0; i < toDoListArray.length; i++) {
  }
}
