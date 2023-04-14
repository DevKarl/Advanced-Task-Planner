
import classes from './EditTaskModal.module.css';
import { tasksContext } from '../../context/tasksContext';
import { useContext, useState, useRef} from 'react';
import Modal from '../UI/Modal';
import { validateInput, isValidDeadline, checkInputWordLength } from '../Helpers/InputControl';

const EditTaskModal = props => {

    const {tasks, updateTasks} = useContext(tasksContext);
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
        console.log(task.key);
        console.log(tasks.map(task => task.key));
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

    return(
        <Modal 
        btnText = {'Change'}
        modalTaller = {true}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {changeTaskHandler}
        clickedEnter = {changeTaskHandler}
        >
            <div className={classes.editTaskModalContainer}>
                <h2 className={classes.editTodoH3} autoFocus>Edit Current Task</h2>
                <textarea
                    ref={taskTextRef}
                    defaultValue={task.taskText}
                    type='text' 
                    className = {classes.modalInputField} 
                ></textarea>
                <div className={classes.importanceAndDeadlineContainer}>
                    <h3 className={classes.importanceTitle} >Importance</h3>
                    <div className={classes.importanceContainer}>
                        <button 
                            className={importanceLvl === 1 ? classes.importanceLvlBtnActive : classes.importanceLvlBtnStandard} 
                            onClick={() => handleSetImportanceLvl(1)}>
                            !</button>
                        <button 
                            className={importanceLvl === 2 ? classes.importanceLvlBtnActive : classes.importanceLvlBtnStandard} 
                            onClick={() => handleSetImportanceLvl(2)}>
                            !!</button>
                        <button 
                            className={importanceLvl === 3 ? classes.importanceLvlBtnActive : classes.importanceLvlBtnStandard} 
                            onClick={() => handleSetImportanceLvl(3)}>
                            !!!</button>
                    </div>
                    <h3 className={classes.deadlineTitle}>Deadline</h3>
                    <div className={classes.deadlineContainer}>
                        <input 
                            type='date' 
                            onChange={handleDeadlineChange} 
                            value={deadline}
                            min={'2023-01-01'}
                            max={'2099-12-31'}
                        />
                        <button className={classes.clearBtn} onClick={handleRemoveDeadline}>Clear</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditTaskModal;