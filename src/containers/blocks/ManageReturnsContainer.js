import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Toolbar from '../../components/common/Toolbar';
import Retailers from '../../components/blocks/Retailers';
import RetailersMobile from '../../components/blocks/RetailersMobile';
import IsMobile from '../../containers/common/IsMobile';
import { 
  getManageReturns,
  setManageReturnsSearchById,
  setSortAscOrDesc,
  getManageOrder,
  setManageReturnsOffset,
  postManageReturnsReturns,
} from '../../store/actions/manageReturns';
import Spinner from '../../components/common/Spinner';

class ManageReturnsContainer extends PureComponent {

  componentDidMount() {
    this.props.getManageReturns();
  }

  render() {
    const { 
     data,
     count,
     isLoading,
    } = this.props; 
    
    return isLoading ? <Spinner /> : ( data.length >= 0 ?
      <div>
        <Toolbar name="Manage returns" count={count} />
        <div>
          <IsMobile
            desctop={<Retailers 
              {...this.props}
            />}
            mobile={<RetailersMobile />}
          />
        </div>
      </div>
     : null );
  }
}

const mapStateToProps = (state) => {
  const { data, count, offset, sort, order, perPage, isLoading } = state.manageReturns;
  return {
    data,
    count,
    offset,
    sort,
    order,
    perPage,
    isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
  getOrder: id => dispatch(getManageOrder(id)),
  getManageReturns: () => dispatch(getManageReturns()),
  postReturns: () => dispatch(postManageReturnsReturns()),
  setPage: offset => dispatch(setManageReturnsOffset(offset)),
  setSortAscOrDesc: field => dispatch(setSortAscOrDesc(field)),
  filterById: count => dispatch(setManageReturnsSearchById(count)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ManageReturnsContainer,
);


ManageReturnsContainer.propTypes = {
  data: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  getManageReturns: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
