import Modal from '../UI/Modal';
import classes from './SettingsModal.module.css';

const SettingsModal = props => {


    const handleCloseSettingsModal = () => props.togglesettingsModalActive();

    const handleModalMainBtnClick = () => {
        console.log('settings main btn clicked');
    }

    return (
        <Modal 
            closeModalHandler = {handleCloseSettingsModal}
            modalTaller = {true}
            hasTwoBtns = 'true'
            btn1Text = 'Save changes'
            btn2Text = 'Close'
            btn1Click = {handleModalMainBtnClick}
            btn2Click = {handleCloseSettingsModal}
        >
            <div className={classes.settingsContainer}>
                <div className={classes.changeColorThemeContainer}>
                    <h3>Change Color Theme</h3>
                    <div className={classes.colorPickerBox}>
                        <p>Blue</p>
                        <p>Yellow</p>
                        <p>Orange</p>
                        <p>Blue</p>

                    </div> 
                </div>
                <h3>Save Sort-Option</h3>   
                <h3>Save Auto-Emojies</h3>
            </div>   
        </Modal>
    );

};


export default SettingsModal;