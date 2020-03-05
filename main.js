// DOM node variables
var addTaskBtn = document.querySelector('.add-task-btn');
var toDoTitle = document.querySelector('.todo-title');
var newTaskInput = document.querySelector('.new-task-input');
var currentTasksDisplay = document.querySelector('.current-tasks-display');
var makeToDoBtn = document.querySelector('.new-todo-btn');
var toDoDisplay = document.querySelector('.tasks-display');
var clearAllBtn = document.querySelector('.clear-all-btn');
var checkBoxes = document.querySelectorAll('.task-checkbox');

// global variables
var currentTasks = [];
var listOfToDoLists = [];
var storedToDos = JSON.parse(localStorage.getItem('toDos'));

// event listeners
addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);
makeToDoBtn.addEventListener('click', makeToDoList);
clearAllBtn.addEventListener('click', clearCurrentTasks);
toDoDisplay.addEventListener('click', checkOffTask);

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
function deleteCurrentTask(e) {
  if (e.target.matches('.delete-current-task')) {
    var index = e.target.closest('li').classList[1].slice(4);
    currentTasks.splice(index, 1);
    e.target.closest('li').remove();
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
    if (toDo[i].done === true) {
      innerTasks.innerHTML += `<li><img class="task-checkbox" src="assets/checkbox-active.svg">${toDo[i].taskDescription}</li>`;
    } else {
      innerTasks.innerHTML += `<li><img class="task-checkbox" src="assets/checkbox.svg">${toDo[i].taskDescription}</li>`;
    }
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
      </div>`;
    toDoDisplay.insertBefore(newToDoCard, toDoDisplay.childNodes[0])
    makeInnerTaskList(toDoArray[i].tasks, document.querySelector(`.card-inner-tasks${i}`));
  }
}

function parseStoredTasks(taskArray) {
  var tasks = [];
  for (var i = 0; i < taskArray.length; i++) {
    var task = new Task(taskArray[i].taskDescription);
    tasks.push(task);
  }
  return tasks;
}

function parseStoredToDos(storedToDos) {
  var toDoArray = [];
  for (var i = 0; i < storedToDos.length; i++) {
    var toDo = new ToDoList(storedToDos[i].title, parseStoredTasks(storedToDos[i].tasks));
    toDoArray.push(toDo);
  }
  return toDoArray;
}

function checkOffTask(e) {
  if (e.target.closest('.task-checkbox')) {
    e.target.src = 'assets/checkbox-active.svg';
  }
  getIndexOfNode(e, parseStoredToDos(storedToDos));
}

function getIndexOfNode(e, toDos) {
  for (var i = 0; i < toDos.length; i++) {
    for (var j = 0; j < toDos[i].tasks.length; j++) {
      var title = e.target.parentNode.innerText;
      var taskDescription = storedToDos[i].tasks[j].taskDescription;
      if (title === taskDescription) {
        toDos[i].updateTask(j, toDos);
      }
    }
  }
  displayToDos(JSON.parse(localStorage.getItem('toDos')));
}
