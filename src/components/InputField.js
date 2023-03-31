
import validateInput from './Helpers/validateInput';
import classes from './InputField.module.css';
import { useState } from 'react';

const InputField = props => {

    const [todoText, setTodoText] = useState(''); 
    const [error, setError] = useState(null);

    if(error) {throw error};

    const handleChange = event => {
        setTodoText(event.target.value);
    }

    const addNewTodo = () => {
        try {
            const newTodoText = todoText.trim();
            validateInput(newTodoText);
            if(!error) props.addTodoHandler(newTodoText)
        } 
        catch(error) {
            setError(error);
        }
        setTodoText('');
    }


    const handleKeyDown = e  => {
        if (e.keyCode === 13) {
            addNewTodo();
        }
    };

    return(
        <div className = {classes.inputfield}>
            <input 
                type = 'text' 
                id = 'inputfield'
                value={todoText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />
            <button onClick= {addNewTodo}>Add</button>
        </div>
    )
};

export default InputField;