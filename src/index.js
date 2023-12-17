import "./css/base.css";

import {
  onDOMLoad,
  newTodoInput,
  appendTodo,
  clearCompletedBtn,
  clearCompleted,
  navigator
} from "./js/utils";

onDOMLoad();
window.addEventListener("hashchange", navigator, false)

newTodoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    appendTodo(newTodoInput.value);
    newTodoInput.value = "";
  }
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// onEmptyListHideLayout()
