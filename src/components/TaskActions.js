
import classes from './TaskActions.module.css';
import { React, useState } from 'react';
import ClearAllTasksModal from './Modals/ClearAllTasksModal';
import FilterTasksModal from './Modals/FilterTasksModal';

const TaskActions = props => {

    // states 
    const [emojiesActivated, toggleEmojiesActivated] = useState(false);
    const [filterActivated, toggleFilterActivated] = useState(false);
    const [clearTasksModal, toggleclearTasksModal] = useState(false);
    const [filterTasksModal, togglefilterTasksModal] = useState(false);
    const [hoveredText, setHoveredText] = useState("");

    // Handlers 

    const handleToggleEmoji = () => {
        handleEnterEmoji();
        toggleEmojiesActivated(prev => !prev)
        // PUT EMOJI STATE INSIDE CONTEXT API, TOGGLE FROM HERE
    }

    const handleToggleFilter = () => {
        if(!filterActivated) {
            togglefilterTasksModal(true);
            toggleFilterActivated(true);
            return;
        }
    }

    const handleFilterOption = filterOption => {
        console.log(filterOption);
    }

    const handleClearAllTasks = () => {
        toggleclearTasksModal(true);
    }

    const handleConfirmedClearTasks = () => {
        console.log('yes confirmed on clear all');
        toggleclearTasksModal(prev => !prev)
    }

    const handleExitFilterTasksModal = () => {
        togglefilterTasksModal(prev => !prev);
        toggleFilterActivated(prev => !prev);
    }

    // CSS Enter btn related handlers
    const handleEnterEmoji = () => setHoveredText(`${emojiesActivated ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    const handleEnterSort = () => setHoveredText("Filter tasks");
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");

    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${filterActivated ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterSort}
                onClick={handleToggleFilter} 
                onMouseLeave={handleLeave}
            ></button>
            <button 
                className={classes.clearAllTasksBtn}
                onMouseEnter = {handleEnterClearAll} 
                onMouseLeave = {handleLeave}
                onClick={handleClearAllTasks}
            ></button>
            <button 
                className={`${classes.toggleEmojiesBtn} ${emojiesActivated ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterEmoji}
                onClick={handleToggleEmoji}
                onMouseLeave = {handleLeave}
            ></button>
        </div>
        <div className={classes.hoveredTaskActionText}><h3 className={classes.hoveredTaskActionTextH3}>{hoveredText}</h3></div>
        <div> Add feature: filtering based on: autoemojies activated etc.</div>
        {clearTasksModal && <ClearAllTasksModal
        onClose = {() => toggleclearTasksModal(prev => !prev)}
        onYesClick = {handleConfirmedClearTasks}
        />}
        {filterTasksModal && <FilterTasksModal
        onClose = {handleExitFilterTasksModal}
        enteredFilterOption = {handleFilterOption}
        />}
        </>
    )
}

export default TaskActions;