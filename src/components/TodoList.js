
import classes from './TodoList.module.css';
import trashImage from '../assets/trash.png';
import { useState, useEffect } from 'react';

const ToDoList = props => {

    const [todos, updateToDos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
    });
    
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (props.newToDo) {
            updateToDos(prevTodos => [...prevTodos, props.newToDo]);
        }
    }, [props.newToDo]);


    const removeTodoHandler = (i) => {
        const newToDos = [...todos];
        newToDos[i].beingRemoved = true;
        updateToDos(newToDos);
        setTimeout(() => {
            const updatedToDos = newToDos.filter((_, index) => index !== i);
            updateToDos(updatedToDos);
        }, 100); 
    }
    
    const checkHandler = (i) => {
        const newToDos = [...todos];
        newToDos[i].isChecked = !newToDos[i].isChecked;
        updateToDos(newToDos);
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
                    ${todos[i].beingRemoved ? classes.dissapearingToDo : ''}
                    `}>
                    <h3 
                        className = {todos[i].isChecked ? classes.hasBeenCheckedH3 : ''} 
                        onClick = {() => checkHandler(i)}>
                        {li.toDoText}
                        {Object.keys(emojiMap).map(keyword => li.toDoText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
                    </h3>
                    <div className={classes.icons}>
                        <input 
                            type="checkbox" 
                            id = "check" 
                            onChange= {() => checkHandler(i)} 
                            className = {classes.check}
                            checked = {todos[i].isChecked}
                        />
                        <img src={trashImage} 
                            alt = 'delete icon' 
                            className={classes.delete} 
                            onClick = {() => removeTodoHandler(i)}/>
                    </div>
                </li>
                )}
            </ul>
        </div>
    )

};

export default ToDoList;