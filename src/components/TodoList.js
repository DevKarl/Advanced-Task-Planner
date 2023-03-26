
import classes from './TodoList.module.css';
import './UI/CSSvariables.module.css';
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
    const [todoChangeIndex, updateTodoChangeIndex] = useState(null);
    const [editTodoModal, toggleEditTodoModal] = useState(false);
    const [longInputWord, togglelongInputWord] = useState(false);

    // USE EFFECTS _______________________________________________________
    
    useEffect(() => {
        // check if any todos have textIsLong prop
            // if so --> then change togglelongInputWord to true
            // if not, do nothing
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (props.newTodo) {
            !updateTodoAppeared && updateTodoAppeared(true);
            updateToDos(prevTodos => [...prevTodos, props.newTodo]);
        }
    }, [props.newTodo, updateTodoAppeared]);

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
        updateTodoChangeIndex(i);
        changeTodoTextContent(todos[i].todoText);
        toggleEditTodoModal(prev => !prev);
    }

    const receivedChangedTodoTextHandler = (i, newText) => {
        !togglelongInputWord && checkInputWordLength(newText);
        const newTodos = [...todos];
        newTodos[i].todoText = newText;
        updateToDos(newTodos);
    }
    
    const checkHandler = (i) => {
        const newToDos = [...todos];
        newToDos[i].isChecked = !newToDos[i].isChecked;
        updateToDos(newToDos);
    }

    // OTHER FUNCTIONS _______________________________________________________

    const checkInputWordLength = todoText => {
        // first check if any other todos have true on textIsLong
        // if so, return and exit this function
        // Check if todoText has any words longer than 20 characters
        if (/\b\w{20,}\b/.test(todoText)) {
            // first check if any other todos have true on textIsLong
            // if so --> don't do anything (CSS class already active)
            // if not --> do a toggle on togglelongInputWord state
            togglelongInputWord(true);
        }
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
        
    return (
        <div className = {`${classes.todolist} ${longInputWord? 'longInputWord' : ''}`}>
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
                            {li.todoText}
                            {Object.keys(emojiMap).map(keyword => li.todoText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
                        </h3>
                    </div>
                    <div className={classes.editAndDeleteIcons}>
                        <div className={classes.edit} onClick = {() => editTodoHandler(i)}></div>
                        <div className={classes.delete} onClick = {() => removeTodoHandler(i)}></div>
                    </div>
                </li>
                )}
            </ul>
        {editTodoModal && <EditTodoModal
            todoText = {todoTextContent}
            index = {todoChangeIndex}
            toggleEditTodoModal = {toggleEditTodoModal}
            receivedChangedTodoText = {receivedChangedTodoTextHandler}
        />}
        
        </div>
    )

};

export default ToDoList;
