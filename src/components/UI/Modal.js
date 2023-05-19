import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useContext } from 'react';
import { tasksContext } from '../../context/TasksContext';
import '../UI/CSSvariables.module.css';

const Modal = props => {

    const {themeColors} = useContext(tasksContext);

    const modalRef = useRef(null);

    const closeModal = () => props.closeModalHandler();

    const handleKeyDown = e  => {
        if (e.keyCode === 27) {
            closeModal();
        }
        if (e.keyCode === 13 && props.clickedEnter) {
            props.clickedEnter();
        }
    }

    useEffect(() => {
        modalRef.current.focus();
    }, [])

    const btnStyle = {
        backgroundColor: themeColors.primaryColor
    }

    return ReactDOM.createPortal(
        <>
            <div 
                className = {`
                    ${classes.modalRegularSize} 
                    ${props.modalTaller ? classes.modalTaller : ''} 
                    ${props.modalXtraTall ? classes.modalXtraTall : ''}
                `} 
                onKeyDown = {handleKeyDown}
                tabIndex = {0}
                ref={modalRef}
                >
                <button className={classes.closeModalBtn} onClick = {closeModal}></button>
                <div>{props.children}</div>
                {props.btnText && <button
                    style={btnStyle} 
                    className={classes.modalBtn}
                    onClick = {props.mainBtnClick}
                >
                    {props.btnText}
                </button>}
                {props.hasTwoBtns &&
                <div className={classes.hasTwoBtnsBtnContainer}>
                    <button
                        style={btnStyle}  
                        className={classes.modalBtn}
                        onClick = {props.btn1Click}
                    >
                        {props.btn1Text}
                    </button>
                    <button
                        style= {props.btn2Style ? props.btn2Style: btnStyle}  
                        className={classes.modalBtn}
                        onClick = {props.btn2Click}
                    >
                        {props.btn2Text}
                    </button>
                </div> 
                }
            </div>
            <div className = {classes.backdrop} onClick = {closeModal}></div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal;