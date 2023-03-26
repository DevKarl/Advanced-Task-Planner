import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
import '../UI/CSSvariables.module.css';

const Modal = props => {

    const closeModal = () => props.closeModalHandler();

    const handleKeyDown = e  => {
        if (e.keyCode === 27) {
            closeModal();
        }
        if (e.keyCode === 13 && props.clickedEnter) {
            props.clickedEnter();
        }
    }

    return ReactDOM.createPortal(
        <>
            <div 
                className = {classes.modal} 
                onKeyDown = {handleKeyDown}
                tabIndex = {0}
                >
                <button className={classes.closeModalBtn} onClick = {closeModal}></button>
                <div>{props.children}</div>
                <button 
                    className={classes.modalBtn}
                    onClick = {props.mainBtnClick}
                >
                    {props.btnText}
                </button>
            </div>
            <div className = {classes.backdrop} onClick = {closeModal}></div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;