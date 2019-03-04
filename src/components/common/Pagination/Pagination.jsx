import React, { PureComponent } from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

class Pagination extends PureComponent {
  state = {
    currentPage: this.props.currentPage || 0,
    pageCount: this.props.pageCount,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.pageCount !== prevState.pageCount) {
      return {
        pageCount: nextProps.pageCount,
        currentPage: nextProps.currentPage,
      };
    }

    return null;
  }

  pageClick = (data) => {
    //this.setState({ currentPage: data.selected });
    this.props.handlePageClick && this.props.handlePageClick(data);
  };

  render() {
    const { pageCount } = this.props;

    return ( pageCount > 0 ?
      <div>
        <ReactPaginate
          previousLabel="&#10094;  PREVIOUS"
          nextLabel="NEXT  &#10095;"
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          onPageChange={this.pageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
          forcePage={this.state.currentPage}
        />
      </div>
    : null);
  }

}

export default Pagination;

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};