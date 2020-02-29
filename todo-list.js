class ToDoList {
  constructor(title, tasks, urgent) {
    this.title = title;
    this.tasks = tasks;
    this.timeStamp = Date.now();
    this.urgent = urgent || false;
    this.delete = false;
  }

  saveToStorage() {

  }

  deleteFromStorage() {

  }

  updateToDo() {

  }

  updateTask() {

  }

}
