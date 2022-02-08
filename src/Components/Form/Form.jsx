import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';

const Form = ({submitSearch, submitMyLocationSearch}) => {
    
    const [location, setLocation] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        if(!location || location === '') return;
        submitSearch(location)
    };

    const onSend = (e) => {
        e.preventDefault();
        submitMyLocationSearch();
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                required
                value={location}
                onChange={e => setLocation(e.target.value)}
            />
            
            <button type="submit" className={styles.button} onClick={onSubmit}>
                SEARCH
            </button>
            <div className={styles.positionIcon}>
            <IconButton onClick={onSend}>
                <LocationOnIcon style={{fill: 'white'}} fontSize='large' />
            </IconButton>
            </div>
            
        </form>
    );
};
Form.propTypes = {
    submitSearch: PropTypes.func.isRequired,
    submitMyLocationSearch: PropTypes.func.isRequired,
}

export default Form;