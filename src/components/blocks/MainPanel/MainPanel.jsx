import cn from 'classname';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './MainPanel.scss';

export default class MainPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drop: false,
		};
	}
  
  handleDropDown = () => {
    this.setState({
      drop: !this.state.drop,
    });
  }

	render() {
    const { retailersCount, returnsCount, productsCount  } = this.props;

		return (
  <Fragment>
    <div className={styles.home}>
      <div className={styles.hide_block} />
      <div className={styles.main_panel}>
        <div><p>Approve retailers</p><span>{retailersCount}</span></div>
        <div><p>Manage returns</p><span>{returnsCount}</span></div>
        <div><p>Assign new products</p><span>{productsCount}</span></div>
      </div>
      <div className={styles.hide_block} />
    </div>
    <div ref={styles.panel_m} className={this.state.drop === false ? styles.m_home : cn(styles.m_home, styles.drop)}>
      <div className={styles.main_panel_m}>
        <div onClick={this.handleDropDown}>
          <span>3</span>
          <p>Approve retailers</p>
          <div
            ref='drop_img'
            className={this.state.drop === false ? styles.drop_img :
							cn(styles.drop_img, styles.down)}
          >
            <img alt="" src={require('../../../images/arrow_back.png')} />
          </div>
        </div>
        <div><span>3</span><p>Manage returns</p></div>
        <div><span>3</span><p>Assign new products</p></div>
      </div>
    </div>
  </Fragment>
		);
	}
}

MainPanel.defaultProps = {
  retailersCount: 0,
  returnsCount: 0,
  productsCount: 0,
};

MainPanel.propTypes = {
  retailersCount: PropTypes.number,
  returnsCount: PropTypes.number,
  productsCount: PropTypes.number,
};