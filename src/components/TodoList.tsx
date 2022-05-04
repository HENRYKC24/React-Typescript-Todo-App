import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="parent_container">
      <Droppable droppableId="todosList">
        {(provided) => (
          <React.StrictMode>
            <div
              className="todos_container active_tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todo_heading">Active Tasks</span>
              {todos
                .map((todo, index) => (
                  <SingleTodo
                    type="not-done"
                    index={index}
                    key={`${todo.id}`}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))}
              {provided.placeholder}
            </div>
          </React.StrictMode>
        )}
      </Droppable>

      <Droppable droppableId="todosCompleted">
        {(provided) => (
          <React.StrictMode>
            <div
              className="todos_container completed_tasks"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todo_heading">Completed Tasks</span>
              {completedTodos
                .map((todo, index) => (
                  <SingleTodo
                    type="done"
                    index={index}
                    key={`${todo.id}`}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                    completedTodos={completedTodos}
                    setCompletedTodos={setCompletedTodos}
                  />
                ))}
              {provided.placeholder}
            </div>
          </React.StrictMode>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
