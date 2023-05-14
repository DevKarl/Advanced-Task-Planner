
import classes from './EditTaskModal.module.css';
import { tasksContext } from '../../context/TasksContext';
import { useContext, useState, useRef} from 'react';
import Modal from '../UI/Modal';
import { validateInput, isValidDeadline, checkInputWordLength } from '../Helpers/InputControl';

const EditTaskModal = props => {

    const {tasks, updateTasks, themeColors} = useContext(tasksContext);
    const {task} = props
    const {key} = task
    const taskTextRef = useRef();
    const [error, setError] = useState(false);
    const [importanceLvl, setimportanceLvl] = useState(task.importance);
    const [deadline, setDeadline] = useState(task.deadline);

    if(error) {throw error};

    const handleDeadlineChange = e => {
        const dateValue = e.target.value;
        setDeadline(dateValue);
    }

    const handleRemoveDeadline = () => {
        setDeadline('');
    }

    const handleSetImportanceLvl = lvl => {
        if(importanceLvl === lvl) {
            setimportanceLvl(0);
        } else {
            setimportanceLvl(lvl);
        }
    }

    const closeModalHandler = () => {
        props.toggleEditTaskModal();
    }

    const changeTaskHandler = () => {
        try {
            const enteredTaskTextRef = taskTextRef.current.value.trim();
            validateInput(enteredTaskTextRef);
            deadline !== '' && isValidDeadline(deadline);
            if(!error) {
                changeTaskWithArgs(enteredTaskTextRef);
            } 
            closeModalHandler();
        } catch(error) {
            setError(error);
        }
    }

    const changeTaskWithArgs = (newText) => {
        const hasLongWord = checkInputWordLength(newText);
        const index = tasks.findIndex(task => task.key === key);
        const updatedTask = {
            ...tasks[index],
            taskText: newText,
            hasLongWord: hasLongWord,
            importance: importanceLvl,
            deadline: deadline
        };
        const newTasks = [...tasks];
        newTasks[index] = updatedTask;
        updateTasks(newTasks);
    };

    const defaultBorderStyle = {
        border: `2px solid ${themeColors.primaryColor}`
    }

    return(
        <Modal 
        btnText = {'SAVE'}
        modalTaller = {true}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {changeTaskHandler}
        clickedEnter = {changeTaskHandler}
        >
            <div className={classes.editTaskModalContainer}>
                <h2 className={classes.editTodoH3} autoFocus>Edit Current Task</h2>
                <textarea
                    style={defaultBorderStyle}
                    ref={taskTextRef}
                    defaultValue={task.taskText}
                    type='text' 
                    className = {classes.modalInputField} 
                ></textarea>
                <div className={classes.importanceAndDeadlineContainer}>
                    <h3 className={classes.importanceTitle} >Importance</h3>
                    <div className={classes.importanceContainer}>
                        <button
                            style={{border: `2px solid ${themeColors.primaryColor}`, backgroundColor: `${importanceLvl === 1 ? themeColors.primaryColor : ''}`}}
                            onClick={() => handleSetImportanceLvl(1)}>
                            !</button>
                        <button
                            style={{border: `2px solid ${themeColors.primaryColor}`, backgroundColor: `${importanceLvl === 2 ? themeColors.primaryColor : ''}`}} 
                            onClick={() => handleSetImportanceLvl(2)}>
                            !!</button>
                        <button
                            style={{border: `2px solid ${themeColors.primaryColor}`, backgroundColor: `${importanceLvl === 3 ? themeColors.primaryColor : ''}`}} 
                            onClick={() => handleSetImportanceLvl(3)}>
                            !!!</button>
                    </div>
                    <h3 className={classes.deadlineTitle}>Deadline</h3>
                    <div className={classes.deadlineContainer}>
                        <input
                            style={defaultBorderStyle} 
                            type='date' 
                            onChange={handleDeadlineChange} 
                            value={deadline}
                            min={'2023-01-01'}
                            max={'2099-12-31'}
                        />
                        <button
                            style={defaultBorderStyle} 
                            className={classes.clearBtn} 
                            onClick={handleRemoveDeadline}>
                        Clear</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditTaskModal;