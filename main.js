// DOM nodes
var addTaskBtn = document.querySelector('.add-task-btn');
var toDoTitle = document.querySelector('.todo-title');
var newTaskInput = document.querySelector('.new-task-input');
var currentTasksDisplay = document.querySelector('.current-tasks-display');
var makeToDoBtn = document.querySelector('.new-todo-btn');
var toDoDisplay = document.querySelector('.tasks-display');
var clearAllBtn = document.querySelector('.clear-all-btn');

// global variables
var currentTasks = [];
var listOfToDoLists = [];
var storedToDos = JSON.parse(localStorage.getItem('toDos'));

addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);
makeToDoBtn.addEventListener('click', makeToDoList);
clearAllBtn.addEventListener('click', clearCurrentTasks);

// sets local storage if not previously set
window.onload = function() {
  if (!localStorage.getItem('toDos')) {
    localStorage.setItem('toDos', JSON.stringify([]));
  }
  if (localStorage.toDos.length > 2) {
    displayToDos(JSON.parse(localStorage.getItem('toDos')));
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
    var index = event.target.closest('li').classList[1].slice(4);
    currentTasks.splice(index, 1);
    event.target.closest('li').remove();
  }
}

// clear currentTasks array and currentTasks nodelist
function clearCurrentTasks() {
  currentTasks = [];
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
  toDo.saveToStorage(toDo);
  displayToDos(JSON.parse(localStorage.getItem('toDos')));
  clearCurrentTasks();
}

// make inner task list for todo card
function makeInnerTaskList(toDo, innerTasks) {
  for (var i = 0; i < toDo.length; i++) {
    innerTasks.innerHTML += `<li><img src="assets/checkbox.svg">${toDo[i].taskDescription}</li>`;
  }
}

// display todo list cards
function displayToDos(toDoArray) {
  var toDosStorageArray = JSON.parse(localStorage.getItem('toDos'));

  toDoDisplay.innerHTML = '';
  for (var i = 0; i < toDoArray.length; i++) {
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
    toDoDisplay.insertBefore(newToDoCard, toDoDisplay.childNodes[0])
    makeInnerTaskList(toDoArray[i].tasks, document.querySelector(`.card-inner-tasks${i}`));
  }
}
