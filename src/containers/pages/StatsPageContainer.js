import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import { filters } from '../../constants/filters';
import Wall from '../../components/common/Wall';
import RetailerStats from '../../components/blocks/RetailerStats';
import PageLayout from '../../components/common/PageLayout';
import { getStats } from '../../store/actions/stats';
import DatePickerModal from '../../components/blocks/DatePickerModal';
import DropDownFilterDate from '../../components/filters/DropDownFilterDate';
import { setStatsDateFilter } from '../../store/actions/pageFilters';
import Spinner from '../../components/common/Spinner';

class StatsPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    this.props.getStats();
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
    this.props.setDateFilter(value, now, start); 
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
    this.props.setDateFilter('custom', start || from, end || to);
  }

  render() {
    const { from, to, filter } = this.props;
    return this.props.isLoading ? <Spinner /> : (
      <Fragment>
        <DatePickerModal open={this.state.open} onClose={this.closeModal} />
        <Panel 
          identifier="stats" mobile="stats_mobile"
          width={480}
        >
          <Wall />
          <DropDownFilterDate
            values={filters}
            onChange={(value) => {
              if (value === 'custom') {
                this.handleChange(value);
              } else {
                this.handleChangeRange(value);
              }
            }}
            from={from}
            to={to}
            last={filter}
          />
          <Wall />
        </Panel>
        <PageLayout>
          <RetailerStats {...this.props} />
        </PageLayout>
      </Fragment>
    );
  }
}


const mapStateToProps = (state) => {
  const { brands, replenish, totalIncome, totalItems, totalOrders, isLoading } = state.stats;
  const { last, from, to } = state.pageFilters.stats;

  return {
    brands,
    replenish,
    totalIncome,
    totalItems,
    totalOrders,
    filter: last,
    from,
    to,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getStats: () => dispatch(getStats()),
  setDateFilter: (value, start, end) => dispatch(setStatsDateFilter(value, start, end)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatsPageContainer);

StatsPageContainer.propTypes = {
  getStats: PropTypes.func.isRequired,
  setDateFilter: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
