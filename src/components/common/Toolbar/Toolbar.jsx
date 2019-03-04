import React from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import IsMobile from '../../../containers/common/IsMobile';
import styles from './Toolbar.scss';
import Wall from '../Wall';

const Toolbar = ({ children, name, grow, width, center, color, margin_bottom }) => {
  return (
    <div className={cn(
      'nav_important',
      styles.toolbar + ` ${name}`,
      color === 'transparent' ? styles.transparent : '',
      margin_bottom === true ? styles.margin_bottom : '',
      )}
    >
      { name ?
        <div className={grow === false ? styles.toolbar_left : styles.toolbar_left_without_grow}>
          <span>{name}</span>
          {
            width === undefined ? <Wall /> :
            <IsMobile
              desctop={
                center === false ? <Wall /> : null
              }
              mobile={null}
              width={width}
            />
          }
          {/* <span>{count}</span> */}
        </div>
      : null }
      {children}
    </div>
  );
};

export default Toolbar;

Toolbar.defaultProps = {
  children: null,
  // count: undefined,
  name: undefined,
  grow: false,
  width: undefined,
  center: false,
  color: '',
  margin_bottom: false,
};

Toolbar.propTypes = {
  children: PropTypes.node,
  // count: PropTypes.number,
  name: PropTypes.string,
  grow: PropTypes.bool,
  width: PropTypes.number,
  center: PropTypes.bool,
  color: PropTypes.string,
  margin_bottom: PropTypes.bool,
};
