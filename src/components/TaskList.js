
import classes from './TaskList.module.css';
import './UI/CSSvariables.module.css';
import { useState, useEffect} from 'react';
import EditTaskModal from './Modal/EditTaskModal';

const TaskList = props => {

    // STATES _______________________________________________________

    const [tasks, updateTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          return JSON.parse(savedTasks);
        } else {
          return [];
        }
    });

    const [taskAppeared, updateTaskAppeared] = useState(false);
    const [taskTextContent, changeTaskTextContent] = useState(null);
    const [taskChangeIndex, updateTaskChangeIndex] = useState(null);
    const [editTaskModal, toggleEditTaskModal] = useState(false);
    const [longInputWord, togglelongInputWord] = useState(false);

    // USE EFFECTS _______________________________________________________
    
    useEffect(() => {
        // check if any todos have textIsLong prop
            // if so --> then change togglelongInputWord to true
            // if not, do nothing
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (props.newTask) {
            !updateTaskAppeared && updateTaskAppeared(true);
            updateTasks(prevTasks => [...prevTasks, props.newTask]);
        }
    }, [props.newTask, updateTaskAppeared]);

    // HANDLERS _______________________________________________________


    const removeTaskHandler = (i) => {
        updateTaskAppeared(false);
        const newTasks = [...tasks];
        newTasks[i].beingRemoved = true;
        updateTasks(newTasks);
        setTimeout(() => {
            const updatedTasks = newTasks.filter((_, index) => index !== i);
            updateTasks(updatedTasks);
        }, 150); 
    }

    const editTaskHandler = (i) => {
        // open the default modal window form with simple input with preloaded text from todo
        // when change button is clicked --> close modal, loop over todo, find specific todo and update its text content
        updateTaskChangeIndex(i);
        changeTaskTextContent(tasks[i].taskText);
        toggleEditTaskModal(prev => !prev);
    }

    const receivedChangedTaskTextHandler = (i, newText) => {
        !togglelongInputWord && checkInputWordLength(newText);
        const newTasks = [...tasks];
        newTasks[i].taskText = newText;
        updateTasks(newTasks);
    }
    
    const checkHandler = (i) => {
        const newTasks = [...tasks];
        newTasks[i].isChecked = !newTasks[i].isChecked;
        updateTasks(newTasks);
    }

    // OTHER FUNCTIONS _______________________________________________________

    const checkInputWordLength = taskText => {
        // first check if any other todos have true on textIsLong
        // if so, return and exit this function
        // Check if todoText has any words longer than 20 characters
        if (/\b\w{20,}\b/.test(taskText)) {
            // first check if any other todos have true on textIsLong
            // if so --> don't do anything (CSS class already active)
            // if not --> do a toggle on togglelongInputWord state
            togglelongInputWord(true);
        }
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
        
    return (
        <div className = {`${classes.tasklist} ${longInputWord? 'longInputWord' : ''}`}>
            <ul className = {classes.taskUl}>
                {tasks.map((li, i) => 
                <li 
                    key = {i} 
                    className = {`
                    ${classes.taskListItem}
                    ${taskAppeared ? classes.appearingTask : ''}
                    ${tasks[i].beingRemoved ? classes.dissapearingTask: ''}
                    `}>
                    <div className={classes.checkBoxAndText}>
                        <input 
                            type="checkbox" 
                            id = "check" 
                            onChange= {() => checkHandler(i)} 
                            className = {classes.check}
                            checked = {tasks[i].isChecked}
                        />
                        <h3 
                            className = {tasks[i].isChecked ? classes.hasBeenCheckedH3 : ''} 
                            onClick = {() => checkHandler(i)}>
                            {li.taskText}
                            {Object.keys(emojiMap).map(keyword => li.taskText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
                        </h3>
                    </div>
                    <div className={classes.editAndDeleteIcons}>
                        <div className={classes.edit} onClick = {() => editTaskHandler(i)}></div>
                        <div className={classes.delete} onClick = {() => removeTaskHandler(i)}></div>
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
