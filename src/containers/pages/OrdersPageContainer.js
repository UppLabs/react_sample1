import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Panel from '../../components/common/Panel';
import DropDownFilterDate from '../../components/filters/DropDownFilterDate';
import { filters } from '../../constants/filters';
import Wall from '../../components/common/Wall';
import CountTopFilter from '../../components/common/CountTopFilter';
import DownloadButton from '../../components/common/DownloadButton';
import IsMobile from './../../containers/common/IsMobile';
import DropDownFilterOrder from '../../components/common/DropDownFilterOrder';
import BrandOrdersContainer from '../blocks/BrandOrdersContainer';
import PageLayout from '../../components/common/PageLayout';
import { setOrderLastDayFilter, setBrandOrdersRetailerFilter } from '../../store/actions/pageFilters';
import { 
  ordersReport, 
  brandOrdersReportClose, 
  getBrandOrders,
} from '../../store/actions/brandOrders';
import DatePickerModal from '../../components/blocks/DatePickerModal';
import DownloadReportModal from '../../components/blocks/DownloadReportModal';
import DropDownFilter from '../../components/filters/DropDownFilter';

class OrdersPageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
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
    this.props.setOrderLastDayFilter('custom', start || from, end || to);
  }

  render() {
    const { 
      count, 
      pendingCount, 
      completedCount, 
      canceledCount, 
      downloadReport, 
      isReport, 
      closeReport,
      getBrandOrders, 
      activeCount, 
      from, 
      to, 
      last, 
      retailers, 
      setBrandOrdersRetailerFilter,
    } = this.props;

    return (
      <Fragment>
        <DownloadReportModal
          open={isReport}
          onClose={closeReport}
        />
        <DatePickerModal
          open={this.state.open}
          onClose={this.closeModal}
        />
        <Panel
          identifier='orders'
          mobile='orders_mobile'
          width={480}
        >
          <IsMobile
            desctop={
              <Fragment>
                <Wall />
                <DropDownFilterDate
                  values={filters} onChange={(value) => {
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
                  onClick={(title) => { getBrandOrders(title); }} title="ALL"
                  count={count}
                  activeCount={activeCount}
                />
                <CountTopFilter
                  onClick={(title) => { getBrandOrders(title); }} title="PROCESSING"
                  count={pendingCount}
                  activeCount={activeCount}
                />
                <CountTopFilter
                  onClick={(title) => { getBrandOrders(title); }} title="COMPLETED"
                  count={completedCount}
                  activeCount={activeCount}
                />
                <CountTopFilter
                  onClick={(title) => { getBrandOrders(title); }} title="CANCELED"
                  count={canceledCount}
                  activeCount={activeCount}
                />
                <Wall />
                <DropDownFilter values={retailers} onChange={setBrandOrdersRetailerFilter} />
                <Wall />
                <DownloadButton size={25} onClick={downloadReport} />
                <Wall />
              </Fragment>
            }
            mobile={
              <IsMobile
                desctop={
                  <Fragment>
                    <Wall />
                    <DropDownFilterDate
                      values={filters} onChange={(value, index) => {
                      if (value === 'custom') {
                        this.handleChange(value, index);
                      } else {
                        this.handleChangeRange(value, index);
                      }
                    }}
                      last={last}
                      to={to}
                      from={from}
                    />
                    <Wall />
                    <DropDownFilterOrder
                      data={[{
                      type: 'ALL',
                      count: count,
                      onClick: (title) => { getBrandOrders(title); },
                      activeCount: activeCount,
                    },{
                      type: 'PROCESSING',
                      count: pendingCount,
                      onClick: (title) => { getBrandOrders(title); },
                      activeCount: activeCount,
                    },{
                      type: 'COMPLETED',
                      count: completedCount,
                      onClick: (title) => { getBrandOrders(title); },
                      activeCount: activeCount,
                    },{
                      type: 'CANCELED',
                      count: canceledCount,
                      onClick: (title) => { getBrandOrders(title); },
                      activeCount: activeCount,
                    }]}
                      onClick={(title) => { getBrandOrders(title); }}
                      activeCount={activeCount}
                      onChange={() => alert('change')}
                    />
                    <Wall />
                    <DropDownFilter values={retailers} onChange={setBrandOrdersRetailerFilter} />
                    <Wall />
                    <DownloadButton size={25} onClick={downloadReport} />
                    <Wall />
                  </Fragment>
            }
                mobile={
                  <Fragment>
                    <DropDownFilterDate
                      values={filters} onChange={(value, index) => {
                        if (value === 'custom') {
                          this.handleChange(value, index);
                        } else {
                          this.handleChangeRange(value, index);
                        }
                      }}
                      last={last}
                      to={to}
                      from={from}
                    />
                    <Wall />
                    <DownloadButton size={25} onClick={downloadReport} />
                  </Fragment>
            }
              />
            }
          />
        </Panel>
        <PageLayout>
          <BrandOrdersContainer />
        </PageLayout>
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
    isReport, 
    activeCount, 
    retailers, 
  } = state.brandOrders;
  const { from, to, last } = state.pageFilters.orders;

  return {
    count, 
    pendingCount, 
    completedCount, canceledCount, isReport, activeCount,
    from, to, last,
    retailers,
  };
};

const mapDispatchToProps = dispatch => ({
  setOrderLastDayFilter: (value, from, to) => dispatch(setOrderLastDayFilter(value, from, to)),
  downloadReport: () => dispatch(ordersReport()),
  closeReport: () => dispatch(brandOrdersReportClose()),
  getBrandOrders: title => dispatch(getBrandOrders(title)),
  setBrandOrdersRetailerFilter: value => dispatch(setBrandOrdersRetailerFilter(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPageContainer);

OrdersPageContainer.defaultProps = {
  isReport: false,
};

OrdersPageContainer.propTypes = {
  closeReport: PropTypes.func.isRequired,
  isReport: PropTypes.bool,
  downloadReport: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  pendingCount: PropTypes.number.isRequired, 
  completedCount: PropTypes.number.isRequired, 
  canceledCount: PropTypes.number.isRequired, 
  setOrderLastDayFilter: PropTypes.func.isRequired,
  getBrandOrders: PropTypes.func.isRequired,
  activeCount: PropTypes.string.isRequired,
  from: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  last: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  retailers: PropTypes.arrayOf(PropTypes.object).isRequired,
  setBrandOrdersRetailerFilter: PropTypes.func.isRequired,
};
