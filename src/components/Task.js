
import { tasksContext } from '../context/tasksContext';
import './UI/CSSvariables.module.css';
import classes from './Task.module.css';
import getDeadlineStatus from './Helpers/getDeadlineStatus';
import getEmoji from './Helpers/getEmoji';
import EditTaskModal from './Modals/EditTaskModal';
import { useState, useContext } from 'react';

const Task = props => {

    const {tasks, updateTasks, emojiesOn} = useContext(tasksContext);  
    const {task} = props;
    const {key} = task;

    // STATES
    const [editTaskModal, toggleEditTaskModal] = useState(false);

    // HANDLERS 
    const checkHandler = () => {
        const newTasks = tasks.map(task => {
            if (task.key === key) {
            return {...task, isChecked: !task.isChecked};
            }
            return task;
        });
        updateTasks(newTasks);
    }

    const removeTaskHandler = () => {
        const updatedTasks = tasks.filter(task => task.key !== key);
        updateTasks(updatedTasks);
    }

    return(
        <>
            <li
                className = {`
                ${task.hasLongWord ? classes.hasLongWord : ''}
                ${classes.taskListItem}
                `}>
                <div className={classes.checkBoxAndText}>
                <div className={classes.importanceAndDeadlineContainer}>
                    <div className={classes.exclamationBox}>
                    {task.importance > 0 && Array.from({length: task.importance}).map((_, i) => (
                    <h5 key={i} className={classes.exclamationMark}>!</h5>
                    ))}
                    </div>
                    <div className={classes.deadlineBox}>
                        <h5 className={classes.deadlineText}>{task.deadline && `${getDeadlineStatus(task.deadline)}`}</h5>
                    </div>
                </div>
                <input 
                    type="checkbox" 
                    id = "check" 
                    onChange= {checkHandler} 
                    className = {classes.check}
                    checked = {task.isChecked}
                />
                <h3 
                    className = {task.isChecked ? classes.hasBeenCheckedH3 : ''} 
                    onClick = {checkHandler}>
                    {task.taskText}
                    {emojiesOn && getEmoji(task.taskText)}
                </h3>
                </div>
                <div className={classes.editAndDeleteIcons}>
                    <button className={classes.edit} onClick = {() => toggleEditTaskModal(prev => !prev)}></button>
                    <button className={classes.delete} onClick = {removeTaskHandler}></button>
                </div>
            </li>
            {editTaskModal && <EditTaskModal
            task = {task}
            toggleEditTaskModal = {toggleEditTaskModal}
            />}
        </>
    )
}

export default Task;