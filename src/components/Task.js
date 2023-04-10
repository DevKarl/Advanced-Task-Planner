
import getEmoji from './Helpers/getEmoji';
import classes from './Task.module.css';
import './UI/CSSvariables.module.css';


const Task = props => {

    const {task, checkHandler, editTaskHandler, removeTaskHandler, emojiesOn, i} = props;

    const taskImportanceToString = number => {
        if(number === 0) return ''; 
        if(number === 1) return '!'; 
        if(number === 2) return '!!'; 
        if(number === 3) return '!!!'; 
    }

    return(
        <li 
            key = {i} 
            className = {`
            ${task.hasLongWord ? classes.hasLongWord : ''}
            ${classes.taskListItem}
            `}>
            <div className={classes.checkBoxAndText}>
            <div className={classes.importanceAndDeadlineContainer}>
                <h5 className={classes.importanceText}>{taskImportanceToString(task.importance)}</h5>
                <h5 className={classes.deadlineText}>{task.deadline && `DL: ${task.deadline}`}</h5>
            </div>
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
    )
}

export default Task;