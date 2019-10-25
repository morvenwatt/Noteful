import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }

    render () {
        if (this.state.hasError) {
            return (
                <h2 className='error-message'>Request could not be handled (even by one of my many tentacles) at this time.</h2>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;