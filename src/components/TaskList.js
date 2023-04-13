
import classes from './TaskList.module.css';
import { tasksContext } from '../context/tasksContext';
import './UI/CSSvariables.module.css';
import { useContext} from 'react';
import getSortedTasks from './Helpers/getSortedTasks';
import Task from './Task';

const TaskList = () => {
    
    // CONTEXT 
    const {tasks, sortOption} = useContext(tasksContext); 
    
    
    console.log(tasks.map(task => task.key));
            
    return (
        <div className = {classes.tasklist}>
            {tasks.length > 0 && 
            <ul className = {classes.taskUl}>
                {(sortOption === "" ? tasks : getSortedTasks(sortOption, tasks)).map(task =>
                <Task
                    task = {task}
                    key = {task.key+1}
                />
                )}
            </ul>}
            {tasks.length === 0 && <h2 className={classes.ifNoTasksMsg}> ⇢ Your tasks will appear here 👋 </h2>}
        </div>
    )

};

export default TaskList;
