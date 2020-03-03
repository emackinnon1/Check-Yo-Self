class ToDoList {
  constructor(title, tasks, urgent) {
    this.title = title;
    this.tasks = tasks;
    this.timeStamp = Date.now();
    this.urgent = urgent || false;
    this.delete = false;
  }

  parseStoredObject(object) {
    // object.title =
  }

  saveToStorage(obj) {
    var retrievedToDos = JSON.parse(localStorage.getItem('toDos'));
    retrievedToDos.push(obj);
    localStorage.setItem('toDos', JSON.stringify(retrievedToDos));
  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }

}
