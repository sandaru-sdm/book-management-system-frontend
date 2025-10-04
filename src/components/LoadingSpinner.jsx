import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ message = 'Loading...' }) => (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary mb-2" role="status">
            <span className="visually-hidden">{message}</span>
        </div>
        <p className="text-muted">{message}</p>
    </div>
);

LoadingSpinner.propTypes = {
    message: PropTypes.string
};

export default LoadingSpinner;