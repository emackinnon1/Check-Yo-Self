// DOM node variables
var addTaskBtn = document.querySelector('.add-task-btn');
var toDoTitle = document.querySelector('.todo-title');
var newTaskInput = document.querySelector('.new-task-input');
var currentTasksDisplay = document.querySelector('.current-tasks-display');
var makeToDoBtn = document.querySelector('.new-todo-btn');
var toDoDisplay = document.querySelector('.lists');
var clearAllBtn = document.querySelector('.clear-all-btn');
var checkBoxes = document.querySelectorAll('.task-checkbox');

// global variables
var currentTasks = [];
var listOfToDoLists = [];

// event listeners
addTaskBtn.addEventListener('click', makeNewCurrentTask);
currentTasksDisplay.addEventListener('click', deleteCurrentTask);
makeToDoBtn.addEventListener('click', makeToDoList);
clearAllBtn.addEventListener('click', clearCurrentTasks);
toDoDisplay.addEventListener('click', checkOffTask);
toDoDisplay.addEventListener('click', deleteList);
toDoDisplay.addEventListener('click', makeUrgent);

// sets local storage if not previously set
window.onload = function() {
  if (!localStorage.getItem('toDos')) {
    localStorage.setItem('toDos', JSON.stringify([]));
  }
    displayToDos(JSON.parse(localStorage.getItem('toDos')));
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
  if (currentTasksDisplay.childElementCount === 0) {
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
    var newTask = document.createElement('li');
    var newCheckBox = document.createElement('img');
    newCheckBox.src = `${toDo[i].done ? "assets/checkbox-active.svg" : "assets/checkbox.svg"}`
    newTask.setAttribute('data-index', i);
    newCheckBox.classList.add('checkbox');
    innerTasks.appendChild(newTask);
    newTask.appendChild(newCheckBox);
    newTask.innerHTML += `${toDo[i].taskDescription}`;
  }
}

// display todo list cards
function displayToDos(toDoArray) {
  if (toDoArray.length < 1) {
    document.querySelector('.prompt').classList.remove('hidden');
  } else {
    document.querySelector('.prompt').classList.add('hidden');
  }
  toDoDisplay.innerHTML = '';
  for (var i = 0; i < toDoArray.length; i++) {
    var newToDoCard = document.createElement('div');
    newToDoCard.classList.add('to-do-task');
    if (toDoArray[i].urgent) {
      newToDoCard.classList.add("urgent-task");
    }
    newToDoCard.setAttribute('data-index', i);
    newToDoCard.innerHTML = `
      <p>${toDoArray[i].title}</p>
      <ul dataset-index="${i}" class="card-inner-tasks${i}">
      </ul>
      <div class="urgent-delete">
        <div class="urgent-icon">
          <img class="urgent" src="${toDoArray[i].urgent ? "assets/urgent-active.svg" : "assets/urgent.svg"}" alt="">
          <p>URGENT</p>
        </div>
        <div class="delete-icon">
          <img class="delete" src="assets/delete.svg" alt="">
          <p>DELETE</p>
        </div>
      </div>`;
    toDoDisplay.insertBefore(newToDoCard, toDoDisplay.childNodes[0])
    makeInnerTaskList(toDoArray[i].tasks, document.querySelector(`.card-inner-tasks${i}`));
  }
}

// turn tasks into usable instances
function parseStoredTasks(taskArray) {
  var tasks = [];
  for (var i = 0; i < taskArray.length; i++) {
    var task = new Task(taskArray[i].taskDescription, taskArray[i].done);
    tasks.push(task);
  }
  return tasks;
}

// turn todos into usable instances
function parseStoredToDos(toDos) {
  var toDoArray = [];
  for (var i = 0; i < toDos.length; i++) {
    var toDo = new ToDoList(toDos[i].title, parseStoredTasks(toDos[i].tasks), toDos[i].urgent);
    toDoArray.push(toDo);
  }
  return toDoArray;
}

function checkOffTask(e) {
  if (!e.target.matches('.checkbox')) {
    return;
  }
  var toDoIndex = e.target.parentNode.parentNode.parentNode.dataset.index;
  var taskIndex = e.target.parentNode.dataset.index;
  var toDos = parseStoredToDos(JSON.parse(localStorage.getItem('toDos')));

  toDos[toDoIndex].updateTask(taskIndex, toDos);
  displayToDos(toDos);

}

function deleteList(e) {
  var toDoIndex = e.target.parentNode.parentNode.parentNode.dataset.index;
  var toDos = parseStoredToDos(JSON.parse(localStorage.getItem('toDos')));

  if (!e.target.matches('.delete')) {
    return;
  }
  if (!checkIfTasksDone(toDos[toDoIndex].tasks)) {
    return;
  }
  toDos[toDoIndex].deleteFromStorage(toDoIndex);
  displayToDos(JSON.parse(localStorage.getItem('toDos')));
}

//checks to make sure tasks are done before being used in deleteList function
function checkIfTasksDone(taskArray) {
  for (var i = 0; i < taskArray.length; i++) {
    if (taskArray[i].done === false) {
      return false;
    }
  }
  return true;
}

function makeUrgent(e) {
  var toDoIndex = e.target.parentNode.parentNode.parentNode.dataset.index;
  var toDos = parseStoredToDos(JSON.parse(localStorage.getItem('toDos')));

  if (!e.target.matches('.urgent')) {
    return;
  }
  toDos[toDoIndex].updateToDo(toDoIndex);
  displayToDos(JSON.parse(localStorage.getItem('toDos')));
}

// toDoDisplay.childNodes[0].childNodes[5].childNodes[1].childNodes[1]
