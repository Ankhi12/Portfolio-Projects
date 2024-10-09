import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({todos, onToggle, onDelete, message}) =>{
    return(
        <>
            {message? <p> {message} </p> :
                <ul>
                    {
                        todos.map(todo=>{
                        return( <TodoItem
                                key ={todo.id}
                                todo ={todo}
                                onToggle = {onToggle}
                                onDelete = {onDelete}
                                message = {message}
                            />)
                        })
                    }
                </ul>
                }
        </>
        
    )
}

export default TodoList
