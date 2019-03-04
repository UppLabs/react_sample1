import React from 'react';
import styles from './Block.scss';

const Block = ({ children }) => {
    return (
      <div className={styles.block}>
        {children}
      </div>
    );
};

export default Block;
