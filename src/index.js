import "./css/base.css";

import {
  onDOMLoad,
  newTodoInput,
  appendTodo,
  clearCompletedBtn,
  clearCompleted,
} from "./js/utils";

onDOMLoad();

newTodoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    appendTodo(newTodoInput.value);
    newTodoInput.value = "";
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// onEmptyListHideLayout()
