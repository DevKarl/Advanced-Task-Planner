
// import classes from './ErrorModal.module.css';
import Modal from '../UI/Modal';

const ErrorModal = props => {

    const closeModalHandler = () => props.onClose();

    const mainBtnClick = () => props.onClose();

    return(
        <Modal
        btnText = {'Close'}
        closeModalHandler = {closeModalHandler}
        mainBtnClick = {mainBtnClick}
        >
            <h2>{props.errorMsg}</h2>
        </Modal>
    )
}

export default ErrorModal;