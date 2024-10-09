import React, {useState} from "react";

const AddTodo = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('');
    const [messg, setMessg] = useState('')

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(inputValue.trim()){
            setMessg('')
            onAdd(inputValue)
            setInputValue('')
        }
        else{
            setMessg('Enter an item to add!')
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Add a new task"
            />
            <span><span></span></span>
            <button type="submit">Add</button>
            {messg && <p>{messg}</p>}
        </form>
    )
}

export default AddTodo
