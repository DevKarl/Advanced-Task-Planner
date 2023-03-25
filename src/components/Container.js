
import classes from './Container.module.css';
import InputField from "./InputField";
import ToDoList from "./TodoList";
import { useState } from 'react';
import ErrorBoundary from './ErrorBoundary.js/ErrorBoundary';
import './UI/CSSvariables.module.css';

const Container = props => {

    const [newToDo, setNewToDo] = useState();
    
      const addTodo = () => {
        const todoTextInput = document.getElementById("inputfield").value;
        if (!todoTextInput || todoTextInput === ' ') return; // --> Add modal error window here instead!
        document.getElementById("inputfield").value = '';
        setNewToDo ({
          todoText: todoTextInput,
          isChecked: false,
        })
      };

    return(
        <main className = {classes.container}>
            {props.children}
            <ErrorBoundary>
              <InputField addTodoHandler = {addTodo}/>
              <ToDoList newTodo = {newToDo}/>
            </ErrorBoundary>
        </main>
    )

}

export default Container;