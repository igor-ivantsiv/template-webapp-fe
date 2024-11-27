import React, { useContext } from "react";
import axios from "axios";
import { Todo } from "../types";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/Todos.module.css";
import { SessionContext } from "../contexts/SessionContext";

interface ListItemProps {
  todo: Todo;
  onTodoDeleted: () => void;
  onTodoUpdated: (updatedTodo: Todo) => void;
  todoIndex: number;
}

const ListItem: React.FC<ListItemProps> = ({
  todo,
  onTodoDeleted,
  onTodoUpdated,
  todoIndex,
}) => {
  const { token } = useContext(SessionContext) || {
    token: "",
  };

  const handleDelete = async (e: React.MouseEvent) => {
    // Change to MouseEvent
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8000/api/todos/${todo._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      onTodoDeleted();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleCompleted = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked; // Get the checked status
    try {
      const updatedTodo = { ...todo, completed: checked };
      await axios.put(
        `http://localhost:8000/api/todos/${todo._id}`,
        { completed: checked }, // Correct structure for the body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onTodoUpdated(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <>
      <div className={styles.todoContainerDiv}>
        <div className={styles.todoNumerationDiv}>
          <Typography variant="h6">{todoIndex}.</Typography>
        </div>
        <div className={styles.todoCardDiv}>
          <div className={styles.todoCard}>
            <CardContent>
              <div className={styles.cardContentDiv}>
                <div>
                  <h4 className={styles.todoText}>{todo.todo}</h4>
                </div>
                <div className={styles.cardButtonsDiv}>
                  <Checkbox
                    checked={todo.completed}
                    onChange={handleToggleCompleted}
                    color="primary" // Customize checkbox color
                  />
                  <IconButton
                    onClick={handleDelete}
                    color="error"
                    aria-label="delete todo"
                  >
                    <DeleteIcon /> {/* Delete icon button */}
                  </IconButton>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListItem;
