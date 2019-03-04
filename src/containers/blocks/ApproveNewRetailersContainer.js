import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import DropDownFilter from '../../components/filters/DropDownFilter';
import SortOrderFilter from '../../components/filters/SortOrderFilter';
import Cards from '../../components/blocks/Cards';
import { retailersFilter } from '../../constants/filters';
import { 
    setApproveNewRetailersOrder, 
    getApproveNewRetailers, 
    setApproveNewRetailersOffset,
    setApproveNewRetailersOrderField, 
} from '../../store/actions/approveNewRetailers';
import Wall from '../../components/common/Wall';
import Spinner from '../../components/common/Spinner';

class ApproveNewRetailersContainer extends PureComponent {
  componentDidMount() {
    this.props.getApproveNewRetailers();
  }

  render() {
    const { 
        data, 
        count, 
        perPage,
        setApproveNewRetailersOrder,
        setApproveNewRetailersOffset,     
        setApproveNewRetailersOrderField, 
        isLoading, 
        offset,
    } = this.props; 

    return (isLoading ? <Spinner /> : data.length > 0 ?
      <div>
        <Toolbar name="Approve new retailers" count={count}>
          <div className='hide_dropdown_filter'>
            <DropDownFilter
              values={retailersFilter}
              onChange={setApproveNewRetailersOrderField}
              staticPoint
            />
          </div>
          <Wall />
          <SortOrderFilter onChange={setApproveNewRetailersOrder} />
        </Toolbar>
        <Cards
          retailers={data}
          count={count}
          setPage={setApproveNewRetailersOffset}
          perPage={perPage}
          offset={offset}
        />
      </div>
    : null);
  }
}

const mapStateToProps = (state) => {
  const { 
    data, 
    count, 
    perPage, 
    isLoading, 
    offset, 
  } = state.approveNewRetailers;

  return {
    data,
    count,
    perPage,
    isLoading,
    offset,
  };
};

const mapDispatchToProps = dispatch => ({
  setApproveNewRetailersOrderField: field => dispatch(setApproveNewRetailersOrderField(field)),
  setApproveNewRetailersOrder: order => dispatch(setApproveNewRetailersOrder(order)),
  getApproveNewRetailers: () => dispatch(getApproveNewRetailers()),
  setApproveNewRetailersOffset: offset => dispatch(setApproveNewRetailersOffset(offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ApproveNewRetailersContainer,
);

ApproveNewRetailersContainer.propTypes = {
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  setApproveNewRetailersOrderField: PropTypes.func.isRequired,
  setApproveNewRetailersOrder: PropTypes.func.isRequired,
  setApproveNewRetailersOffset: PropTypes.func.isRequired,
  getApproveNewRetailers: PropTypes.func.isRequired,   
  isLoading: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
};
