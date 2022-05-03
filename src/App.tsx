import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) setTodos(() => [...todos, {
      id: Date.now(),
      todo: todo,
      isDone: false,
    } ])
  };

  return (
    <div className="App">
      <span className="heading">GERITDON</span>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
    </div>
  );
};

export default App;
