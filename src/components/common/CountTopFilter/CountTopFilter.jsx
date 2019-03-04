import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './CountTopFilter.scss';


class CountTopFilter extends PureComponent {

	handleScrollToPanel = (title) => {
		this.props.onClick(title);
	}

	render() {
		const { title, count, activeCount } = this.props;
		return (
  <div className={styles.container}>
    <div onClick={() => this.handleScrollToPanel(title)}>
      <p>{title}</p>
      <span className={activeCount === title ? '' : styles.zero}>{count}</span>
    </div>
  </div>
    );
	}
}

export default CountTopFilter;

CountTopFilter.defaultProps = {
    count: 0,
};

CountTopFilter.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    activeCount: PropTypes.string.isRequired,
};
