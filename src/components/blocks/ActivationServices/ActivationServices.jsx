import React from 'react';
import styles from './ActivationServices.scss';

const ActivationServices = () => {
   return (
     <div className={styles.container}>
       <div>
         <div className={styles.body}>
           <span>DROPSHIP TERMS - NOT ACTIVE</span>
           <p>
            Terms
           </p>
           <span>TO ACTIVATE:</span>
         </div>
       </div>
       <div>
         <div className={styles.body}>
           <span>DROPSHIP TERMS - ACTIVE</span>
           <p>
            Terms
           </p>
         </div>
       </div>
     </div>
   );
};

export default ActivationServices;