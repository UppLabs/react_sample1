import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './CountTop.scss';

var counter = 0;

class CountTop extends PureComponent {
	
	componentDidMount() {
		document.addEventListener('scroll', function(e) {
			counter = window.pageYOffset;
		});
	}

	handleScrollToPanel = (title) => {
		var target = document.getElementsByClassName(`${title}`)[0];
		if (target === undefined) return false;

		var scroll = target.offsetTop;
		if (scroll < counter) {
            scroll = scroll - 125;
			var timerBack = setInterval(function () {
				if(scroll <= counter) {
					counter = counter - 5;
                    window.scrollTo(0, counter);
				} else {
					counter = scroll;
					clearInterval(timerBack);
			}
			}, 1);
        }
        if (scroll >= counter) {
            scroll = scroll - 59;
			var timerFront = setInterval(function () {
				if(scroll >= counter) {
					counter = counter + 5;
                    window.scrollTo(0, counter);
				} else {
					counter = scroll;
					clearInterval(timerFront);
			}
			}, 1);
        }
	}

	render() {
		const { title, count, blackPoint } = this.props;
		return (
  <div className={styles.container}>
    <div onClick={() => this.handleScrollToPanel(title)}>
      <p>{title}</p>
      <span className={blackPoint === true ? styles.zero : count > 0 ? '' : styles.zero}>{count}</span>
    </div>
  </div>
    );
	}
}

export default CountTop;

CountTop.defaultProps = {
    count: 0,
    blackPoint: false,
};

CountTop.propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
    blackPoint: PropTypes.bool,
};
