import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStats } from '../../store/actions/stats';
import RetailerStats from '../../components/blocks/RetailerStats';
import Toolbar from '../../components/common/Toolbar';
import Wall from '../../components/common/Wall';
import DropDownFilterDate from '../../components/filters/DropDownFilterDate';
import { filters } from '../../constants/filters';
import { setRetailerStatsDateFilter, setRetailerStatsDateFilterRange } from '../../store/actions/pageFilters';
import DatePickerModal from '../../components/blocks/DatePickerModal';
import Spinner from '../../components/common/Spinner';

class RetailerStatsContainer extends PureComponent {
  state = {
    open: false,
  }

  componentDidMount() {
    if(this.props.id) {
      this.props.getStats(this.props.id);
    }
  }

  openModal = () => {
    this.setState({
      open: true,
    });
  };

  handleChange = (value) => {
    if (value === 'custom') {
      this.setState({
        open: true,
      });
    }
  }

  handleChangeRange = (value) => {
    const now = new Date();
    const start = new Date();
    this.props.setDateFilter(this.props.id, value, now, start);
    if (value === 'custom') {
      this.setState({
        open: true,
      });
    }
  }

  closeModal = (interval, start, end) => {
    const from = new Date();
    const to = new Date();

    this.setState({
      open: false,
    });
    if (!start && !end) { return false; }
    this.props.setDateFilter(this.props.id, 'custom', start || from, end || to);
  }

  render() {
    const { from, to, last, isLoading } = this.props;
    return isLoading ? <Spinner /> : (
      <Fragment>
        <DatePickerModal open={this.state.open} onClose={this.closeModal} />
        <Toolbar name="Stats">
          <Wall />
          <DropDownFilterDate
            values={filters}
            onChange={(value, index) => {
              if (value === 'custom') {
                this.handleChange(value, index);
              } else {
                this.handleChangeRange(value, index);
              }
            }}
            from={from}
            to={to}
            last={last}
          />          
        </Toolbar>
        <RetailerStats {...this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { brands, replenish, totalIncome, totalItems, totalOrders, isLoading } = state.stats;
  const { last, from, to } = state.pageFilters.retailerStats;

  return {
    brands,
    replenish,
    totalIncome,
    totalItems,
    totalOrders,
    filter: last,
    last,
    from, 
    to,
    isLoading,
  };
};
 
const mapDispatchToProps = dispatch => ({
  getStats: retailerId => dispatch(getStats(retailerId)),
  setDateFilter: (retailerId, value, start, end) => 
    dispatch(setRetailerStatsDateFilter(retailerId, value ,start, end)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RetailerStatsContainer,
);

RetailerStatsContainer.defaultProps = {
  id: undefined,
};

RetailerStatsContainer.propTypes = {
  getStats: PropTypes.func.isRequired,
  id: PropTypes.number,
  setDateFilter: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  last: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
