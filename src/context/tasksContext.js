
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    sortOn: false,
    sortOption: '',
    emojiesOn: false,
    addTask: () => {},
    updateTasks: () => {},
    toggleEmojies: () => {},
    toggleSort: () => {},
    setSortOption: () => {},
    sortTasks: () => {},
    clearAllTasks: () => {},
});

export const TasksContextProvider = props => {

  // STATES - IN LOCAL STORAGE 

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

  const [sortOn, toggleSort] = useState(() => {
    const savedSortOn = localStorage.getItem("savedSortOn");
    if (savedSortOn) {
      return JSON.parse(savedSortOn);
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

  // OTHER STATES

  const [newTask, setNewTask] = useState(null);

    // USE EFFECTS

  useEffect(() => {
      localStorage.setItem("savedTasks", JSON.stringify(tasks));
      if(tasks.length === 0) {
        toggleSort(false);
      }
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("savedSortOn", JSON.stringify(sortOn));
  }, [sortOn]);

  useEffect(() => {
    localStorage.setItem("savedEmojiesOn", JSON.stringify(emojiesOn));
  }, [emojiesOn]);

  useEffect(() => {
    localStorage.setItem("savedSortOption", JSON.stringify(sortOption));
  }, [sortOption]);  

  useEffect(() => {
    if (newTask) {
      const hasLongWord = checkInputWordLength(newTask.taskText);
      const updatedTask = {
        ...newTask,
        hasLongWord: hasLongWord
      };
      updateTasks(prevTasks => [...prevTasks, updatedTask]);
    }
  }, [newTask]);

  // FUNCTIONS 
  
  const addTask = taskText => {
    setNewTask ({
      taskText: taskText,
      isChecked: false,
      date: new Date(),
      importance: 0,
      deadline: null
    });
  };

  const sortTasks = chosenSortOption => {
    switch(chosenSortOption) {
      case "newest":
        const sortedTasksNew = [...tasks].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        updateTasks(sortedTasksNew);
        break;
      case "importance":
        const sortedTasksImportance = [...tasks].sort((a, b) => b.importance - a.importance);
        updateTasks(sortedTasksImportance);
        break;
      case "deadline":
        const sortedTasksDeadline = [...tasks].sort((a, b) => {
          if (a.deadline === null && b.deadline === null) {
            return 0;
          }
          if (a.deadline === null) {
            return 1;
          }
          if (b.deadline === null) {
            return -1;
          }
          return Date.parse(a.deadline) - Date.parse(b.deadline);
        });
        updateTasks(sortedTasksDeadline);
        break; 
      case "unchecked":
        const sortedTasksUnfinished = [...tasks].sort((a, b) => a.isChecked - b.isChecked);
        updateTasks(sortedTasksUnfinished);
        break;
      // DEFAULT IS ALWAYS OLDEST FIRST
      default:
        const sortedTasksOld = [...tasks].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        updateTasks(sortedTasksOld);
        break;
    }
  }

  const clearAllTasks = () => {
      updateTasks([]);
  }
    
  return(
      <tasksContext.Provider
      value={{
          tasks: tasks,
          sortOn: sortOn,
          sortOption: sortOption,
          emojiesOn: emojiesOn,
          addTask: addTask,
          updateTasks: updateTasks,
          toggleEmojies: toggleEmojies,
          toggleSort: toggleSort,
          sortTasks: sortTasks,
          setSortOption: setSortOption,
          clearAllTasks: clearAllTasks
      }}
      
      >
          {props.children}
      </tasksContext.Provider>
  )

}


