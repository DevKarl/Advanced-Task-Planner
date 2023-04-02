
import classes from './TaskList.module.css';
import './UI/CSSvariables.module.css';
import { useState, useEffect} from 'react';
import EditTaskModal from './Modal/EditTaskModal';
import { checkInputWordLength } from './Helpers/InputControl';

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

    // USE EFFECTS _______________________________________________________
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (props.newTask) {
          !updateTaskAppeared && updateTaskAppeared(true);
          const hasLongWord = checkInputWordLength(props.newTask.taskText);
          console.log(hasLongWord);
          const updatedTask = {
            ...props.newTask,
            hasLongWord: hasLongWord
          };
          updateTasks(prevTasks => [...prevTasks, updatedTask]);
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
        updateTaskChangeIndex(i);
        changeTaskTextContent(tasks[i].taskText);
        toggleEditTaskModal(prev => !prev);
    }

    const receivedChangedTaskTextHandler = (i, newText) => {
        const hasLongWord = checkInputWordLength(newText);
        console.log(hasLongWord);
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
        <div className = {classes.tasklist}>
            <ul className = {classes.taskUl}>
                {tasks.map((li, i) => 
                <li 
                    key = {i} 
                    className = {`
                    ${li.hasLongWord ? classes.hasLongWord : ''}
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
                            {Object.keys(emojiMap).map(keyword => 
                            li.taskText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
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
