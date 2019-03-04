import React, { PureComponent } from 'react';
import Button from '../../common/Button';
import styles from './ActivationHeader.scss';

class ActivationHeader extends PureComponent {
   render() {
      return (
        <div className={styles.container}>
          <div>Logo</div>
          <div>
            <h4>Adidas</h4>   
          </div>
          <div className={styles.buttons}>
            <Button uppercase={false} text="ADD eCom INTEGRATION" />
            <Button text="ADD CREDIT CARD" />
          </div>
        </div>         
      );
   }
}

export default ActivationHeader;