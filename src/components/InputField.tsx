import React from 'react';
import './inputStyles.css';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleSubmit}: Props) => {
  return (
    <form className="input" onSubmit={handleSubmit}>
      <input type="input" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Enter a task" className="input_box" />
      <button className="input_submit" type="submit">Go</button>
    </form>
  )
}

export default InputField;
