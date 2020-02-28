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
// global variables
var currentTasks = [];


addTaskBtn.addEventListener('click', makeNewTask);

window.onload = function() {
  if (!localStorage.getItem('toDos')) {
    document.querySelector('.prompt').classList.remove('hidden')
  }
}

function makeNewTask() {
   var task = new Task(newTaskInput.value);

}

function displayToDos() {
  var toDoListArray = JSON.parse(localStorage.getItem('toDos'));
  for (var i = 0; i < toDoListArray.length; )
}
