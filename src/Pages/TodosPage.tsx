import axios from "axios";
import { useEffect, useState } from "react";
import ListItem from "../Components/ListItem";
import { Todo } from "../types";
import AddTodo from "../Components/AddTodo";

interface TodosPageProps {} // For the sake of consistent structute, this basically means that no props were passed

function TodosPage({}: TodosPageProps) {
  // Means that no props were used from the defined prop interface above
  const [todos, setTodos] = useState<Todo[]>([]); // adding typing to the usestate

  const fetchTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(
        "http://localhost:8000/api/todos/" // Here you I'm providing a type definition for the expected structure of the response
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
      <h3>TodosPage</h3>
      <AddTodo onTodoAdded={handleTodoAdded}  />
      <h4>My to-dos:</h4>
      <div>
        {todos.map((eachTodo, index) => {
          return <ListItem key={eachTodo._id} todo={eachTodo} onTodoDeleted={handleTodoDeleted}
          onTodoUpdated={handleTodoUpdated}  todoIndex={index + 1} />;
        })}
      </div>
    </>
  );
}

export default TodosPage;
