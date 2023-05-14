import Modal from "../UI/Modal";
import classes from './SortTasksModal.module.css';
import { useContext } from 'react';
import { tasksContext } from '../../context/TasksContext';

const SortTasksModal = props => {

    const {themeColors} = useContext(tasksContext);

    const handleStartSorting = option => props.handleSortOption(option);

    const btnStyles = {
        border: `2px solid ${themeColors.primaryColor}`,
        color: themeColors.primaryColor
    }

    return(
        <Modal 
        btnText = {'Exit'}
        modalTaller = {true}
        closeModalHandler = {() => props.onClose()}
        mainBtnClick = {() => props.onClose()}
        >
            <div className={classes.sortTasksContainer}>
                <h2 className={classes.sortTasksTitle}>Sort based on..</h2>
                <div className={classes.sortOptionsContainer}>
                    <button style={btnStyles} onClick={() => handleStartSorting('newest')}>Newest</button>
                    <button style={btnStyles} onClick={() => handleStartSorting('unchecked')}>Unchecked</button>
                    <button style={btnStyles} onClick={() => handleStartSorting('importance')}>Importance ❗️</button>
                    <button style={btnStyles} onClick={() => handleStartSorting('deadline')}>Deadline ⏳</button>
                </div>
            </div>
        </Modal>
    )
}

export default SortTasksModal;