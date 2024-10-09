import React from "react";

const TodoItem = ({todo, onToggle, onDelete, message}) => {
  
    const isChecked = () => {
        todo.completed = !todo.completed
    }
    return(
        <>
            <li>
                <span
                    style={{ textDecoration: todo.completed? 'line-through': 'none'}}
                    onClick={()=> onToggle(todo.id)}
                >
                <input
                    type = "checkbox"
                    value={todo.completed}
                    checked = {todo.completed === true}
                    onChange={isChecked}/>
                    {todo.text}
                </span>

                {todo.completed && <button onClick={()=> onDelete(todo.id)}>Delete</button>}
            
            </li>          
        </>
    )
}

export default TodoItem
