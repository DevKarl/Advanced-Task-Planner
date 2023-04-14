import settings from '../../assets/settings.png';
import Modal from '../UI/Modal';
import { useState } from 'react';

const SettingsModal = () => {

    const [style, setStyle] = useState({
        backgroundImage: `url(${settings})`,
        backgroundSize: 'cover',
        width: '30px',
        height: '30px',
        alignSelf: 'end',
        marginRight: '5px',
        marginTop: '5px',
        transition: 'transform 0.3s ease-in-out',
        transform: 'rotate(0deg)',
        cursor: 'pointer',
    });

    const [settingsModalActive, togglesettingsModalActive] = useState(false);

    const handleMouseEnter = () => {
        setStyle({
            ...style,
            transform: 'rotate(90deg)',
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            ...style,
            transform: 'rotate(0deg)',
        });
    };

    const handleClick = () => {
        setStyle({
            ...style,
            transform: 'rotate(90deg)',
        });
        togglesettingsModalActive(prev => !prev);
    };

    const handleModalMainBtnClick = () => {
        console.log('clicked settings main btn');
    }

    return (
        <>
        <div
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        ></div>
        {settingsModalActive && <Modal 
            closeModalHandler = {togglesettingsModalActive}
            hasTwoBtns = 'true'
            btn1Text = 'Save changes'
            btn2Text = 'Close'
            mainBtnClick = {handleModalMainBtnClick}
            autoFocus
        >

            
        </Modal>}
        </>
    );

};


export default SettingsModal;