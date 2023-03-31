
import validateInput from './Helpers/validateInput';
import classes from './InputField.module.css';
import { useState } from 'react';

const InputField = props => {

    const [taskText, setTaskText] = useState(''); 
    const [error, setError] = useState(null);

    if(error) {throw error};

    const handleChange = event => {
        setTaskText(event.target.value);
    }

    const addNewTask = () => {
        try {
            const newTaskText = taskText.trim();
            validateInput(newTaskText);
            if(!error) props.addTaskHandler(newTaskText)
        } 
        catch(error) {
            setError(error);
        }
        setTaskText('');
    }


    const handleKeyDown = e  => {
        if (e.keyCode === 13) {
            addNewTask();
        }
    };

    return(
        <div className = {classes.inputfield}>
            <input 
                type = 'text' 
                id = 'inputfield'
                value={taskText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />
            <button onClick= {addNewTask}>Add</button>
        </div>
    )
};

export default InputField;