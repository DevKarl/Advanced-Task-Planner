

const getSortedTasks = (sortOption, tasksArr) => {

    let sortedTasks = null;

    switch(sortOption) {
        case "newest":
        sortedTasks = [...tasksArr].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
        break;
        case "importance":
        sortedTasks = [...tasksArr].sort((a, b) => b.importance - a.importance);
        break;
        case "deadline":
        sortedTasks = [...tasksArr].sort((a, b) => {
            if (a.deadline === '' && b.deadline === '') {
            return 0;
            }
            if (a.deadline === '') {
            return 1;
            }
            if (b.deadline === '') {
            return -1;
            }
            return Date.parse(a.deadline) - Date.parse(b.deadline);
        });
        break; 
        case "unchecked":
        sortedTasks = [...tasksArr].sort((a, b) => a.isChecked - b.isChecked);
        break;
        // DEFAULT IS ALWAYS OLDEST FIRST
        default:
        sortedTasks = [...tasksArr].sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        break;
    }

    return sortedTasks;
}

export default getSortedTasks;

