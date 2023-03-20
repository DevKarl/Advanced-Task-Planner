
import classes from './TodoList.module.css';
import trashImage from '../assets/trash.png';
import { useState, useEffect} from 'react';

const ToDoList = props => {

    const [todos, updateToDos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
          return JSON.parse(savedTodos);
        } else {
          return [];
        }
    });

    const [todoAppeared, updateTodoAppeared] = useState(false);
    
    useEffect(() => {
        // updateToDos(todos => todos.map(todo => todo.hasNotAppeared = false));
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        if (props.newToDo) {
            console.log('useffect for new todo is rendered');
            updateTodoAppeared(true);
            updateToDos(prevTodos => [...prevTodos, props.newToDo]);
        }
    }, [props.newToDo, updateTodoAppeared]);


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
                    ${todoAppeared ? classes.appearingTodo : ''}
                    ${todos[i].beingRemoved ? classes.dissapearingTodo: ''}
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