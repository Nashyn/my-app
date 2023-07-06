import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const updateLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      updateLocalStorage(updatedTodos);
      setNewTodo('');
    }
  };

  const handleUpdateTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    updateLocalStorage(updatedTodos);
  };

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="text"
              value={todo}
              onChange={(e) => handleUpdateTodo(index, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
