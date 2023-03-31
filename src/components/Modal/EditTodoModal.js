
import classes from './EditTodoModal.module.css';
import { useState } from 'react';
import Modal from '../UI/Modal';
import validateInput from '../Helpers/validateInput';

const EditTodoModal = props => {

    const [enteredTodoText, setEnteredTodoText] = useState(props.todoText);
    const [error, setError] = useState(null);

    if(error) {throw error};

    const handleChange = e => {
        setEnteredTodoText(e.target.value);
    }

    const closeModalHandler = () => {
        props.toggleEditTodoModal();
    }

    const changeTodoTextHandler = () => {
        try {
            validateInput(enteredTodoText.trim());
            if(!error) props.receivedChangedTodoText(props.index, enteredTodoText);
            closeModalHandler();
        } catch(error) {
            setError(error);
        }
    }

    return(
        <Modal 
        btnText = {'Change'}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {changeTodoTextHandler}
        clickedEnter = {changeTodoTextHandler}
        >
                <h1 className={classes.editTodoH3}>Edit Current Todo</h1>
                <textarea
                    value={enteredTodoText}
                    onChange = {handleChange}
                    autoFocus 
                    type='text' 
                    className = {classes.modalInputField}
                ></textarea>
        </Modal>
    )
}

export default EditTodoModal;