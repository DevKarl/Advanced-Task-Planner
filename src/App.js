
import Container from "./components/Container";
import Header from "./components/Header";
import InputField from "./components/InputField";
import ToDoList from "./components/TodoList";
import {useState, useEffect} from 'react';


function App() {
  

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

  

  const addTodo = () => {
    const todoTextInput = document.getElementById("inputfield").value;
    if (!todoTextInput || todoTextInput === ' ') return; // --> Add modal error window here instead!
    const newToDo = {
      toDoText: todoTextInput,
      isChecked: false
    }
    updateToDos(prevTodos => [...prevTodos, newToDo]);
    document.getElementById("inputfield").value = '';
  }

  const removeTodoHandler = (i) => {
    const newToDos = [...todos];
    newToDos.splice(i,1);
    updateToDos(newToDos);
  }

  const checkHandler = (i) => {
    const newToDos = [...todos];
    newToDos[i].isChecked = !newToDos[i].isChecked;
    updateToDos(newToDos);
  }

  return (
    <Container>
      <Header/>
      <InputField addTodoHandler = {addTodo}/>
      <ToDoList todos = {todos} onDelete = {removeTodoHandler} onCheck = {checkHandler}/>
    </Container>
  );
}

export default App;
