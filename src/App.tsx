import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import TodosPage from "./Pages/TodosPage";
import ErrorPage from "./Pages/ErrorPage";
import SignupPage from "./Pages/auth/SignupPage";
import LoginPage from "./Pages/auth/LoginPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <TodosPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
