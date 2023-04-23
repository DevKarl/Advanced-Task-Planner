
import { useContext } from "react";
import { tasksContext } from "../context/tasksContext";


const BackgroundCover = props => {

    const {themeColors} = useContext(tasksContext);

    const backgroundCoverStyles = {
        backgroundColor: themeColors.backgroundColor,
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0
    }

    return(
        <div style={backgroundCoverStyles}>{props.children}</div>
    )

}

export default BackgroundCover;