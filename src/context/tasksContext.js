import React from "react";

export const tasksContext = React.createContext({
    // ONLY for syntax highlighting
    tasks: [],
    sortOption: '',
    emojiesOn: false,
    saveEmojies: false,
    saveSortOption: false,
    themeColors: {},
    themeColorCombinations: [],
    addTask: () => {},
    updateTasks: () => {},
    toggleEmojies: () => {},
    setSortOption: () => {},
    toggleSaveEmojies: () => {},
    toggleSaveSortOption: () => {},
    clearAllTasks: () => {},
    handleChangeThemeColor: () => {}
});
