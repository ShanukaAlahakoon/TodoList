import React, { useEffect } from "react";
import Create from "./Create";
import "./App.css";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";

function Home() {
  const [todos, setTodos] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/get")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/delete/${id}`, { method: "DELETE" }).then(() =>
      setTodos((prev) => prev.filter((todo) => todo._id !== id))
    );
  };

  const handleToggle = (id) => {
    fetch(`http://localhost:3001/toggle/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, done: updatedTodo.done } : todo
          )
        );
      });
  };

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create onAdd={(newTodo) => setTodos((prev) => [...prev, newTodo])} />
      {todos.length === 0 ? (
        <div>No todos available</div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className={`todo-item${todo.done ? " done" : ""}`}
          >
            <span>{todo.task}</span>
            <FaCheckCircle
              className="icon check"
              title="Mark as done"
              onClick={() => handleToggle(todo._id)}
            />
            <FaTrashAlt
              className="icon delete"
              title="Delete"
              onClick={() => handleDelete(todo._id)}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
