
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    sortOption: '',
    emojiesOn: false,
    saveEmojies: false,
    saveSortOption: false,
    addTask: () => {},
    updateTasks: () => {},
    toggleEmojies: () => {},
    setSortOption: () => {},
    toggleSaveEmojies: () => {},
    toggleSaveSortOption: () => {},
    clearAllTasks: () => {},
});

export const TasksContextProvider = props => {

  // STATES - LOCAL STORAGE
  
  const [saveEmojies, setSaveEmojies] = useState(() => {
    const savedSaveEmojies = localStorage.getItem("savedSaveEmojies");
    if (savedSaveEmojies) {
      return JSON.parse(savedSaveEmojies);
    } else {
      return false;
    }
  });

  const [saveSortOption, setSaveSortOption] = useState(() => {
    const savedSaveSortOption = localStorage.getItem("savedSaveSortOption");
    if (savedSaveSortOption) {
      return JSON.parse(savedSaveSortOption);
    } else {
      return false;
    }
  });


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
      localStorage.setItem('savedSaveEmojies', JSON.stringify(saveEmojies));
      if(saveEmojies) {
        localStorage.setItem('savedEmojiesOn', JSON.stringify(emojiesOn));
      }
      else {
        localStorage.removeItem('savedEmojiesOn');
      }
  }, [emojiesOn, saveEmojies]);

  useEffect(() => {
    localStorage.setItem('savedSaveSortOption', JSON.stringify(saveSortOption));
    if (saveSortOption) {
      localStorage.setItem('savedSortOption', JSON.stringify(sortOption));
    } 
    else {
      localStorage.removeItem('savedSortOption');
    }
  }, [sortOption, saveSortOption]);

  // FUNCTIONS 
  
  const addTask = taskText => {
    const hasLongWord = checkInputWordLength(taskText);
    const newTask =  {
      taskText: taskText,
      isChecked: false,
      date: new Date(),
      importance: 0,
      deadline: '',
      hasLongWord: hasLongWord,
      key: new Date().getTime()
    };
    updateTasks(prevTasks => [...prevTasks, newTask]);
  }

  const clearAllTasks = () => {
      updateTasks([]);
  }
    
  return(
      <tasksContext.Provider
      value={{
          tasks: tasks,
          sortOption: sortOption,
          emojiesOn: emojiesOn,
          saveEmojies: saveEmojies,
          saveSortOption: saveSortOption,
          addTask: addTask,
          updateTasks: updateTasks,
          toggleEmojies: toggleEmojies,
          setSortOption: setSortOption,
          setSaveEmojies: setSaveEmojies,
          setSaveSortOption: setSaveSortOption,
          clearAllTasks: clearAllTasks
      }}
      >
          {props.children}
      </tasksContext.Provider>
  )

}


