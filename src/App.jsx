import { useState, useEffect } from "react";
import "./App.css";
import { ToDoContextProvider } from "./contexts";
import TodoForm from "./components/todoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosList = JSON.parse(localStorage.getItem("todos"))
    if (todosList && todosList.length > 0) {
      setTodos(todosList)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const updateTodo = (id, todo) => {
    console.log(id, todo);
    // setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, todo: todo } : prevTodo))
    );
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <ToDoContextProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos &&
              todos.map((t) => (
                <div key={t.id} className="w-full">
                  <TodoItem todo={t} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  );
}

export default App;
