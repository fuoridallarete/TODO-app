var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

   /// Get number of completed todos.

   this.todos.forEach(function(todo) {
     if (todo.completed === true) {
       completedTodos++;
     }
   });    
   this.todos.forEach(function(todo) {
     /// Case1: If everything's true, make everything's false.
     if (completedTodos === totalTodos) {
      todo.completed = false;
     // Case2: Otherwise, make everything false.
     } else {
       todo.completed = true;
       }
    });
  },
  displayNoTodos: function() {
    var totalTodos = this.todos.length;
    if (totalTodos === 0) {
      document.getElementById("noTodos").textContent = 'You have no todos yet!';
    } else {
      document.getElementById("noTodos").textContent = 'Go on!';
    }
  }
};  

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
    todoList.displayNoTodos();
  },
  changeTodo: function(position, todoText) {
    var changeTodoTextInput = todoText;  
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position){
    var todoLi = document.createElement('li');
    var buttons = document.createElement('div');
    buttons.classList.add('buttons');
    var todoTextWithCompletion = '';
      if (todo.completed === true) {
        todoTextWithCompletion = '[x]' + todo.todoText;
      } else {
        todoTextWithCompletion = '[ ]' + todo.todoText;  
      } 
    var txtSpan = document.createElement('span');
      txtSpan.setAttribute('id', 'span' + position);
      txtSpan.innerText = todoTextWithCompletion;
      todoLi.id = position;
      todoLi.appendChild(txtSpan);
      txtSpan.appendChild(buttons);
      buttons.appendChild(this.createChangeButton(position));
      buttons.appendChild(this.createToggleButton(position));
      buttons.appendChild(this.createDeleteButton());
      todosUl.insertBefore(todoLi, todosUl.childNodes[0]);
    }, this);
    todoList.displayNoTodos();
  },
  createToggleButton: function(position) {
    var toggleButton = document.createElement("button");
    var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" y="0" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
    toggleButton.innerHTML = completeSVG;
    toggleButton.className = "toggleButton";
    toggleButton.id = position;
    return toggleButton;
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
    deleteButton.innerHTML = removeSVG;
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  createChangeButton: function(position){
    var changeButton = document.createElement("button");
    var editSVG = '';
    changeButton.innerHTML = 'Edit'; /*editSVG;*/
    changeButton.className = "changeButton";
    changeButton.id = position;
    return changeButton;
  },
  /* change button text --> becomes save */
  changeButtonText: function(position) {
    var button = document.getElementsByClassName("changeButton")[position];
    button.innerHTML = 'Save';
  },
  setUpEventListeners: function() {
    // Execute a function when the user releases enter key on the keyboard
    addTodoTextInput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("addButton").click();
      }
    });

    var todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event) {
    // Get the element that was clicked on
    var elementClicked = event.target;

    // Check if element clicked is the delete button
    if (elementClicked.className === "deleteButton") {
      // Run handlers.deleteTodo(position)
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));                  
      // parseInt turn string into number (id is a string, position is a number 
      } 
      // Run handlers.changeTodo(position)
    if (elementClicked.className === "changeButton") {
      // parseInt turn string into number (id is a string, position is a number 
      handlers.changeTodo(parseInt(elementClicked.parentNode.id));  
      // call edit-save button function when changeButton is clicked
      view.changeButtonText(elementClicked.id);
      //todoLi becomes editable
      document.getElementById('span' + elementClicked.parentNode.id).contentEditable = 'true';
      focusMethod = function getFocus() {           
        document.getElementById('span' + elementClicked.parentNode.id).focus();
      }
      focusMethod();
    } 
    if (elementClicked.className === "toggleButton") {
      // Run handlers.toggleTodo(position)
      handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));                 
      // parseInt turn string into number (id is a string, position is a number 
      }
    })
  }
}


todoList.displayNoTodos();
view.setUpEventListeners();
