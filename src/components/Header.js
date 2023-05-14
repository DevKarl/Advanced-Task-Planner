import classes from './Header.module.css';
import { useContext } from 'react';
import { tasksContext } from "../context/TasksContext";

const Header = () => {

    const {themeColors} = useContext(tasksContext);
    
    return(
        <div className = {classes.header}>
            <h1 style={{color: themeColors.primaryColor}}>Task Planner ✔</h1>
        </div>
    )
};


export default Header;