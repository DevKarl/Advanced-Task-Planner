
import classes from './InputField.module.css';

const InputField = props => {

    const handleKeyDown = e  => {
        if (e.keyCode === 13) {
            props.addTodoHandler()
        }
    }

    return(
        <div className = {classes.inputfield}>
            <input type = 'text' id = 'inputfield' onKeyDown={handleKeyDown}/>
            <button onClick= {props.addTodoHandler}>Add</button>
        </div>
    )
};

export default InputField;