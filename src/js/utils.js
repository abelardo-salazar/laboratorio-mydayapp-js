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

const createTodoItem = ({ id, title = "", completed = false }) => {
  const todoWrapper = document.createElement("li");
  todoWrapper.setAttribute("id", id);
  todoWrapper.setAttribute("completed", completed);

  const todoView = document.createElement("div");
  todoView.setAttribute("class", "view");

  const todoToggle = document.createElement("input");
  todoToggle.setAttribute("class", "toggle");
  todoToggle.setAttribute("type", "checkbox");
  todoView.appendChild(todoToggle);

  const todoLabel = document.createElement("label");
  todoLabel.innerHTML = title;
  todoView.appendChild(todoLabel);

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.setAttribute("class", "destroy");
  todoView.appendChild(todoDeleteBtn);

  todoWrapper.appendChild(todoView);

  const todoEditInput = document.createElement("input");
  todoEditInput.setAttribute("class", "edit");
  todoEditInput.setAttribute("value", title);
  todoWrapper.appendChild(todoEditInput);

  todoListContainer.appendChild(todoWrapper);
};

export const fillList = () => {
  todoListContainer.innerHTML = "";
  todoList.forEach((todo) => {
    createTodoItem(todo);
  });
  onListLeghtChange()
};

export const onListLeghtChange = () => {
  if (todoListContainer.children.length === 0) {
    main.hidden = true;
    footer.hidden = true;
  } else {
    main.hidden = false;
    footer.hidden = false;
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
