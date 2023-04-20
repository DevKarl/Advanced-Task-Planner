import settings from '../assets/settings.png';
import { useState } from 'react';
import SettingsModal from './Modals/SettingsModal';

const SettingsWheel = () => {
    
    // STATES

    const [style, setStyle] = useState({
        backgroundImage: `url(${settings})`,
        opacity: '80%',
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

    // HANDLERS

    const handleMouseEnter = () => {
        setStyle({
            ...style,
            transform: 'rotate(90deg)',
            opacity: '100%'
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            ...style,
            transform: 'rotate(0deg)',
            opacity: '80%'
        });
    };

    const handleClick = () => {
        setStyle({
            ...style,
            transform: 'rotate(90deg)',
        });
        togglesettingsModalActive(prev => !prev);
    };

    return(
        <>
        <div
            style={style}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        ></div>
        {settingsModalActive && <SettingsModal togglesettingsModalActive = {() => togglesettingsModalActive(prev => !prev)}/>}
        </>
    )

}


export default SettingsWheel;