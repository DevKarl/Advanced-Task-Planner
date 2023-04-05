
import classes from './TaskActions.module.css';
import { React, useState } from 'react';
import ClearAllTasksModal from './Modals/ClearAllTasksModal';
import FilterTasksModal from './Modals/FilterTasksModal';

const TaskActions = props => {

    // states 
    const [emojiesActivated, toggleEmojiesActivated] = useState(false);
    const [filterActivated, toggleFilterActivated] = useState(false);
    const [filterTasksModal, togglefilterTasksModal] = useState(false);
    const [clearTasksModal, toggleclearTasksModal] = useState(false);

    const [hoveredText, setHoveredText] = useState('');
    const [filterMsg, setfilterMsg] = useState('');
    const [emojiMsg, setEmojiMsg] = useState('');

    // Handlers 

    const handleToggleEmoji = () => {
        if (!emojiesActivated) {
            toggleEmojiesActivated(true);
            setHoveredText(`${!emojiesActivated ? 'Deactivate' : 'Activate'} Auto-Emojies`);
            setEmojiMsg('Automatic Emojies Activated 🙋‍♂️');
            return
        }
        toggleEmojiesActivated(false);
        setHoveredText(`${!emojiesActivated ? 'Deactivate' : 'Activate'} Auto-Emojies`);
        setEmojiMsg('');
    }

    const handleToggleFilter = () => {
        if(!filterActivated) {
            togglefilterTasksModal(true);
            toggleFilterActivated(true);
            return;
        }
        // disable filter in context from HERE
        toggleFilterActivated(false);
        setfilterMsg("");
    }

    const handleFilterOption = filterOption => {
        console.log(filterOption);
        setfilterMsg(`Filtering based on: ${filterOption} ⤵️`);
        togglefilterTasksModal(false);
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

    // CSS handlers for animations 
    const handleEnterEmoji = () => setHoveredText(`${emojiesActivated ? 'Deactivate' : 'Activate'} Auto-Emojies`);
    const handleEnterSort = () => setHoveredText(`${filterActivated ? 'Deactivate' : 'Activate'} Filter`);
    const handleEnterClearAll = () => setHoveredText("Clear all tasks");
    const handleLeave = () => setHoveredText("");

    return(
        <>
        <div className={classes.taskActionsContainer}>
            <button 
                className={`${classes.sortBtn} ${filterActivated ? classes.activatedBtn : ''}`}
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
                className={`${classes.toggleEmojiesBtn} ${emojiesActivated ? classes.activatedBtn : ''}`}
                onMouseEnter={handleEnterEmoji}
                onMouseLeave = {handleLeave}
            ></button>
        </div>
        <div className={classes.hoveredTaskActionText}><h3 className={classes.hoveredTaskActionTextH3}>{hoveredText}</h3></div>
        <div className={classes.taskActionsMessages}>
            <h4 className={classes.taskActionMsg}>{emojiMsg}</h4>
            <h4 className={classes.taskActionMsg}>{filterMsg}</h4>
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