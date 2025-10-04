import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ 
    id, 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder,
    required = false 
}) => (
    <div className='col-md-12'>
        <label htmlFor={id} className='form-label'>
            {label} {required && <span className="text-danger">*</span>}
        </label>
        <input
            type={type}
            className='form-control'
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

export default FormInput;