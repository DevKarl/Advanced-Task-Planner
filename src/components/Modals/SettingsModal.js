import Modal from '../UI/Modal';
import classes from './SettingsModal.module.css';
import { useState, useContext } from 'react';
import { tasksContext } from '../../context/TasksContext';

const SettingsModal = props => {

    const {saveEmojies, setSaveEmojies, saveSortOption, setSaveSortOption, themeColors, themeColorCombinations, handleChangeThemeColor} = useContext(tasksContext);
    const [saveEmojiesState, toggleSaveEmojiesState] = useState(saveEmojies);
    const [saveSortOptionState, toggleSaveSortOptionState] = useState(saveSortOption);
    const [selectedColor, setSelectedColor] = useState(themeColors.primaryColor);
    

    const handleCloseSettingsModal = () => props.togglesettingsModalActive();

    const handleModalMainBtnClick = () => {
        setSaveEmojies(saveEmojiesState);
        setSaveSortOption(saveSortOptionState);
        handleChangeThemeColor(selectedColor);
        handleCloseSettingsModal();
    }

    const handleColorClick = col => {
        setSelectedColor(col);
    }

    const styleWhenSwitchOn = {
        backgroundColor: themeColors.primaryColor
    }
    
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
                        {themeColorCombinations.map((col, i) => {
                            return <div 
                                key = {i} 
                                className={`${classes.colorItem} ${selectedColor === col.primaryColor ? classes.colorItemSelected : ''}`} 
                                style={{ backgroundColor: col.primaryColor }}
                                onClick={() => handleColorClick(col.primaryColor)}
                            >{selectedColor === col.primaryColor ? '✔' : ''}</div>
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
                        <span style={saveSortOptionState ? styleWhenSwitchOn : {}} className={classes.sliderRound}></span>
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
                        <span style={saveEmojiesState ? styleWhenSwitchOn : {}} className={classes.sliderRound}></span>
                    </label>
                </div>
            </div>   
        </Modal>
    );

};


export default SettingsModal;