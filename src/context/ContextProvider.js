
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";
import themeColorCombinations from "../components/Helpers/themeColorCombinations";
import { tasksContext } from "./TasksContext";

export const TasksContextProvider = props => {  

  // STATES - LOCAL STORAGE

  const getLocalStorageItem = (key, defaultValue) => {
    const savedItem = localStorage.getItem(key);
    return savedItem ? JSON.parse(savedItem) : defaultValue;
  };
  
  const [tasks, updateTasks] = useState(() => getLocalStorageItem("savedTasks", []));
  const [allTasksDone, setAllTasksDone] = useState(() => getLocalStorageItem("allTasksDone", false));
  const [saveEmojies, setSaveEmojies] = useState(() => getLocalStorageItem("savedSaveEmojies", false));
  const [saveSortOption, setSaveSortOption] = useState(() => getLocalStorageItem("savedSaveSortOption", false));
  const [emojiesOn, toggleEmojies] = useState(() => getLocalStorageItem("savedEmojiesOn", false));
  const [sortOption, setSortOption] = useState(() => getLocalStorageItem("savedSortOption", ""));
  const [themeColors, setThemeColors] = useState(() => getLocalStorageItem("savedThemeColors", themeColorCombinations[0]));

  const [hasInteracted, setHasInteracted] = useState(false);
  
  // USE EFFECTS

  useEffect(() => {
      if(tasks.every(task => task.isChecked === true)) {
        setAllTasksDone(true)
      } else {
        setAllTasksDone(false)
      }
      localStorage.setItem("savedTasks", JSON.stringify(tasks));
      localStorage.setItem("allTasksDone", JSON.stringify(allTasksDone));
      if(tasks.length === 0) setSortOption('');
  }, [tasks, allTasksDone]);

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

  useEffect(() => {
    localStorage.setItem('savedThemeColors', JSON.stringify(themeColors));
  }, [themeColors])

  // TASK ACTION HANDLERS  

  const declareHasInteracted = () => {
    setHasInteracted(true);
  }

  const resetHasInteracted = () => {
    setHasInteracted(false);
  }
  
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

  const handleChangeThemeColor = primaryColor => {
    const newThemeColors = themeColorCombinations.find(color => color.primaryColor === primaryColor);
    if(newThemeColors) setThemeColors(newThemeColors);
  }
    
  return(
      <tasksContext.Provider
      value={{
          tasks: tasks,
          hasInteracted: hasInteracted,
          allTasksDone: allTasksDone,
          sortOption: sortOption,
          emojiesOn: emojiesOn,
          saveEmojies: saveEmojies,
          saveSortOption: saveSortOption,
          themeColors: themeColors,
          themeColorCombinations: themeColorCombinations,
          addTask: addTask,
          declareHasInteracted: declareHasInteracted,
          resetHasInteracted: resetHasInteracted,
          updateTasks: updateTasks,
          toggleEmojies: toggleEmojies,
          setSortOption: setSortOption,
          setSaveEmojies: setSaveEmojies,
          setSaveSortOption: setSaveSortOption,
          clearAllTasks: clearAllTasks,
          handleChangeThemeColor: handleChangeThemeColor
      }}
      >
          {props.children}
      </tasksContext.Provider>
  )

}


