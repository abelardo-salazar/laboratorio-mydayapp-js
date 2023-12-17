let todoList = undefined;
let filteredList = undefined;

const todoListStorageKey = "mydayapp-js";

// nodes
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const todoListContainer = document.querySelector(".todo-list");
export const newTodoInput = document.querySelector(".new-todo");
export const clearCompletedBtn = document.querySelector(".clear-completed");

const getLocalTodos = () => {
  const localTodos = localStorage.getItem(todoListStorageKey);
  if (localTodos) {
    todoList = JSON.parse(localTodos);
  } else {
    todoList = [];
  }
};

const onToggleClick = (todoToUpdate) => {
  return () => {
    const idToUpdate = todoToUpdate.id;
    const indexToUpdate = todoList.findIndex((todo) => todo.id === idToUpdate);
    todoList[indexToUpdate].completed = !todoList[indexToUpdate].completed;
    goHome();
  };
};

const toggleEditMode = (todoWrapper, todoEditInput) => {
  return () => {
    todoWrapper.classList.add("editing");
    const prevTitle = todoEditInput.value;
    todoEditInput.focus();
    todoEditInput.select();
    todoEditInput.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        const idToUpdate = parseInt(todoWrapper.getAttribute("id"));
        editTodo(idToUpdate, todoEditInput.value.trim());
        todoWrapper.classList.remove("editing");
      } else if (e.keyCode == 27) {
        todoEditInput.value = prevTitle;
        todoWrapper.classList.remove("editing");
      }
    });
  };
};

const editTodo = (idToUpdate, updatedTitle) => {
  const indexToUpdate = todoList.findIndex((todo) => todo.id === idToUpdate);
  todoList[indexToUpdate].title = updatedTitle;
  fillList();
};

const deleteTodo = (id) => {
  return () => {
    const index = todoList.findIndex((todo) => todo.id === id);
    todoList.splice(index, 1);
    goHome();
  };
};

const setCounter = () => {
  const counterContainer = document.querySelector(".todo-count");
  const pendingTasksCount = todoList.filter((todo) => !todo.completed).length;
  counterContainer.innerHTML = `<strong>${pendingTasksCount}</strong> ${
    pendingTasksCount === 1 ? "item" : "items"
  } left`;
};

export const clearCompleted = () => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].completed) {
      console.log(todoList[i]);
      todoList.splice(i, 1);
      i--;
    }
  }
  goHome();
};

const createTodoItem = ({ id, title = "", completed = false }) => {
  const todoWrapper = document.createElement("li");
  todoWrapper.setAttribute("id", id);
  todoWrapper.setAttribute("completed", completed);
  if (completed) {
    todoWrapper.classList.add("completed");
  }

  const todoView = document.createElement("div");
  todoView.setAttribute("class", "view");

  const todoToggle = document.createElement("input");
  todoToggle.setAttribute("class", "toggle");
  todoToggle.setAttribute("type", "checkbox");
  todoToggle.style.cursor = "pointer";
  if (completed) {
    todoToggle.setAttribute("checked", true);
  }
  todoToggle.addEventListener("click", onToggleClick({ id, title, completed }));
  todoView.appendChild(todoToggle);

  const todoLabel = document.createElement("label");
  todoLabel.innerHTML = title;
  todoLabel.style.cursor = "pointer";

  const todoEditInput = document.createElement("input");
  todoEditInput.setAttribute("class", "edit");
  todoEditInput.setAttribute("value", title);

  todoLabel.addEventListener(
    "click",
    toggleEditMode(todoWrapper, todoEditInput)
  );
  todoView.appendChild(todoLabel);

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.setAttribute("class", "destroy");
  todoDeleteBtn.addEventListener("click", deleteTodo(id));
  todoView.appendChild(todoDeleteBtn);

  todoWrapper.appendChild(todoView);

  todoWrapper.appendChild(todoEditInput);

  todoListContainer.appendChild(todoWrapper);
};

const fillList = (filtered = false) => {
  const list = filtered ? filteredList : todoList;
  todoListContainer.innerHTML = "";
  list.forEach((todo) => {
    createTodoItem(todo);
  });
  onListChange();
};

const onListChange = () => {
  if (
    todoListContainer.children.length === 0 ||
    !todoList ||
    todoList.length === 0
  ) {
    main.hidden = true;
    footer.hidden = true;
  } else {
    main.hidden = false;
    footer.hidden = false;
    setCounter();
  }
  localStorage.setItem(todoListStorageKey, JSON.stringify(todoList));
};

export const onDOMLoad = () => {
  document.addEventListener("DOMContentLoaded", () => {
    getLocalTodos();
    newTodoInput.autofocus = true;
    navigator();
  });
};

export const appendTodo = (title) => {
  if (title.trim().length > 0) {
    todoList.push({
      title: title.trim(),
      id: Math.floor(Math.random() * 100),
      completed: false,
    });
  }
  goHome();
};

const goHome = () => {
  fillList()
  location.hash = "#";
};

export const navigator = () => {
  if (location.hash.startsWith("#/pending")) {
    if (todoList) {
      filteredList = todoList.filter((todo) => !todo.completed);
      fillList(true);
    }
  } else if (location.hash.startsWith("#/completed")) {
    if (todoList) {
      filteredList = todoList.filter((todo) => todo.completed);
      fillList(true);
    }
  } else {
    console.log("holi")
    fillList();
  }
};
