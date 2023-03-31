
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import TaskList from "./TaskList";
import { useState } from 'react';
import './UI/CSSvariables.module.css';

const Container = () => {

    const [newTask, setNewTask] = useState(null);
    
      const addTask = taskText => {
        setNewTask ({
          taskText: taskText,
          isChecked: false,
        })
      };

    return(
        <main className = {classes.container}>
            <Header/>
              <InputField addTaskHandler = {addTask}/>
              <TaskList newTask = {newTask}/>
        </main>
    )
}

export default Container;