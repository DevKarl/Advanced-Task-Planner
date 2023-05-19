
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import TaskList from "./TaskList";
import './UI/CSSvariables.module.css';
import TaskActions from './TaskActions';
import SettingsWheel from './SettingsWheel';
import Progressbar from './Progressbar';
import { tasksContext } from "../context/TasksContext";
import { useContext, useRef, useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

const Container = () => {
    
    const {themeColors, tasks, allTasksDone, hasInteracted} = useContext(tasksContext);

    const confettiColors = Object.values(themeColors);

    const refContainer = useRef();
    const height = refContainer.current ? Math.max(window.innerHeight, refContainer.current.offsetHeight)+20 : window.innerHeight+20;
    const [width, setWidth] = useState(window.innerWidth);
    
    const debounce = (cb) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb();                
            }, 400);
        }
    }

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }
  
    useEffect(() => {
        window.addEventListener('resize', debounce(updateWidth))
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    }, []);


    return(
        <main ref = {refContainer} style={{backgroundColor: themeColors.cardColor}} className = {classes.container}>
            {(allTasksDone && tasks.length >= 3 && hasInteracted === true) && <ReactConfetti
            colors={confettiColors} 
            numberOfPieces = {600} 
            gravity={0.20} 
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
    )
}

export default Container;