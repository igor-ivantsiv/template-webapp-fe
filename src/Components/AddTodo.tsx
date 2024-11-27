import React, { useContext, useState } from "react";
import axios from "axios";
import { TextField, Button, Stack } from "@mui/material";
import styles from "../styles/Todos.module.css";
import { SessionContext } from "../contexts/SessionContext";

interface AddTodoProps {
  onTodoAdded: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
  const { currentUser, token } = useContext(SessionContext) || {
    currentUser: "",
    token: "",
  };
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newTodo === "") return;

    try {
      await axios.post(
        "http://localhost:8000/api/todos/",
        {
          todo: newTodo,
          userId: currentUser,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Correctly place headers here
          },
        }
      );
      setNewTodo(""); // Clear the input field
      onTodoAdded(); // Notify parent component
      console.log("To-do added");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className={styles.addTodoDiv}>
      <h3 className={styles.addTodosHeader}>Add a new to-do</h3>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Stack spacing={2}>
          <TextField
            multiline
            rows={4}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new to-do..."
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddTodo;