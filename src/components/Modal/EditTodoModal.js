
import classes from './EditTodoModal.module.css';
import { useRef } from 'react';
import Modal from '../UI/Modal';

const EditTodoModal = props => {

    console.log(props);

    const inputRef = useRef(null);

    const closeModalHandler = () => {
        props.toggleEditTodoModal();
    }

    const changeTodoTextHandler = () => {
        props.receivedChangedTodoText(props.index, inputRef.current.value)
        closeModalHandler();
    }

    const handleKeyDown = e  => {

        if (e.keyCode === 27) {
            closeModalHandler();
        }
        if (e.keyCode === 13) {
            changeTodoTextHandler();
            closeModalHandler();
        }
    }

    return(
        <Modal 
        btnText = {'Change Todo'}

        >
                <h1 className={classes.editTodoH3}>Edit Current Todo</h1>
                <textarea
                    ref={inputRef}
                    autoFocus 
                    type='text' 
                    defaultValue={props.todoText}
                    className = {classes.modalInputField}
                    onKeyDown={handleKeyDown}
                ></textarea>
        </Modal>
    )
}

export default EditTodoModal;