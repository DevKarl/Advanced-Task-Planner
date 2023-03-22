
import classes from './TodoList.module.css';
import { useState, useEffect} from 'react';
import EditTodoModal from './Modal/EditTodoModal';

const ToDoList = props => {

    // STATES _______________________________________________________

    const [todos, updateToDos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
    });

    const [todoAppeared, updateTodoAppeared] = useState(false);
    const [todoTextContent, changeTodoTextContent] = useState(null);
    const [todoChangeIndex, updatetodoChangeIndex] = useState(null);
    const [modal, toggleModal] = useState(false);

    // USE EFFECTS _______________________________________________________
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (props.newToDo) {
            updateTodoAppeared(true);
            updateToDos(prevTodos => [...prevTodos, props.newToDo]);
        }
    }, [props.newToDo, updateTodoAppeared]);

    // HANDLERS _______________________________________________________


    const removeTodoHandler = (i) => {
        updateTodoAppeared(false);
        const newToDos = [...todos];
        newToDos[i].beingRemoved = true;
        updateToDos(newToDos);
        setTimeout(() => {
            const updatedToDos = newToDos.filter((_, index) => index !== i);
            updateToDos(updatedToDos);
        }, 150); 
    }

    const editTodoHandler = (i) => {
        // open the default modal window form with simple input with preloaded text from todo
        // when change button is clicked --> close modal, loop over todo, find specific todo and update its text content
        updatetodoChangeIndex(i);
        changeTodoTextContent(todos[i].toDoText);
        toggleModal(prev => !prev);
    }

    const receivedChangedTodoTextHandler = (i, newText) => {
        const newTodos = [...todos];
        newTodos[i].toDoText = newText;
        updateToDos(newTodos);
    }
    
    const checkHandler = (i) => {
        const newToDos = [...todos];
        newToDos[i].isChecked = !newToDos[i].isChecked;
        updateToDos(newToDos);
    }

    // OTHER FUNCTIONS _______________________________________________________

    const checkValidInput = todoText => {
        // Check if todoText is a string and is not empty
        if (typeof todoText !== 'string' || todoText.trim() === '') {
        return false;
        }
        // Check if todoText is not longer than 100 characters
        if (todoText.length > 100) {
        return false;
        }
        // Check if todoText has more than 2 consecutive spaces
        if (/\s{3,}/.test(todoText)) {
        return false;
        }
        // Check if todoText has any words longer than 20 characters
        if (/\b\w{20,}\b/.test(todoText)) {
        return false;
        }
        // If all checks pass, return true
        return true;
    }

    const emojiMap = {
        'cat': ' 🐈‍⬛',
        'movie': ' 📽️',
        'dinner': ' 🍲',
        'food': ' 🍔',
        'dog': ' 🐶',
        'gym': ' 🏋️',
        'code': ' 👨🏼‍💻',
        'walk': ' 🚶',
        'react': ' ⚛️',
        'stupid': ' 🥴',
        'fix': ' 🔧',
        'build': ' 🛠️',
    };

    // if (!todos || todos.length === 0) return;
        
    return (
        <div className = {classes.todolist}>
            <ul className = {classes.todoUl}>
                {todos.map((li, i) => 
                <li 
                    key = {i} 
                    className = {`
                    ${classes.todoListItem}
                    ${todoAppeared ? classes.appearingTodo : ''}
                    ${todos[i].beingRemoved ? classes.dissapearingTodo: ''}
                    `}>
                    <div className={classes.checkBoxAndText}>
                        <input 
                            type="checkbox" 
                            id = "check" 
                            onChange= {() => checkHandler(i)} 
                            className = {classes.check}
                            checked = {todos[i].isChecked}
                        />
                        <h3 
                            className = {todos[i].isChecked ? classes.hasBeenCheckedH3 : ''} 
                            onClick = {() => checkHandler(i)}>
                            {li.toDoText}
                            {Object.keys(emojiMap).map(keyword => li.toDoText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
                        </h3>
                    </div>
                    <div className={classes.editAndDeleteIcons}>
                        <div className={classes.edit} onClick = {() => editTodoHandler(i)}></div>
                        <div className={classes.delete} onClick = {() => removeTodoHandler(i)}></div>
                    </div>
                </li>
                )}
            </ul>
        {modal && <EditTodoModal
            todoText = {todoTextContent}
            index = {todoChangeIndex}
            toggleModal = {toggleModal}
            receivedChangedTodoText = {receivedChangedTodoTextHandler}
            />}
        </div>
    )

};

export default ToDoList;
