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
// var toDoTitle = document.querySelector('.todo-title');
var currentTasksDisplay = document.querySelector('.current-tasks-display');
var makeToDoBtn = document.querySelector('.new-todo-btn');

// global variables
var currentTasks = [];
var listOfToDoLists = [];


addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);
makeToDoBtn.addEventListener('click', makeToDoList);

// displays prompt if there are no Todo lists in localStorage
window.onload = function() {
  if (!localStorage.getItem('toDos')) {
    document.querySelector('.prompt').classList.remove('hidden');
  }
}

// instantiates new task according to user input
function makeNewCurrentTask() {
  if (newTaskInput.value === '') {
    return;
  }
  var task = new Task(newTaskInput.value);
  currentTasks.push(task);
  displayCurrentTasks(currentTasks);
}

// displays task objects held in currentTasks array on DOM
function displayCurrentTasks(potentialTaskList) {
  currentTasksDisplay.innerHTML = '';
  for (var i = 0; i < potentialTaskList.length; i++) {
    currentTasksDisplay.innerHTML += `
      <li class="current-task task${i}"><img class="delete-current-task" src="assets/delete.svg" alt="">${potentialTaskList[i].taskDescription}</li>
    `;
  }
  newTaskInput.value = '';
}

// deletes selected task from DOM and from currentTasks array
function deleteCurrentTask(event) {
  if (event.target.matches('.delete-current-task')) {
    console.log(event.target.closest('li').classList[1].slice(4));
    var index = event.target.closest('li').classList[1].slice(4);
    currentTasks.splice(index, 1);
    event.target.closest('li').remove();
  }
}

// creates to do list
function makeToDoList() {
  var toDo = new ToDoList(document.querySelector('.todo-title'), currentTasks);
  listOfToDoLists.push(toDo);
  console.log(listOfToDoLists)
}

function displayToDos() {
  var toDoListStorageArray = JSON.parse(localStorage.getItem('toDos'));
  for (var i = 0; i < toDoListStorageArray.length; i++) {
  }
}
