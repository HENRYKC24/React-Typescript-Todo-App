import React, { useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone, MdRestore } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  type: string;
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({
  type,
  index,
  todo,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, isDone, todo: todoText } = todo;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [todoEditValue, setTodoEditValue] = useState<string>(todoText);

  const handleDone = () => {
    if (type === "not-done") {
      const todoCopy = todos.filter((todo) => todo.id === id)[0];
      setTodos(() => todos.filter((todo) => todo.id !== id));
      setCompletedTodos((prev) => [{...todoCopy, isDone: true}, ...prev])
    } else {
      const todoCopy = completedTodos.filter((todo) => todo.id === id)[0];
      setCompletedTodos(() => completedTodos.filter((todo) => todo.id !== id));
      setTodos((prev) => [{...todoCopy, isDone: false}, ...prev])
    }
  };

  const handleDelete = () => {
    if (type === "not-done") {
      setTodos(() => todos.filter((todo) => todo.id !== id));
    } else {
      setCompletedTodos(() => completedTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = () => setEditMode((prevMode) => !prevMode);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodoEditValue(() => value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditMode(() => false);

    if (type === "not-done") {
      setTodos(() =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, todo: todoEditValue } : todo
        )
      );
    } else {
      setCompletedTodos(() =>
        completedTodos.map((todo) =>
          todo.id === id ? { ...todo, todo: todoEditValue } : todo
        )
      );
    }
  };

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
              className="todos_single-text"
              ref={inputRef}
              autoFocus={true}
            />
          )}
          <div>
            <span className="icon" onClick={() => handleEdit()}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete()}>
              <AiFillDelete />
            </span>
            {!isDone ? (
              <span className="icon" onClick={() => handleDone()}>
                <MdDone />
              </span>
            ) : (
              <span className="icon" onClick={() => handleDone()}>
                <MdRestore />
              </span>
            )}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
