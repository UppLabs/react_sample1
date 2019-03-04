import React from 'react';
import styles from './ActivationPayment.scss';

const ActivationPayment = () => {
   return (
     <div className={styles.container}>
       <div>
         <div className={styles.body}>
           <h4>CREDIT CARD</h4>
           <span className="ic-mastercard">
             <span className="path1" />
             <span className="path2" />
           </span>
           <span>
            MASTERCARD X-4444
           </span>   
           <a>Change card</a>
         </div>
       </div>
     </div>
   );
};

export default ActivationPayment;