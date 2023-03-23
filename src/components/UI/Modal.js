import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React from 'react';

const Modal = props => {

    return ReactDOM.createPortal(
        <>
            <div className = {classes.modal}>
                <div className = {classes.content}>{props.children}</div>
                <button>{props.btnText}</button>
            </div>
            <div className = {classes.backdrop} onClick = {props.onClose}></div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;