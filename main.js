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
var toDoTitle = document.querySelector('.todo-title');
var newTaskInput = document.querySelector('.new-task-input');
var currentTasksDisplay = document.querySelector('.current-tasks-display');
var makeToDoBtn = document.querySelector('.new-todo-btn');
var toDoDisplay = document.querySelector('.tasks-display');

// global variables
var currentTasks = [];
var listOfToDoLists = [];


addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);
makeToDoBtn.addEventListener('click', makeToDoList);

// displays prompt if there are no Todo lists in localStorage
// window.onload = function() {
//   if (!localStorage.getItem('toDos')) {
//     document.querySelector('.prompt').classList.remove('hidden');
//   }
// }

// function hidePrompt() {
//   if (!document.querySelector('.prompt').classList.contains('hidden')) {
//     document.querySelector('.prompt').classList.add('hidden');
//   } else {
//     return;
//   }
// }

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
    var index = event.target.closest('li').classList[1].slice(4);
    currentTasks.splice(index, 1);
    event.target.closest('li').remove();
  }
}

// clear currentTasks array and currentTasks nodelist
function clearCurrentTasks() {
    currentTasks = [];
    // listOfToDoLists = [];
    toDoTitle.value = '';
    newTaskInput.value = '';
    currentTasksDisplay.innerHTML = '';
}

// creates to do list
function makeToDoList() {
  if (toDoTitle.value === '') {
    return;
  }
  var toDo = new ToDoList(toDoTitle.value, currentTasks);
  listOfToDoLists.push(toDo);
  displayToDos(listOfToDoLists);
  clearCurrentTasks();
}

// make inner task list for todo card
function makeInnerTaskList(toDo, innerTasks) {
    for (var i = 0; i < toDo.length; i++) {
      innerTasks.innerHTML += `
        <li><img src="assets/checkbox.svg">${toDo[i].taskDescription}</li>
      `;
    }
}

// display todo list cards
function displayToDos(toDoArray) {
  var toDosStorageArray = JSON.parse(localStorage.getItem('toDos'));
  toDoDisplay.innerHTML = '';
  for (var i = 0; i < toDoArray.length; i++) {
    // var innerTasks = document.querySelector('.card-inner-tasks');
    var newToDoCard = document.createElement('div');
    newToDoCard.classList.add('to-do-task');
    newToDoCard.innerHTML = `
    <div class="to-do-task">
      <p>${toDoArray[i].title}</p>
      <ul class="card-inner-tasks${i}">
      </ul>
      <div class="urgent-delete">
        <div class="urgent-icon">
          <img src="assets/urgent.svg" alt="">
          <p>URGENT</p>
        </div>
        <div class="delete-icon">
          <img src="assets/delete.svg" alt="">
          <p>DELETE</p>
        </div>
      </div>
    </div>`;
    toDoDisplay.appendChild(newToDoCard);
    makeInnerTaskList(toDoArray[i].tasks, document.querySelector(`.card-inner-tasks${i}`));
  }
}
