
import classes from './TaskActions.module.css';
import { tasksContext } from '../context/tasksContext';
import { React, useState, useContext } from 'react';
import ClearAllTasksModal from './Modals/ClearAllTasksModal';
import SortTasksModal from './Modals/SortTasksModal';

const TaskActions = () => {

    const {tasks, sortOption, emojiesOn, toggleEmojies, setSortOption, clearAllTasks} = useContext(tasksContext);

    // States
    const [sortModal, toggleSortModal] = useState(false);
    const [clearTasksModal, toggleclearTasksModal] = useState(false);
    const [hoveredText, setHoveredText] = useState('');
    const [error, setError] = useState(false);

    if(error) {
        throw new Error(error);
    };

    // Handlers 
    const handleToggleEmoji = () => {
        if (!emojiesOn) {
            toggleEmojies(true);
            setHoveredText(`${!emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
            return
        }
        toggleEmojies(false);
        setHoveredText(`${!emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    }

    const handleToggleSort = () => {
        if(tasks.length === 0) {
            setError("Nothing to sort here 🤷‍♂️ Add some new tasks first.");
        }
        if(sortOption === '') {
            toggleSortModal(true);
            return;
        }
        setSortOption(''); 
        setHoveredText('Activate Sorting');
    }

    const handleSortOption = chosenSortOption => {
        toggleSortModal(false);
        setSortOption(chosenSortOption);
    }

    const handleClearAllTasks = () => {
        if(tasks.length === 0) {
            setError("All tasks are already cleared.");
        }
        toggleclearTasksModal(true);
    }

    const handleConfirmedClearTasks = () => {
        toggleclearTasksModal(prev => !prev);
        clearAllTasks();
    }

    const handleExitSortModal = () => {
        toggleSortModal(false);
    }

    // CSS handlers for animations 
    const handleEnterEmoji = () => setHoveredText(`${emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    const handleEnterSort = () => setHoveredText(`${sortOption ? 'Deactivate' : 'Activate'} Sorting`);
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");


    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${sortOption ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterSort} 
                onMouseLeave={handleLeave}
                onClick={handleToggleSort}
            ></button>
            <button 
                className={classes.clearAllTasksBtn}
                onMouseEnter = {handleEnterClearAll} 
                onMouseLeave = {handleLeave}
                onClick={handleClearAllTasks}
            ></button>
            <button
                className={`${classes.toggleEmojiesBtn} ${emojiesOn ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterEmoji}
                onMouseLeave = {handleLeave}
                onClick={handleToggleEmoji} 
            ></button>
        </div>
        <div className={classes.hoveredTaskActionText}><h3 className={classes.hoveredTaskActionTextH3}>{hoveredText}</h3></div>
        <div className={classes.taskActionsMessages}>
            {emojiesOn && <h4 className={classes.taskActionMsg}>Auto-Emojies Activated</h4>}
            {sortOption && <h4 className={classes.taskActionMsg}>{`Sorting based on ${sortOption} ⤵️`}</h4>}
        </div>
        {clearTasksModal && <ClearAllTasksModal
        onClose = {() => toggleclearTasksModal(prev => !prev)}
        onYesClick = {handleConfirmedClearTasks}
        />}
        {sortModal && <SortTasksModal
        onClose = {handleExitSortModal}
        handleSortOption = {handleSortOption}
        />}
        
        </>
    )
}

export default TaskActions;