import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import { filters } from '../../constants/filters';
import Wall from '../../components/common/Wall';
import PageLayout from '../../components/common/PageLayout';
import { 
  setDropshipOrdersLastDayFilter, 
} from '../../store/actions/pageFilters';
import { 
  getDropshipOrders, 
  dropshipOrdersReport, 
  dropshipOrdersReportClose, 
} from '../../store/actions/dropshipOrders';
import DropDownFilterDate from '../../components/filters/DropDownFilterDate';
import CountTopFilter from '../../components/common/CountTopFilter';
import DatePickerModal from '../../components/blocks/DatePickerModal';
import DropshipOrdersContainer from '../blocks/DropshipOrdersContainer';
import DownloadButton from '../../components/common/DownloadButton';
import DownloadReportModal from '../../components/blocks/DownloadReportModal';
import Hero from '../../components/common/Hero';
import ServicesPageLayout from '../../components/common/ServicesPageLayout';

const divStyle = {
  backgroundImage: 'url('+ require('../../images/replenish-orders-hero.jpg')+')',
};

class DropshipOrdersPageContainer extends PureComponent {
  state = {
    open: false,
  }

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
    this.props.setOrderLastDayFilter(value, now, start); 
    this.handleChange(value);
  }

  closeModal = (interval, start, end) => {
    const from = new Date();
    const to = new Date();

    this.setState({
      open: false,
    });
    if (!start && !end) { return false; }
    this.props.setOrderLastDayFilter('custom', start || from, end || to);
  }
  

  render() {
    const {
      activeCount,
      from,
      to,
      last,
      count, 
      pendingCount, 
      completedCount, 
      canceledCount, 
      getOrders,
      downloadReport,
      isReport,
      closeReport,
    } = this.props;
    
    return (
      <Fragment>
        <ServicesPageLayout>
          <Hero divStyle={divStyle} >
            <h1>Orders</h1>
          </Hero>
          <DownloadReportModal
            open={isReport}
            onClose={closeReport}
          />
          <DatePickerModal
            open={this.state.open}
            onClose={this.closeModal}
          />
          <Panel fix>
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
              last={last}
              to={to}
              from={from}
            />
            <Wall />
            <CountTopFilter
              onClick={(title) => { getOrders(title); }} title="ALL"
              count={count}
              activeCount={activeCount}
            />
            <CountTopFilter
              onClick={(title) => { getOrders(title); }} title="PROCESSING"
              count={pendingCount}
              activeCount={activeCount}
            />
            <CountTopFilter
              onClick={(title) => { getOrders(title); }} title="COMPLETED"
              count={completedCount}
              activeCount={activeCount}
            />
            <CountTopFilter
              onClick={(title) => { getOrders(title); }} title="CANCELED"
              count={canceledCount}
              activeCount={activeCount}
            />
            <Wall />
            <DownloadButton size={25} onClick={downloadReport} />
            <Wall />
          </Panel>
          <PageLayout>
            <DropshipOrdersContainer />
          </PageLayout>
        </ServicesPageLayout>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    count, 
    pendingCount, 
    completedCount, 
    canceledCount,
    activeCount, 
    isReport,
  } = state.dropshipOrders;

  const { from, to, last } = state.pageFilters.dropshipOrders;

  return {
    count, 
    pendingCount, 
    completedCount, 
    canceledCount,
    from,
    to,
    last,
    activeCount,
    isReport,
  };
};

const mapDispatchToProps = dispatch => ({
  getOrders: title => dispatch(getDropshipOrders(title)),
  setOrderLastDayFilter: (value, from, to) => dispatch(setDropshipOrdersLastDayFilter(value, from, to)),
  downloadReport: () => dispatch(dropshipOrdersReport()),
  closeReport: () => dispatch(dropshipOrdersReportClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DropshipOrdersPageContainer);

DropshipOrdersPageContainer.propTypes = {
  count: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired, 
  completedCount: PropTypes.number.isRequired, 
  canceledCount: PropTypes.number.isRequired, 
  setOrderLastDayFilter: PropTypes.func.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  last: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  activeCount: PropTypes.string.isRequired,
  getOrders: PropTypes.func.isRequired,
  downloadReport: PropTypes.func.isRequired,
  isReport: PropTypes.bool.isRequired,
  closeReport: PropTypes.func.isRequired,
};
