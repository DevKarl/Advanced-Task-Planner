
import classes from './ErrorModal.module.css';
import '../UI/CSSvariables.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import { tasksContext } from '../../context/TasksContext';

const ErrorModal = props => {

    const {themeColors} = useContext(tasksContext);

    const closeModalHandler = () => props.onClose();

    const mainBtnClick = () => props.onClose();

    return(
        <Modal
        btnText = {'OK'}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {mainBtnClick}
        >
            <div className={classes.errContainer}>
                <h1 style={{color: themeColors.primaryColor}}>ERROR</h1>
                <h2 className={classes.errMsg}>{props.errorMsg}</h2>
            </div>
        </Modal>
    )
}

export default ErrorModal;