
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
    
    const {themeColors, tasks, allTasksDone} = useContext(tasksContext);

    const confettiColors = Object.values(themeColors);

    const refContainer = useRef();
    const height = refContainer.current ? Math.max(window.innerHeight, refContainer.current.offsetHeight) : window.innerHeight;
    const [width, setWidth] = useState(window.innerWidth);

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }
  
    useEffect(() => {
      window.addEventListener('resize', updateWidth)
      return () => {
        window.removeEventListener('resize', updateWidth)
      }
    }, []);
  
    // if (refContainer.current) {
    //   console.log(refContainer.current.offsetHeight);
    //   console.log(window.innerWidth);
    //   console.log(dimensions);
    // }

    console.log(height, width);

    return(
        <main ref = {refContainer} style={{backgroundColor: themeColors.cardColor}} className = {classes.container}>
            {(allTasksDone && tasks.length >= 3) && <ReactConfetti
            colors={confettiColors} 
            numberOfPieces = {500} 
            gravity={0.15} 
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