import React, { useState } from "react";

function Create({ onAdd }) {
  const [task, setTask] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const res = await fetch("http://localhost:3001/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    const newTodo = await res.json();
    setTask("");
    if (onAdd) onAdd(newTodo);
  };

  return (
    <form className="create_form" onSubmit={handleAdd}>
      <input
        type="text"
        className="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Create;
