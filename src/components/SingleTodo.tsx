import React, { SyntheticEvent, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const { id, isDone, todo: todoText } = todo;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [todoEditValue, setTodoEditValue] = useState<string>(todoText);

  const handleDone = () => {
    setTodos(() =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !isDone } : todo
      )
    );
  };

  const handleDelete = () => {
    setTodos(() => todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = () => setEditMode(() => true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoEditValue(() => value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(() => false);
    setTodos(() =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: todoEditValue } : todo
      )
    );
  };

  return (
    <form
      className="todos_single"
      onSubmit={(e: React.FormEvent) => handleSubmit(e)}
    >
      {isDone && !editMode ? (
        <s className="todos_single-text">{todoText}</s>
      ) : !isDone && !editMode ? (
        <span className="todos_single-text">{todoText}</span>
      ) : (
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange(e)
          }
          value={todoEditValue}
        />
      )}
      <div>
        <span className="icon" onClick={() => handleEdit()}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete()}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone()}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
