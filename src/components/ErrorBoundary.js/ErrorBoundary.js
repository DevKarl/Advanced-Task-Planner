import { Component } from "react";
import ErrorModal from "../Modal/ErrorModal";

class ErrorBoundary extends Component {

    constructor() {
        super();
        this.state = {hasError: false, errorMessage: ''};
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({hasError: true, errorMessage: error.message});
    }

    render() {
        if(this.state.hasError) {
            return(
                <>
                    {this.props.children}
                    <ErrorModal 
                        onClose = {() => this.setState({hasError: false})}
                        showModal = {true} 
                        errorMsg = {this.state.errorMessage}
                    />
                </>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;