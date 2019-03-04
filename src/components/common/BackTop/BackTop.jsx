import React from 'react';
import PropTypes from 'prop-types';
import styles from './BackTop.scss';

const BackTop = ({ history, text }) => {
    const goBack = () => {
        history.goBack();
    };

  return (
    <div className={styles.navPanel}>
      <button
        onClick={goBack}
        className={styles.navPanelBack}
        type="button"
      >
        <svg
          fill="#303f9f"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z" />
        </svg>
      Back
      </button>
      <span className={styles.navPanelBorder} />
      {text}
    </div>
  );
};

export default BackTop;

BackTop.defaultProps = {
  text: '',
};

BackTop.propTypes = {
  history: PropTypes.shape({
    goBack : PropTypes.func.isRequired,
  }).isRequired,
  text: PropTypes.string,
};
