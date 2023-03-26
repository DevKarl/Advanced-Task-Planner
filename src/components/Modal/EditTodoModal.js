
import classes from './EditTodoModal.module.css';
import { useRef } from 'react';
import Modal from '../UI/Modal';
import validateInput from '../Helpers/validateInput';

const EditTodoModal = props => {

    const inputRef = useRef(null);

    const closeModalHandler = () => {
        props.toggleEditTodoModal();
    }

    const changeTodoTextHandler = () => {

        try {
            validateInput(inputRef.current.value);
            props.receivedChangedTodoText(props.index, inputRef.current.value)
        } catch(error) {
            throw error;
        }
        closeModalHandler();
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
                    ref={inputRef}
                    autoFocus 
                    type='text' 
                    defaultValue={props.todoText}
                    className = {classes.modalInputField}
                ></textarea>
        </Modal>
    )
}

export default EditTodoModal;