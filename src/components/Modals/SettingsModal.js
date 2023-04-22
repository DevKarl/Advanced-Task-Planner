import Modal from '../UI/Modal';
import classes from './SettingsModal.module.css';
import { useState, useContext } from 'react';
import { tasksContext } from '../../context/tasksContext';

const SettingsModal = props => {

    const {saveEmojies, setSaveEmojies, saveSortOption, setSaveSortOption, themeColor, setThemeColor } = useContext(tasksContext);
    const [saveEmojiesState, toggleSaveEmojiesState] = useState(saveEmojies);
    const [saveSortOptionState, toggleSaveSortOptionState] = useState(saveSortOption);
    const [selectedColor, setSelectedColor] = useState(themeColor);
    console.log(themeColor, selectedColor);
    

    const handleCloseSettingsModal = () => props.togglesettingsModalActive();

    const handleModalMainBtnClick = () => {
        setSaveEmojies(saveEmojiesState);
        setSaveSortOption(saveSortOptionState);
        setThemeColor(selectedColor);
        handleCloseSettingsModal();
    }

    const handleColorClick = col => {
        setSelectedColor(col);
    }

    const colors = ["#2d7fd7", "#4caf50", "#c1c111", "#9e9e9e", "#ff9800", "#7b1fa2", "#00796b", "#e91e63", "#00bcd4"];

    
    return (
        <Modal style = {{height: '1000px'}}
            closeModalHandler = {handleCloseSettingsModal}
            modalXtraTall = {true}
            hasTwoBtns = 'true'
            btn1Text = 'Save'
            btn2Text = 'Close'
            btn1Click = {handleModalMainBtnClick}
            btn2Click = {handleCloseSettingsModal}
        >
            <div className={classes.settingsContainer}>
                <div className={classes.changeColorThemeContainer}>
                    <h3 className={classes.changeColorHeader}>Change Theme Color</h3>
                    <div className={classes.colorPickerBox}>
                        {colors.map((col, i) => {
                            return <div 
                                key = {i} 
                                className={`${classes.colorItem} ${selectedColor === col ? classes.colorItemSelected : ''}`} 
                                style={{ backgroundColor: col }}
                                onClick={() => handleColorClick(col)}
                            >{selectedColor === col ? '✔' : ''}</div>
                        })}
                    </div> 
                </div>
                <div className={classes.saveBtnOptContainer}>
                    <h3 className={classes.saveSortOptHeader}>Save Sort-Option</h3>
                    <label className={classes.switch}>
                        <input 
                            type="checkbox"
                            checked={saveSortOptionState}
                            onChange={() => toggleSaveSortOptionState(prev => !prev)}
                        />
                        <span className={classes.sliderRound}></span>
                    </label>
                </div>
                <div className={classes.saveBtnOptContainer}>
                    <h3 className={classes.saveAutoEmojiesHeader}>Save Auto-Emojies</h3>
                    <label className={classes.switch}>
                        <input 
                            type="checkbox"
                            checked={saveEmojiesState}
                            onChange={() => toggleSaveEmojiesState(prev => !prev)}
                        />
                        <span className={classes.sliderRound}></span>
                    </label>
                </div>
            </div>   
        </Modal>
    );

};


export default SettingsModal;