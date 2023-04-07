
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    filterOn: false,
    emojiesOn: false,
    addTask: () => {},
});

export const TasksContextProvider = props => {

    // STATES

    const [tasks, updateTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          return JSON.parse(savedTasks);
        } else {
          return [];
        }
    });

    const [newTask, setNewTask] = useState(null);
    
    const addTask = taskText => {
      setNewTask ({
        taskText: taskText,
        isChecked: false
      })
    };

    // Refactor later: const [taskAppeared, updateTaskAppeared] = useState(false);

    // USE EFFECTS 

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (newTask) {
        //  Refactor later: !taskAppeared && updateTaskAppeared(true);
          const hasLongWord = checkInputWordLength(newTask.taskText);
          const updatedTask = {
            ...newTask,
            hasLongWord: hasLongWord
          };
          updateTasks(prevTasks => [...prevTasks, updatedTask]);
        }
      }, [newTask]);

      
    return(
        <tasksContext.Provider
        value={{
            tasks: tasks,
            filterOn: false,
            emojiesOn: false,
            addTask: addTask,
            updateTasks: updateTasks
        }}
        
        >
            {props.children}
        </tasksContext.Provider>
    )

}


