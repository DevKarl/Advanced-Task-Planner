
import classes from './TaskList.module.css';
import { tasksContext } from '../context/tasksContext';
import './UI/CSSvariables.module.css';
import { useState, useContext} from 'react';
import EditTaskModal from './Modals/EditTaskModal';
import getEmoji from './Helpers/getEmoji';
import { checkInputWordLength } from './Helpers/InputControl';

const TaskList = () => {
    
    // CONTEXT 
    const {tasks, updateTasks, emojiesOn} = useContext(tasksContext);

    // STATES
    const [taskTextContent, changeTaskTextContent] = useState(null);
    const [taskChangeIndex, updateTaskChangeIndex] = useState(null);
    const [editTaskModal, toggleEditTaskModal] = useState(false);
      

    // HANDLERS _______________________________________________________

    const removeTaskHandler = (i) => {
        const newTasks = [...tasks];
        const updatedTasks = newTasks.filter((_, index) => index !== i);
        updateTasks(updatedTasks);
    }

    const editTaskHandler = (i) => {
        updateTaskChangeIndex(i);
        changeTaskTextContent(tasks[i].taskText);
        toggleEditTaskModal(prev => !prev);
    }

    const receivedChangedTaskTextHandler = (i, newText) => {
        const hasLongWord = checkInputWordLength(newText);
        const updatedTask = {
          ...tasks[i],
          taskText: newText,
          hasLongWord: hasLongWord
        };
        const newTasks = [...tasks];
        newTasks[i] = updatedTask;
        updateTasks(newTasks);
      };
      
    
    const checkHandler = (i) => {
        const newTasks = [...tasks];
        newTasks[i].isChecked = !newTasks[i].isChecked;
        updateTasks(newTasks);
    }
            
    return (
        <div className = {classes.tasklist}>
            <ul className = {classes.taskUl}>
                {tasks.map((task, i) => 
                <li 
                    key = {i} 
                    className = {`
                    ${task.hasLongWord ? classes.hasLongWord : ''}
                    ${classes.taskListItem}
                    `}>
                    <div className={classes.checkBoxAndText}>
                        <input 
                            type="checkbox" 
                            id = "check" 
                            onChange= {() => checkHandler(i)} 
                            className = {classes.check}
                            checked = {task.isChecked}
                        />
                        <h3 
                            className = {task.isChecked ? classes.hasBeenCheckedH3 : ''} 
                            onClick = {() => checkHandler(i)}>
                            {task.taskText}
                            {emojiesOn && getEmoji(task.taskText)}
                        </h3>
                    </div>
                    <div className={classes.editAndDeleteIcons}>
                        <button className={classes.edit} onClick = {() => editTaskHandler(i)}></button>
                        <button className={classes.delete} onClick = {() => removeTaskHandler(i)}></button>
                    </div>
                </li>
                )}
            </ul>
        {editTaskModal && <EditTaskModal
            taskText = {taskTextContent}
            index = {taskChangeIndex}
            toggleEditTaskModal = {toggleEditTaskModal}
            receivedChangedTaskText = {receivedChangedTaskTextHandler}
        />}
        </div>
    )

};

export default TaskList;
