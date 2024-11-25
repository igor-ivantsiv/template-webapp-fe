import axios from "axios";
import { Todo } from "../types";
import { Switch } from "@mantine/core";

interface ListItemProps {
  todo: Todo;
  onTodoDeleted: () => void;
  onTodoUpdated: (updatedTodo: Todo) => void;
  todoIndex: number;
}

const ListItem = ({ todo, onTodoDeleted, onTodoUpdated, todoIndex }: ListItemProps) => {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8000/api/todos/${todo._id}`);
      onTodoDeleted();
      console.log("To-do deleted");
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleCompleted = async (checked: boolean) => {
    try {
      const updatedTodo = { ...todo, completed: checked };
      await axios.put(`http://localhost:8000/api/todos/${todo._id}`, {
        completed: checked,
      });
      onTodoUpdated(updatedTodo);
      console.log("Update successful")
    } catch (error) {}
  };

  return (
    <>
      <h4>
        {todoIndex}. {todo.todo}
      </h4>
      <Switch
        checked={todo.completed}
        onChange={(event) => handleToggleCompleted(event.currentTarget.checked)}
      />

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};

export default ListItem;
