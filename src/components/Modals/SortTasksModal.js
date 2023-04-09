

import Modal from "../UI/Modal";
import classes from './SortTasksModal.module.css';

const SortTasksModal = props => {

    const handleStartSorting = option => props.enteredSortOption(option);

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
                    <button onClick={() => handleStartSorting('newest')}>Newest</button>
                    <button onClick={() => handleStartSorting('oldest')}>Oldest</button>
                    <button onClick={() => handleStartSorting('importance')}>Importance ❗️</button>
                    <button onClick={() => handleStartSorting('deadline')}>Deadline ⏳</button>
                </div>
            </div>
        </Modal>
    )
}

export default SortTasksModal;