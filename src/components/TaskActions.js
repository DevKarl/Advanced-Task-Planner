
import classes from './TaskActions.module.css';
import { React, useState } from 'react';

const TaskActions = props => {

    // states 
    const [emojiesActivated, toggleEmojiesActivated] = useState(false);
    const [filterActivated, toggleFilterActivated] = useState(false);
    const [hoveredText, setHoveredText] = useState("");

    // State-related handlers 

    const handleToggleEmoji = () => {
        toggleEmojiesActivated(prev => !prev)
        handleEnterEmoji();
    }

    const handleToggleFilter = filterBasedOn => {
        console.log(filterBasedOn);
        toggleFilterActivated(prev => !prev)
    }

    // CSS Enter btn related handlers
    const handleEnterEmoji = () => setHoveredText(`${emojiesActivated ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    const handleEnterSort = () => setHoveredText("Sort tasks");
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");

    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${filterActivated ? classes.activatedButton : ''}`}
                onMouseEnter={handleEnterSort} 
                onMouseLeave={handleLeave}
            ></button>
            <button 
                className={classes.clearAllTasksBtn}
                onMouseEnter = {handleEnterClearAll} 
                onMouseLeave = {handleLeave}
            ></button>
            <button 
                className={`${classes.toggleEmojiesBtn} ${emojiesActivated ? classes.activatedButton : ''}`}
                onMouseEnter={handleEnterEmoji}
                onClick={handleToggleEmoji}
                onMouseLeave = {handleLeave}
            ></button>
        </div>
        <div className={classes.hoveredTaskActionText}><h3 className={classes.hoveredTaskActionTextH3}>{hoveredText}</h3></div>
        <div> Add feature: filtering based on: autoemojies activated etc.</div>
        </>
    )

}

export default TaskActions;