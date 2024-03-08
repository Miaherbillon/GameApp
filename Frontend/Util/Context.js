import React, { createContext, useContext, useReducer } from "react";
import INITIAL_STATE from "./init";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "selectId":
      return {
        ...state,
        selectId: action.payload,
      };
    case "question":
      return {
        ...state,
        question: action.payload,
      };

  }
};

const TodoProvider = ({ children }) => {
  const [context, dispatch] = useReducer(todoReducer, INITIAL_STATE);

  return (
    <TodoContext.Provider value={[context, dispatch]}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodoProvider = () => useContext(TodoContext);

export { TodoProvider, useTodoProvider };
