import { tasksContext } from "../context/TasksContext";
import classes from './Progressbar.module.css';
import './UI/CSSvariables.module.css';
import { useContext } from 'react';

const Progressbar = () => {

    const { tasks, themeColors } = useContext(tasksContext);
    const completedTasks = tasks.filter(task => task.isChecked);
    const allTasksChecked = tasks.every(task => task.isChecked === true);
    let percentageComplete = Math.round((completedTasks.length / tasks.length) * 100);
    if (!percentageComplete) percentageComplete = 0;

    const progressBarStyles = {
        backgroundColor: themeColors.primaryColor,
        width: `${percentageComplete}%`
    }

    return(
        <>
        <div className={classes.progressbarOuterContainer}>
        { completedTasks.length > 0 &&
        <div
        className={`${classes.progressbarContainer} ${
            (allTasksChecked && tasks.length >= 3) ? classes.pulsate : ""
        }`}
        >
            <div className={classes.progressbar} style={progressBarStyles}>
                <div className={classes.progressbarText}>{`${percentageComplete}%`}</div>
            </div>
        </div>}
        </div>
        </>
    )

}


export default Progressbar;