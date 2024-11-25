import axios from "axios";
import React, { useState } from "react";

interface AddTodoProps {
  onTodoAdded: () => void;
}

const AddTodo = ({onTodoAdded}: AddTodoProps) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo === "") return;
    try {
      await axios.post("http://localhost:8000/api/todos/", {
        todo: newTodo,
        userId: 123,
      });
      setNewTodo("");
      onTodoAdded();
      console.log('To-do added')
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  

  return (
    <>
      <div>Add to-do</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo"></label>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new to-do"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddTodo;
