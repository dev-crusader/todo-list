import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todos from "./components/Todos";
import TodoItem from "./components/TodoItem";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Todos />} />
        <Route exact path="/todos" element={<Todos />} />
        <Route path="/todos/:id" element={<TodoItem />} />
        <Route path="/todos/new" element={<CreateTodo />} />
        <Route path="/todos/:id/edit" element={<EditTodo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
