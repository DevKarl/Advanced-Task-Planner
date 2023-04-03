
import classes from './TaskActions.module.css';

const TaskActions = props => {


    return(

        <div className={classes.taskActionsContainer}>
            <button className={classes.sortBtn}></button>
            <button className={classes.clearAllTasksBtn}></button>
            <button className={classes.toggleEmojiesBtn}></button>
        </div>
    )

}

export default TaskActions;