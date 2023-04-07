
import classes from './TaskList.module.css';
import './UI/CSSvariables.module.css';
import { useState, useContext} from 'react';
import { tasksContext } from '../context/tasksContext';
import EditTaskModal from './Modals/EditTaskModal';
import { checkInputWordLength } from './Helpers/InputControl';

const TaskList = () => {

    const tContx = useContext(tasksContext);

    // const [taskAppeared, updateTaskAppeared] = useState(false);
    const [taskTextContent, changeTaskTextContent] = useState(null);
    const [taskChangeIndex, updateTaskChangeIndex] = useState(null);
    const [editTaskModal, toggleEditTaskModal] = useState(false);
      

    // HANDLERS _______________________________________________________

    const removeTaskHandler = (i) => {
        // Refactor later: updateTaskAppeared(false); 
        const newTasks = [...tContx.tasks];
        // Refactor later: newTasks[i].beingRemoved = true;
        const updatedTasks = newTasks.filter((_, index) => index !== i);
        tContx.updateTasks(updatedTasks);
        /*
        Refactor later: timeout for CSS animation
        setTimeout(() => {
            const updatedTasks = newTasks.filter((_, index) => index !== i);
            updateTasks(updatedTasks);
        }, 150); 
        */
    }

    const editTaskHandler = (i) => {
        updateTaskChangeIndex(i);
        changeTaskTextContent(tContx.tasks[i].taskText);
        toggleEditTaskModal(prev => !prev);
    }

    const receivedChangedTaskTextHandler = (i, newText) => {
        const hasLongWord = checkInputWordLength(newText);
        const updatedTask = {
          ...tContx.tasks[i],
          taskText: newText,
          hasLongWord: hasLongWord
        };
        const newTasks = [...tContx.tasks];
        newTasks[i] = updatedTask;
        tContx.updateTasks(newTasks);
      };
      
    
    const checkHandler = (i) => {
        const newTasks = [...tContx.tasks];
        newTasks[i].isChecked = !newTasks[i].isChecked;
        tContx.updateTasks(newTasks);
    }

    const emojiMap = {
        'cat': ' 🐈‍⬛',
        'movie': ' 📽️',
        'dinner': ' 🍲',
        'food': ' 🍔',
        'dog': ' 🐶',
        'gym': ' 🏋️',
        'code': ' 👨🏼‍💻',
        'walk': ' 🚶',
        'react': ' ⚛️',
        'stupid': ' 🥴',
        'fix': ' 🔧',
        'build': ' 🛠️',
    };

    tContx.tasks.map((task, i) => console.log(task.isChecked));
    
        
    return (
        <div className = {classes.tasklist}>
            <ul className = {classes.taskUl}>
                {tContx.tasks.map((task, i) => 
                <li 
                    key = {i} 
                    /* refactor later, add these or re-do: 
                        ${taskAppeared ? classes.appearingTask : ''}
                        ${tasks[i].beingRemoved ? classes.dissapearingTask: ''} 
                    */
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
                            {Object.keys(emojiMap).map(keyword => 
                            task.taskText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
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
