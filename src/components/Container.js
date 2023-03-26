
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import ToDoList from "./TodoList";
import { useState } from 'react';
import './UI/CSSvariables.module.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

const Container = () => {

    const [newToDo, setNewToDo] = useState();
    
      const addTodo = todoText => {
        setNewToDo ({
          todoText: todoText,
          isChecked: false,
        })
      };

      console.log('Container is running');
      

    return(
        <main className = {classes.container}>
              <Header/>
              <ErrorBoundary>
                <InputField addTodoHandler = {addTodo}/>
                <ToDoList newTodo = {newToDo}/>
              </ErrorBoundary>
        </main>
    )
}

export default Container;