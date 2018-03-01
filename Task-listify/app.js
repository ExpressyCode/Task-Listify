// Get UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTasks = document.querySelector('#clear-tasks');
const taskInput = document.querySelector('#task');
const showTasks = document.querySelector('#showTasks');

// Load all event listeners
(function() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Load UI
  loadUI();
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task 
  clearTasks.addEventListener('click', clearAllTasks);
})();

// Get tasks from LocalStorage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Append text to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a')
  // Add class
  link.className = 'float-right';
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>'
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  });
  
  // Check if ul is empty
  loadUI();
}

// Load UI
function loadUI() {
  if(taskList.innerHTML === '') {
    showTasks.style.display = 'none';
  } else {
    showTasks.style.display = 'block';
  }
}

// GetTask
function addTask(e) {
  // Check for task entered
  if(taskInput.value === '') {
    alert('Please enter task!');
    return;
  }

  // TaskInput value
  const text = taskInput.value;

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  // Append text to li
  li.appendChild(document.createTextNode(text));
  // Create new link element
  const link = document.createElement('a')
  // Add class
  link.className = 'float-right';
  // Add icon html
  link.innerHTML = '<i class="fas fa-trash-alt"></i>'
  // Append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Store in LocalStorage
  storeTaskInLocalStorage(text);
  // Clear input
  taskInput.value = '';
  // Check if ul is empty
  loadUI();
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('float-right') ) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }

  // Check if ul is empty
  loadUI();
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasks() {
  if(confirm('Are you sure?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  // Clear from LocalStorage
  clearTasksFromLocalStorage();

  // Check if ul is empty
  loadUI();
}

// Clear tasks from LocalStorage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}