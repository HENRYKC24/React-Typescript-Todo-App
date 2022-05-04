import React, { useState } from "react";
import {DragDropContext} from 'react-beautiful-dnd';
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (todo) {
      setTodos(() => [
        ...todos,
        {
          id: Date.now(),
          todo,
          isDone: false,
        },
      ]);
      setTodo(() => "");
    }
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="App">
        <span className="heading">GERITDON</span>
        <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
