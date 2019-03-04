import React from 'react';
import styles from './SimpleInput.scss';

const SimpleInput = (props) => {
   return (
     <input {...props} className={styles.container} />
    );
};

export default SimpleInput;
