import "./css/base.css";

import { onDOMLoad, newTodoInput, appendTodo } from "./js/utils";

onDOMLoad();

newTodoInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    appendTodo(newTodoInput.value);
    newTodoInput.value = "";
  }
});

// onEmptyListHideLayout()
