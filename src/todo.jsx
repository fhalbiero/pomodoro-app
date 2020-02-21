import React from 'react';

export default function Todo({todo, deleteTodo}) {
  return (
    <div className="todo">
        <div className="progress"></div>
        <span>{todo}</span>
        <button 
            className="delete-button"
            onClick={deleteTodo}
        >X</button>
    </div>
  );
}
