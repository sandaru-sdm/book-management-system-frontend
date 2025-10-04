import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PageHeader = ({ title, buttonText, buttonLink }) => (
    <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1 className='mb-0'>{title}</h1>
        {buttonText && buttonLink && (
            <Link to={buttonLink} className="btn btn-primary">
                {buttonText}
            </Link>
        )}
    </div>
);

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string
};

export default PageHeader;