
import classes from './Container.module.css';
import { TasksContextProvider } from '../context/tasksContext';
import Header from "./Header";
import InputField from "./InputField";
import TaskList from "./TaskList";
import './UI/CSSvariables.module.css';
import TaskActions from './TaskActions';
import SettingsModal from './Modals/SettingsModal';

const Container = () => {

    return(
        <main className = {classes.container}>
          <TasksContextProvider>
            <SettingsModal/>
            <Header/>
            <InputField/>
            <TaskActions/>
            <TaskList/>
          </TasksContextProvider>
        </main>
    )
}

export default Container;