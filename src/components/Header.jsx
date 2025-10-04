import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ title, description, buttonText, buttonLink }) => (
    <div className='w-100 text-center py-5'>
        <h1 className='fw-bold mb-3'>{title}</h1>
        <p className='text-muted mb-4'>
            {description}
        </p>
        {buttonText && buttonLink && (
            <Link to={buttonLink} className="btn btn-success px-4 py-2 mb-4">
                {buttonText}
            </Link>
        )}
    </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    buttonText: PropTypes.string,
    buttonLink: PropTypes.string
};

export default Header;