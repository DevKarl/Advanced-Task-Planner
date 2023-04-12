
import classes from './TaskActions.module.css';
import { tasksContext } from '../context/tasksContext';
import { React, useState, useContext, useEffect } from 'react';
import ClearAllTasksModal from './Modals/ClearAllTasksModal';
import SortTasksModal from './Modals/SortTasksModal';

const TaskActions = () => {

    const {tasks, sortOn, sortOption, emojiesOn, toggleEmojies, toggleSort, setSortOption, sortTasks, clearAllTasks} = useContext(tasksContext);

    // States
    const [sortModal, toggleSortModal] = useState(false);
    const [clearTasksModal, toggleclearTasksModal] = useState(false);
    const [hoveredText, setHoveredText] = useState('');
    const [emojiMsg, setEmojiMsg] = useState('');
    const [error, setError] = useState(false);

    if(error) {
        throw new Error(error);
    };

    // Handlers 
    const handleToggleEmoji = () => {
        if (!emojiesOn) {
            toggleEmojies(true);
            setHoveredText(`${!emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
            setEmojiMsg('Automatic Emojies Activated 🙋‍♂️');
            return
        }
        toggleEmojies(false);
        setHoveredText(`${!emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
        setEmojiMsg('');
    }

    const handleToggleSort = () => {
        if(tasks.length === 0) {
            setError("Nothing to sort here 🤷‍♂️ Add some new tasks first.");
        }
        if(!sortOn) {
            toggleSortModal(true);
            return;
        }
        sortTasks(''); //back to default (newest first)
        setSortOption(''); 
        toggleSort(false);
        setHoveredText('Activate Sorting');
    }

    const handleSortOption = chosenSortOption => {
        toggleSortModal(false);
        toggleSort(true);
        setSortOption(chosenSortOption);
        sortTasks(chosenSortOption);
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
    const handleEnterSort = () => setHoveredText(`${sortOn ? 'Deactivate' : 'Activate'} Sorting`);
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");

    useEffect(() => {
        if (emojiesOn) {
            setEmojiMsg('Automatic Emojies Activated 🙋‍♂️');
        }
    }, [emojiesOn]);

    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${sortOn ? classes.activatedBtn : ''}`}
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
            {emojiesOn && <h4 className={classes.taskActionMsg}>{emojiMsg}</h4>}
            {sortOn && <h4 className={classes.taskActionMsg}>{`Sorting based on: ${sortOption} ⤵️`}</h4>}
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