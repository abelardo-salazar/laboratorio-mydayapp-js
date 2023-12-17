const todoList = [
  { id: 1, title: "Read a book", completed: true },
  { id: 2, title: "Do the laundry", completed: false },
  { id: 3, title: "Buy groceries", completed: false },
  { id: 4, title: "Prepare dinner", completed: true },
  { id: 5, title: "Workout", completed: false },
];

// nodes
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const todoListContainer = document.querySelector(".todo-list");
export const newTodoInput = document.querySelector(".new-todo");
export const clearCompletedBtn = document.querySelector(".clear-completed");

const onToggleClick = (todoToUpdate) => {
  return () => {
    const idToUpdate = todoToUpdate.id;
    const indexToUpdate = todoList.findIndex((todo) => todo.id === idToUpdate);
    todoList[indexToUpdate].completed = !todoList[indexToUpdate].completed;
    fillList();
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
      console.log(todoList[i])
      todoList.splice(i, 1);
      i--;
    }
  }
  fillList()
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
  todoView.appendChild(todoDeleteBtn);

  todoWrapper.appendChild(todoView);

  todoWrapper.appendChild(todoEditInput);

  todoListContainer.appendChild(todoWrapper);
};

export const fillList = () => {
  todoListContainer.innerHTML = "";
  todoList.forEach((todo) => {
    createTodoItem(todo);
  });
  onListLeghtChange();
};

export const onListLeghtChange = () => {
  if (todoListContainer.children.length === 0) {
    main.hidden = true;
    footer.hidden = true;
  } else {
    main.hidden = false;
    footer.hidden = false;
    setCounter();
  }
};

export const onDOMLoad = () => {
  document.addEventListener("DOMContentLoaded", () => {
    newTodoInput.autofocus = true;
    fillList();
  });
};

export const appendTodo = (title) => {
  if (title.trim().length > 0) {
    todoList.push({ title: title.trim(), id: Math.floor(Math.random() * 100) });
  }
  fillList();
};
