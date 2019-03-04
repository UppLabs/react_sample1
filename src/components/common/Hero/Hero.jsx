import React, { Fragment } from 'react';
import cn from 'classname';
import PropTypes from 'prop-types';
import styles from './Hero.scss';
import Panel from '../Panel';
import TabMenu from '../TabMenu';

const Hero = ({ children, divStyle, classHero, panel }) => {
    return (
      <Fragment>
        <div className={cn(styles.hero, classHero)} style={divStyle}>
          <div>
            {children}
          </div>
        </div>
        {panel ?
          <Panel fix>
            <TabMenu title="BRANDS" to="/admin/brands" />
            <TabMenu
              title="ACCOUNT" to="/admin/account"
              root
            />
            <TabMenu title="USERS" to="/admin/users" />
          </Panel>
        : null }
      </Fragment>
    );
};

export default Hero;

Hero.defaultProps = {
  children: null,
  divStyle: null,
  classHero: '',
  panel: false,
};

Hero.propTypes = {
  children: PropTypes.node,
  divStyle: PropTypes.object,
  classHero: PropTypes.string,
  panel: PropTypes.bool,
};

