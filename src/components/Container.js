
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import TaskList from "./TaskList";
import './UI/CSSvariables.module.css';
import TaskActions from './TaskActions';
import SettingsWheel from './SettingsWheel';
import Progressbar from './Progressbar';
import { tasksContext } from '../context/tasksContext';
import { useContext } from 'react';

const Container = () => {

    const {themeColors} = useContext(tasksContext)
  
    return(
        <main style={{backgroundColor: themeColors.cardColor}} className = {classes.container}>
            <SettingsWheel/>
            <Header/>
            <InputField/>
            <TaskActions/>
            <Progressbar/>
            <TaskList/>
        </main>
    )
}

export default Container;