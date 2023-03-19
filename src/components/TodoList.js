
import classes from './TodoList.module.css';
import trashImage from '../assets/trash.png';
import { useEffect } from 'react';

const ToDoList = props => {


    useEffect(() => {
        const listItems = document.querySelectorAll('li');
        listItems.forEach(item => {
            const textContent = item.textContent.toLowerCase().trim();
            if (textContent.includes('important')
             || textContent.includes('urgent')) {
                item.style.color = 'darkred';
                item.style.border = '2px solid darkred';

            } else {
                item.style.color = 'black';
            }
        });
    });

    const emojiMap = {
        'cat': ' 🐈‍⬛',
        'movie': ' 📽️',
        'dinner': ' 🍲',
        'food': ' 🍔',
        'dog': ' 🐶',
        'gym': ' 🏋️',
        'code': ' 👨🏼‍💻',
        'walk': ' 🚶',
    };


    return (
        <div className = {classes.todolist}>
            <ul className = {classes.todoUl}>
                {props.todos.map((li, i) => 
                <li key = {i} className = {classes['todoListItem']}>
                    <h3 
                        className = {props.todos[i].isChecked ? classes.hasBeenChecked : ''} 
                        onClick = {() => props.onCheck(i)}>
                        {li.toDoText}
                        {Object.keys(emojiMap).map(keyword => li.toDoText.toLowerCase().trim().includes(keyword.toLowerCase().trim()) && emojiMap[keyword])}
                     </h3>
                     <div className={classes.icons}>
                        <input 
                            type="checkbox" 
                            id = "check" 
                            onChange= {() => props.onCheck(i)} 
                            className = {classes.check}
                            checked = {props.todos[i].isChecked}
                        />
                        <img src={trashImage} 
                            alt = 'delete icon' 
                            className={classes.delete} 
                            onClick = {() => props.onDelete(i)}/>
                    </div>
                </li>
            )}
            </ul>
        </div>
    )
};

export default ToDoList;