
import classes from './Container.module.css';
import InputField from "./InputField";
import ToDoList from "./TodoList";
import { useState } from 'react';

const Container = props => {

    const [newToDo, setNewToDo] = useState()
 
    
      const addTodo = () => {
        const todoTextInput = document.getElementById("inputfield").value;
        if (!todoTextInput || todoTextInput === ' ') return; // --> Add modal error window here instead!
        document.getElementById("inputfield").value = '';
        setNewToDo ({
          toDoText: todoTextInput,
          isChecked: false,
          hasNotAppeared: false
        })
      }

    return(
        <main className = {classes.container}>
            {props.children}
            <InputField addTodoHandler = {addTodo}/>
            <ToDoList newToDo = {newToDo}/>
        </main>
    )

}

export default Container;