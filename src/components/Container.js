
import classes from './Container.module.css';

const Container = props => {

    return(
        <main className = {classes.container}>
            {props.children}
        </main>
    )

}

export default Container;