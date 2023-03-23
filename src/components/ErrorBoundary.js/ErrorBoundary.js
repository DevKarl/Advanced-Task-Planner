import { Component } from "react";

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
                <Modal onClose = {() => this.setState({hasError: false}) }>
                    {this.state.errorMessage}
                </Modal>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;