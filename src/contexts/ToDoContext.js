/* eslint-disable no-unused-vars */
import { useContext, createContext } from "react";

export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            todo: 'ToDo Message',
            completed: false
        }
    ],
    addTodo : (id) => {},
    updateTodo : (id, todo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {},
});

export const ToDoContextProvider = ToDoContext.Provider;

export const useToDoContext = () => {
    return useContext(ToDoContext);
}