
import classes from './TaskList.module.css';
import { tasksContext } from '../context/tasksContext';
import './UI/CSSvariables.module.css';
import { useState, useContext} from 'react';
import EditTaskModal from './Modals/EditTaskModal';
import { checkInputWordLength } from './Helpers/InputControl';
import Task from './Task';

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

    const receivedChangedTaskHandler = (i, newText, importanceLvl, deadline) => {
        const hasLongWord = checkInputWordLength(newText);
        const updatedTask = {
          ...tasks[i],
          taskText: newText,
          hasLongWord: hasLongWord,
          importance: importanceLvl,
          deadline: deadline 
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
            {tasks.length > 0 && <ul className = {classes.taskUl}>
                {tasks.map((task, i) =>
                <Task
                    key = {`000${i}`}
                    task = {task}
                    i = {i}
                    checkHandler = {checkHandler}
                    emojiesOn = {emojiesOn}
                    editTaskHandler = {editTaskHandler}
                    removeTaskHandler = {removeTaskHandler}
                />
                )}
            </ul>}
            {tasks.length === 0 && <h2 className={classes.ifNoTasksMsg}> ⇢ Your tasks will appear here 👋 </h2>}
        {editTaskModal && <EditTaskModal
            taskText = {taskTextContent}
            index = {taskChangeIndex}
            toggleEditTaskModal = {toggleEditTaskModal}
            receivedChangedTaskArgs = {receivedChangedTaskHandler}
        />}
        </div>
    )

};

export default TaskList;
