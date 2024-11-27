import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ListItem from "../Components/ListItem";
import { Todo } from "../types";
import AddTodo from "../Components/AddTodo";
import styles from "../styles/Todos.module.css";
import { SessionContext } from "../contexts/SessionContext";

interface TodosPageProps {} // For the sake of consistent structute, this basically means that no props were passed

function TodosPage({}: TodosPageProps) {
  // Means that no props were used from the defined prop interface above
  const [todos, setTodos] = useState<Todo[]>([]); // adding typing to the usestate
  const { currentUser, token } = useContext(SessionContext) || {
    currentUser: "",
    token: "",
  };
  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(
        `http://localhost:8000/api/todos/${currentUser}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoAdded = () => {
    fetchTodos();
  };

  const handleTodoDeleted = () => {
    fetchTodos();
  };

  const handleTodoUpdated = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  };

  return (
    <>
      <div className={styles.todosPageDiv}>
        <h2 className={styles.todosHeader}>My Todos</h2>
        <div className={styles.todosDiv}>
          <div className={styles.todosListDiv}>
            {todos.map((eachTodo, index) => {
              return (
                <ListItem
                  key={eachTodo._id}
                  todo={eachTodo}
                  onTodoDeleted={handleTodoDeleted}
                  onTodoUpdated={handleTodoUpdated}
                  todoIndex={index + 1}
                />
              );
            })}
          </div>
          <div className={styles.addTodoDiv}>
            <AddTodo onTodoAdded={handleTodoAdded} />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodosPage;
