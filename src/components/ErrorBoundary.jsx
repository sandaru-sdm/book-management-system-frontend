import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="alert alert-danger m-4" role="alert">
                    <h4 className="alert-heading">Something went wrong!</h4>
                    <p>Please try refreshing the page or contact support if the problem persists.</p>
                    <hr />
                    <p className="mb-0">
                        Error: {this.state.error?.message || 'Unknown error'}
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;