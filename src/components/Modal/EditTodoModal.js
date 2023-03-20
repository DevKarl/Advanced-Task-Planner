
import classes from './EditTodoModal.module.css';
import { useRef } from 'react';

const Modal = props => {

    const inputRef = useRef(null);

    const closeModalHandler = () => {
        props.toggleModal();
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
        <>
        <div className={classes.modalContent}>
            <h1>Edit Current Todo</h1>
            <input
                ref={inputRef}
                autoFocus 
                type='text' 
                defaultValue={props.todoText}
                className = {classes.modalInputField}
                onKeyDown={handleKeyDown}
                ></input>
            <button className={classes.modalBtn} onClick = {changeTodoTextHandler}>Change</button>
            <div className={classes.closeModalBtn} onClick = {closeModalHandler}></div>
        </div>
        <div className={classes.modalOverlay} onClick = {closeModalHandler}></div>
        </>
    )
}

export default Modal;