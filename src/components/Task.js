
import getEmoji from './Helpers/getEmoji';
import classes from './Task.module.css';
import getDeadlineStatus from './Helpers/getDeadlineStatus';
import './UI/CSSvariables.module.css';


const Task = props => {

    const {task, checkHandler, editTaskHandler, removeTaskHandler, emojiesOn, i} = props;

    return(
        <li 
            key = {i} 
            className = {`
            ${task.hasLongWord ? classes.hasLongWord : ''}
            ${classes.taskListItem}
            `}>
            <div className={classes.checkBoxAndText}>
            <div className={classes.importanceAndDeadlineContainer}>
                <div className={classes.exclamationBox}>
                {task.importance > 0 &&
                    Array.from({length: task.importance}).map((_, index) => (
                    <h5 key={index} className={classes.exclamationMark}>!</h5>
                ))}
                </div>
                <div className={classes.deadlineBox}>
                    <h5 className={classes.deadlineText}>{task.deadline && `${getDeadlineStatus(task.deadline)}`}</h5>
                </div>
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