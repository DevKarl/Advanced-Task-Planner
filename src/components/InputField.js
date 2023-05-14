
import { useState, useRef, useContext } from 'react';
import { tasksContext } from "../context/TasksContext";
import { validateInput } from './Helpers/InputControl';
import classes from './InputField.module.css';

const InputField = () => {

    const { addTask, themeColors } = useContext(tasksContext);
    const taskTextRef = useRef('');

    const [error, setError] = useState(null);

    if(error) {throw error};

    const addNewTask = () => {
        try {
            const enteredTaskText = taskTextRef.current.value.trim();
            validateInput(enteredTaskText); // <-- throws error if not valid (empty etc.)
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
                style={{border: `2px solid ${themeColors.primaryColor}`}} 
                type = 'text' 
                id = 'inputfield'
                onKeyDown={handleKeyDown}
                ref={taskTextRef}
                />
            <button style={{backgroundColor: themeColors.primaryColor}} onClick= {addNewTask} >Add</button>
        </div>
    )
};

export default InputField;