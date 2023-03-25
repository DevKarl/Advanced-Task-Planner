import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
import '../UI/CSSvariables.module.css';

const Modal = props => {

    return ReactDOM.createPortal(
        <>
            <div 
                className = {classes.modal} 
                onKeyDown = {props.handleKeyDown}
                tabIndex = {0}
                >
                <button className={classes.closeModalBtn} onClick = {props.closeModalHandler}></button>
                <div className = {classes.content}>{props.children}</div>
                <button 
                    className={classes.modalBtn}
                    onClick = {props.btnClick}
                >{props.btnText}
                </button>
            </div>
            <div className = {classes.backdrop} onClick = {props.closeModalHandler}></div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;