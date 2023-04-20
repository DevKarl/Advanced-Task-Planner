import Modal from '../UI/Modal';
import classes from './SettingsModal.module.css';

const SettingsModal = props => {


    const handleCloseSettingsModal = () => props.togglesettingsModalActive();

    const handleModalMainBtnClick = () => {
        console.log('settings main btn clicked');
    }

    // blue, green, yellow, grey, orange, purple, teal, pink
    const colors = ['#2d7fd7', "#4caf50", "#ffd54f", "#9e9e9e", "#ff9800", "#7b1fa2", "#00796b", "#e91e63"];

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
                        {colors.map((col, i) => {
                            



                        })}
                    </div> 
                </div>
                <h3>Save Sort-Option</h3>   
                <h3>Save Auto-Emojies</h3>
            </div>   
        </Modal>
    );

};


export default SettingsModal;