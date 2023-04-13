
import { useState, useRef, useContext } from 'react';
import { tasksContext } from '../context/tasksContext';
import { validateInput } from './Helpers/InputControl';
import classes from './InputField.module.css';

const InputField = () => {

    const {addTask} = useContext(tasksContext);
    const taskTextRef = useRef('');

    const [error, setError] = useState(null);

    if(error) {throw error};

    const addNewTask = () => {
        try {
            const enteredTaskText = taskTextRef.current.value.trim();
            validateInput(enteredTaskText); // <-- throws error if not valid
            addTask(enteredTaskText);
        } 
        catch(error) {
            setError(error);
        }
        taskTextRef.current.value = '';
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
                onKeyDown={handleKeyDown}
                ref={taskTextRef}
                />
            <button onClick= {addNewTask}>Add</button>
        </div>
    )
};

export default InputField;