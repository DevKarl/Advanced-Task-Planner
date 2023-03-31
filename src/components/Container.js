
import classes from './Container.module.css';
import Header from "./Header";
import InputField from "./InputField";
import ToDoList from "./TodoList";
import { useState } from 'react';
import './UI/CSSvariables.module.css';

const Container = () => {

    const [newToDo, setNewToDo] = useState(null);
    
      const addTodo = todoText => {
        setNewToDo ({
          todoText: todoText,
          isChecked: false,
        })
      };

    return(
        <main className = {classes.container}>
            <Header/>
              <InputField addTodoHandler = {addTodo}/>
              <ToDoList newTodo = {newToDo}/>
        </main>
    )
}

export default Container;