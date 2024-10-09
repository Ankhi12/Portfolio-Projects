import React, { useState } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import './styles/styless.css'

function App() {

  const [todos, setTodos] = useState([])
  const [message, setMessage] = useState('')

  const addTodo = (text) =>{
    
      const valueExist = todos.filter(val=> val.text === text)
    
      if(valueExist.length ===0){
        
        const newTodo = {id: Date.now(), text, completed: false}
        setTodos([...todos, newTodo])
        setMessage('')
      }
      else{
        
        setMessage('Duplicate item!')
      }
  }

  const toggleTodo = (id) =>{
    setTodos(todos.map(todo => 
      todo.id === id? {...todo, completed: !todo.completed}: todo
    ))
  }

  const deleteTodo = (id) =>{
    setTodos(todos.filter(todo=> todo.id !== id))
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} message={message} />
    </div>
  );
}

export default App;
