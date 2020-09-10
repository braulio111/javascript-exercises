console.log('Hola');

// Create new todo => task
// Edit todo => task
// Complete todo
// Delete todo

const INCOMPLETED = 'incompleted';
const COMPLETED = 'completed';
window.onload = displayTasks;

class Task {
  constructor(name) { 
    this.name = name;
    this.status = INCOMPLETED;
  }

  edit(name) {
    this.name = name;    
  }

  complete() {
    this.status = COMPLETED;
    return this;
  }

  incomplete() {
    this.status = INCOMPLETED;
  }
}

class LocalStorage {
  constructor(key) {
    this.key = key;
  }

  getData() {
    const data = localStorage.getItem(this.key);

    return JSON.parse(data);
  }

  saveData(data) {
    console.log(data.map(x => x.name));
    const parsedData = JSON.stringify(data);

    localStorage.setItem(this.key, parsedData);
  }
}

class TaskList {
  constructor() {
    this.localStorage = new LocalStorage('taskList');
    this.items = this.localStorage.getData();
  }

  saveItemsInStorage() {
    this.localStorage.saveData(this.items);
  }

  add(item) {
    this.items.push(item);
    this.saveItemsInStorage();
  }

  reset() {
    this.items = [];
    this.saveItemsInStorage();
    x.innerHTML = '';
  }
}

const tasks = new TaskList();

document.querySelector('#taskForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newTask = new Task(formData.get('task'));

  tasks.add(newTask);
  
});

document.querySelector('#reset-tasks').addEventListener('click', function(e) {
  tasks.reset();
});

var x = document.querySelector('.tasksDisplay');

function displayTasks() {
  x.innerHTML = '';
  for(var i = 0; i < tasks.items.length; i++) {
    x.innerHTML += "<p>" + tasks.items[i].name + "</p>";
  }
}

document.querySelector('#taskForm').addEventListener('submit', displayTasks);