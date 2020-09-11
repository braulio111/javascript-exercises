console.log('Hola');

// Create new todo => task
// Edit todo => task
// Complete todo
// Delete todo

const INCOMPLETED = 'incompleted';
const COMPLETED = 'completed';

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
  constructor($taskList, storageKey) {
    this.localStorage = new LocalStorage(storageKey);
    this.items = this.localStorage.getData() || [];
    this.$taskList = $taskList;
  }

  saveItemsInStorage() {
    this.localStorage.saveData(this.items);
  }

  add(item) {
    this.items.push(item);
    this.saveItemsInStorage();
    this.updateUi();
  }

  reset() {
    this.items = [];
    this.saveItemsInStorage();
    this.updateUi();
  }

  updateUi() {
    this.$taskList.innerHTML = '';
    this.items.forEach(this.createItemElement, this);
  }

  createItemElement(item) {
    const $task = document.createElement('P');
    $task.innerHTML = item.name;
    this.$taskList.appendChild($task);
  }
}

class App {
  constructor($taskList, $form, $resetButton, storageKey) {
    this.taskList = new TaskList($taskList, storageKey);
    this.$form = $form;
    this.$resetButton = $resetButton;

    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  start() {
    this.$form.addEventListener('submit', this.onSubmit);
    this.$resetButton.addEventListener('click', this.onReset);
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newTask = new Task(formData.get('task'));
    
    this.taskList.add(newTask);
  }

  onReset() {
    this.taskList.reset();
  }
}

const foodList = new App(
  document.querySelector('.foodDisplay'),
  document.querySelector('#food-form'),
  document.querySelector('#food-button'),
  'food',
).start();

const taskList = new App(
  document.querySelector('.tasksDisplay'),
  document.querySelector('#taskForm'),
  document.querySelector('#reset-tasks'),
  'tasks',
).start();

