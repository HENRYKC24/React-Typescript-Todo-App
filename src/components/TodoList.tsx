import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="parent_container">
      <div className="todos_container active_tasks">
        <span className="todo_heading">Active Tasks</span>
        {todos.filter((todo) => !todo.isDone).map((todo) => (
          <SingleTodo
            key={`${todo.id}`}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
      <div className="todos_container completed_tasks">
        <span className="todo_heading">Completed Tasks</span>
        {todos.filter((todo) => todo.isDone).map((todo) => (
          <SingleTodo
            key={`${todo.id}`}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
