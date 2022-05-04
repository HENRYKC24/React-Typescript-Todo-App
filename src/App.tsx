import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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

  const onDropEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return false;
    let add, complete = completedTodos, notDone = todos;

    if(source.droppableId === 'todosList') {
      add = notDone[source.index];
      notDone.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === 'todosList') {
      notDone.splice(destination.index, 0, {...add, isDone: false});
    } else {
      complete.splice(destination.index, 0, {...add, isDone: true});
    }

    setCompletedTodos(() => complete);
    setTodos(() => notDone);
  };

  return (
    <DragDropContext onDragEnd={onDropEnd}>
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
