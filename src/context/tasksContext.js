
import React, {useState, useEffect} from "react";
import { checkInputWordLength } from "../components/Helpers/InputControl";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    filterOn: false,
    filterOption: '',
    emojiesOn: false,
    addTask: () => {},
    updateTasks: () => {},
    toggleEmojies: () => {},
    toggleFilter: () => {},
    setFilterOption: () => {},
    filterTasks: () => {},
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

const [filterOn, toggleFilter] = useState(() => {
  const savedFilterOn = localStorage.getItem("savedFilterOn");
  if (savedFilterOn) {
    return JSON.parse(savedFilterOn);
  } else {
    return false;
  }
});

const [filterOption, setFilterOption] = useState(() => {
  const savedFilterOption = localStorage.getItem("savedFilterOption");
  if (savedFilterOption) {
    return JSON.parse(savedFilterOption);
  } else {
    return '';
  }
});

// OTHER STATES

const [newTask, setNewTask] = useState(null);

// FUNCTIONS 
  
  const addTask = taskText => {
    setNewTask ({
      taskText: taskText,
      isChecked: false,
      date: new Date(),
      importance: 0,
      deadline: null
    })
  };

  const filterTasks = chosenFilterOption => {
    switch(chosenFilterOption) {
      case "oldest":
        const tasksFilteredOld = [...tasks].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        updateTasks(tasksFilteredOld);
        break;
      case "importance":
        const tasksFilteredImportance = [...tasks].sort((a, b) => b.importance - a.importance);
        updateTasks(tasksFilteredImportance);
        break;
      case "deadline":
        const tasksFilteredDeadline = [...tasks].sort((a, b) => {
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
        updateTasks(tasksFilteredDeadline);
        break;
      // DEFAULT IS ALWAYS NEWEST FIRST 
      default:
        const tasksFilteredNew = [...tasks].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        updateTasks(tasksFilteredNew);
        break;
    }
  }

  const clearAllTasks = () => {
      updateTasks([]);
  }

  // Refactor later: const [taskAppeared, updateTaskAppeared] = useState(false);

  // USE EFFECTS

  useEffect(() => {
      localStorage.setItem("savedTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("savedFilterOn", JSON.stringify(filterOn));
  }, [filterOn]);

  useEffect(() => {
    localStorage.setItem("savedEmojiesOn", JSON.stringify(emojiesOn));
  }, [emojiesOn]);

  useEffect(() => {
    localStorage.setItem("savedFilterOption", JSON.stringify(filterOption));
  }, [filterOption]);  

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
          filterOn: filterOn,
          filterOption: filterOption,
          emojiesOn: emojiesOn,
          addTask: addTask,
          updateTasks: updateTasks,
          toggleEmojies: toggleEmojies,
          toggleFilter: toggleFilter,
          filterTasks: filterTasks,
          setFilterOption: setFilterOption,
          clearAllTasks: clearAllTasks
      }}
      
      >
          {props.children}
      </tasksContext.Provider>
  )

}


