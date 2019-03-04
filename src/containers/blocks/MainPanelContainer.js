import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MainPanel from '../../components/blocks/MainPanel';

const mapStateToProps = state => ({
  retailersCount: +state.approveNewRetailers.count,
  productsCount: +state.assignNewProducts.count,
  returnsCount: +state.manageReturns.count,
});

const mapDispatchToProps = dispatch => ({
});

const MainPanelContainer = connect(mapStateToProps, mapDispatchToProps)(MainPanel);

export default MainPanelContainer;
