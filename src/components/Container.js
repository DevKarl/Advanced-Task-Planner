
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import TaskList from "./TaskList";
import './UI/CSSvariables.module.css';
import TaskActions from './TaskActions';
import SettingsWheel from './SettingsWheel';
import Progressbar from './Progressbar';
import { tasksContext } from "../context/TasksContext";
import { useContext, useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';


const Container = () => {

    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

    const {themeColors, tasks} = useContext(tasksContext);

    useEffect(() => {
        console.log('rendered');
        const handleResize = () => {
            setSize([window.innerHeight, window.innerWidth])
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const [height, width] = size;

    const allTasksChecked = tasks.every(task => task.isChecked === true);
  
    return(
        <>
            <main style={{backgroundColor: themeColors.cardColor}} className = {classes.container}>
                {allTasksChecked && <ReactConfetti 
                    numberOfPieces = {500} 
                    gravity={0.1} 
                    recycle = {false}
                    width={width}
                    height={height}
                    />}
                <SettingsWheel/>
                <Header/>
                <InputField/>
                <TaskActions/>
                <Progressbar/>
                <TaskList/>
            </main>
        </>
    )
}

export default Container;