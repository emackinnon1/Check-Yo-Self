class ToDoList {
  constructor(title, tasks, urgent) {
    this.title = title;
    this.tasks = tasks;
    this.timeStamp = Date.now();
    this.urgent = urgent || false;
  }

  saveToStorage(obj) {
    var retrievedToDos = JSON.parse(localStorage.getItem('toDos'));
    retrievedToDos.push(obj);
    localStorage.setItem('toDos', JSON.stringify(retrievedToDos));
  }

  deleteFromStorage(index) {
    var retrievedToDos = JSON.parse(localStorage.getItem('toDos'));
    retrievedToDos.splice(index, 1);
    localStorage.setItem('toDos', JSON.stringify(retrievedToDos));
  }

  updateToDo(index) {
    var retrievedToDos = JSON.parse(localStorage.getItem('toDos'));
    retrievedToDos[index].urgent = !this.urgent;
    localStorage.setItem('toDos', JSON.stringify(retrievedToDos));
  }

  updateTask(index, objects) {
    this.tasks[index].done = !this.tasks[index].done;
    localStorage.setItem('toDos', JSON.stringify(objects));
  }

}
