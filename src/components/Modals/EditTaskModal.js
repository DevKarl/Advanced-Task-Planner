
import classes from './EditTaskModal.module.css';
import { useState } from 'react';
import Modal from '../UI/Modal';
import { validateInput } from '../Helpers/InputControl';

const EditTaskModal = props => {

    const [enteredTaskText, setEnteredTaskText] = useState(props.taskText);
    const [error, setError] = useState(false);

    if(error) {throw error};

    const handleChange = e => {
        setEnteredTaskText(e.target.value);
    }

    const closeModalHandler = () => {
        props.toggleEditTaskModal();
    }

    const changeTaskTextHandler = () => {
        try {
            validateInput(enteredTaskText.trim());
            if(!error) props.receivedChangedTaskText(props.index, enteredTaskText);
            closeModalHandler();
        } catch(error) {
            setError(error);
        }
    }

    return(
        <Modal 
        btnText = {'Change'}
        modalTaller = {true}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {changeTaskTextHandler}
        clickedEnter = {changeTaskTextHandler}
        >
            <div className={classes.editTaskModalContainer}>
                <h2 className={classes.editTodoH3}>Edit Current Task</h2>
                <textarea
                    value={enteredTaskText}
                    onChange = {handleChange}
                    autoFocus 
                    type='text' 
                    className = {classes.modalInputField}
                ></textarea>
                <div className={classes.importanceAndDeadlineContainer}>
                    <div className={classes.importanceContainer}>
                        <h3>Importance</h3>
                        <button>!</button>
                        <button>!!</button>
                        <button>!!!</button>
                    </div>
                    <div className={classes.deadlineContainer}>
                        <h3>Deadline</h3>
                        <input type='date'/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditTaskModal;