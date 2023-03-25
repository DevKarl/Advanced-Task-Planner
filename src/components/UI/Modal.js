import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';
import '../UI/CSSvariables.module.css';

const Modal = props => {
    
    return ReactDOM.createPortal(
        <>
            <div className = {classes.modal}>
                <button className={classes.closeModalBtn}></button>
                <div className = {classes.content}>{props.children}</div>
                <button 
                    className={classes.modalBtn}
                >{props.btnText}
                </button>
            </div>
            <div className = {classes.backdrop} onClick = {props.onClose}></div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;