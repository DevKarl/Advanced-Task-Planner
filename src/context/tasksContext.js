
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    sortOption: '',
    emojiesOn: false,
    addTask: () => {},
    updateTasks: () => {},
    toggleEmojies: () => {},
    setSortOption: () => {},
    clearAllTasks: () => {},
});

export const TasksContextProvider = props => {

  // STATES - LOCAL STORAGE 

  const [tasks, updateTasks] = useState(() => {
      const savedTasks = localStorage.getItem("savedTasks");
      if (savedTasks) {
        return JSON.parse(savedTasks);
      } else {
        return [];
      }
  });

  const [emojiesOn, toggleEmojies] = useState(() => {
    const savedEmojiesOn = localStorage.getItem("savedEmojiesOn");
    if (savedEmojiesOn) {
      return JSON.parse(savedEmojiesOn);
    } else {
      return false;
    }
  });

  const [sortOption, setSortOption] = useState(() => {
    const savedSortOption = localStorage.getItem("savedSortOption");
    if (savedSortOption) {
      return JSON.parse(savedSortOption);
    } else {
      return '';
    }
  });


  // USE EFFECTS

  useEffect(() => {
      localStorage.setItem("savedTasks", JSON.stringify(tasks));
      if(tasks.length === 0) setSortOption('');
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("savedEmojiesOn", JSON.stringify(emojiesOn));
  }, [emojiesOn]);

  // FUNCTIONS 
  
  const addTask = taskText => {
    const hasLongWord = checkInputWordLength(taskText);
    const newTask =  {
      taskText: taskText,
      isChecked: false,
      date: new Date(),
      importance: 0,
      deadline: '',
      hasLongWord: hasLongWord
    };
    updateTasks(prevTasks => [...prevTasks, newTask]);
  };

  const clearAllTasks = () => {
      updateTasks([]);
  }
    
  return(
      <tasksContext.Provider
      value={{
          tasks: tasks,
          sortOption: sortOption,
          emojiesOn: emojiesOn,
          addTask: addTask,
          updateTasks: updateTasks,
          toggleEmojies: toggleEmojies,
          setSortOption: setSortOption,
          clearAllTasks: clearAllTasks
      }}
      >
          {props.children}
      </tasksContext.Provider>
  )

}


