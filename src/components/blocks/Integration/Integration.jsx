import React from 'react';
import PropTypes from 'prop-types';
import styles from './Integration.scss';
import Button from '../../common/Button';

const Integration = ({ open }) => {
   return (
     <div className={styles.container}>
       <div className={styles.body}>
         <Button 
           uppercase={false} 
           color="green" 
           text="ADD eCom Integration" 
           onClick={open}
         />
       </div>
     </div>
   );
};

export default Integration;

Integration.propTypes = {
  open: PropTypes.func.isRequired,
};