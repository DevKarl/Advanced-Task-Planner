
import classes from './TaskActions.module.css';
import { tasksContext } from '../context/tasksContext';
import { React, useState, useContext, useEffect } from 'react';
import ClearAllTasksModal from './Modals/ClearAllTasksModal';
import FilterTasksModal from './Modals/FilterTasksModal';

const TaskActions = () => {

    const {filterOn, filterOption, emojiesOn, toggleEmojies, toggleFilter, setFilterOption, clearAllTasks, filterTasks} = useContext(tasksContext);

    // States
    const [filterTasksModal, togglefilterTasksModal] = useState(false);
    const [clearTasksModal, toggleclearTasksModal] = useState(false);
    const [hoveredText, setHoveredText] = useState('');
    const [emojiMsg, setEmojiMsg] = useState('');

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

    const handleToggleFilter = () => {
        if(!filterOn) {
            togglefilterTasksModal(true);
            return;
        }
        filterTasks(''); //back to default (newest first)
        setFilterOption(''); 
        toggleFilter(false);
    }

    const handleFilterOption = chosenFilterOption => {
        togglefilterTasksModal(false);
        toggleFilter(true);
        setFilterOption(chosenFilterOption);
        filterTasks(filterOption);
    }

    const handleClearAllTasks = () => {
        toggleclearTasksModal(true);
    }

    const handleConfirmedClearTasks = () => {
        toggleclearTasksModal(prev => !prev);
        clearAllTasks();
    }

    const handleExitFilterTasksModal = () => {
        togglefilterTasksModal(prev => !prev);
        toggleFilter(prev => !prev);
    }

    // CSS handlers for animations 
    const handleEnterEmoji = () => setHoveredText(`${emojiesOn ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    const handleEnterSort = () => setHoveredText(`${filterOn ? 'Deactivate' : 'Activate'} Filter`);
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");

    // useEffect for enabled actions messages (filterMsg and emojiMsg)
    useEffect(() => {
        if (emojiesOn) {
            setEmojiMsg('Automatic Emojies Activated 🙋‍♂️');
        }
    }, [emojiesOn]);

    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${filterOn ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterSort} 
                onMouseLeave={handleLeave}
                onClick={handleToggleFilter}
            ></button>
            <button 
                className={classes.clearAllTasksBtn}
                onMouseEnter = {handleEnterClearAll} 
                onMouseLeave = {handleLeave}
                onClick={handleClearAllTasks}
            ></button>
            <button
                onClick={handleToggleEmoji} 
                className={`${classes.toggleEmojiesBtn} ${emojiesOn ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterEmoji}
                onMouseLeave = {handleLeave}
            ></button>
        </div>
        <div className={classes.hoveredTaskActionText}><h3 className={classes.hoveredTaskActionTextH3}>{hoveredText}</h3></div>
        <div className={classes.taskActionsMessages}>
            {emojiesOn && <h4 className={classes.taskActionMsg}>{emojiMsg}</h4>}
            {filterOn && <h4 className={classes.taskActionMsg}>{`Filtering based on: ${filterOption} ⤵️`}</h4>}
        </div>
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