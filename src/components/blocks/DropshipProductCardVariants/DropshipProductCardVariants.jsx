import React, { PureComponent } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import styles from './DropshipProductCardVariants.scss';

class DropshipProductCardVariants extends PureComponent {
   state = {  }

   dataFormatColor(cell, row){
     return row.options.color ? row.options.color : '-';
   }

   dataFormatSize(cell, row){
     return row.options.size ? row.options.size : '-';
   }

   dataFormatWidth(cell, row){
     return row.options.width ? row.options.width : '-';
   }

   dataFormatHeight(cell, row){
     return row.options.height ? row.options.height : '-';
   }

   render() {
     const { variants } = this.props;
      return (
        <div className={styles.container}>
          <BootstrapTable
            data={variants}
            printable
            striped
            hover
            scrollTop="Top"
            className={styles.container}
            height='400px'
          >
            <TableHeaderColumn
              isKey
              dataField="id"
              hidden
            />
            <TableHeaderColumn
              dataField="options.size"
              headerAlign="center"
              dataAlign="center"
              dataFormat={this.dataFormatSize}
            >
            Size
            </TableHeaderColumn>
            <TableHeaderColumn
              headerAlign="center"
              dataAlign="center"
              dataSort
              caretRender={this.getSortCaret}
              sortFunc={this.colorSortFunc}
              dataFormat={this.dataFormatColor}
            >
            Color      
            </TableHeaderColumn>
            <TableHeaderColumn
              headerAlign="center"
              dataAlign="center"
              dataFormat={this.dataFormatWidth}
            >
            Width
            </TableHeaderColumn>
            <TableHeaderColumn
              headerAlign="center"
              dataAlign="center"
              dataFormat={this.dataFormatHeight}
            >
            Height
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="sku"
              headerAlign="center"
              dataAlign="center"
            >
            SKU
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="sku"
              headerAlign="center"
              dataAlign="center"
            >
            MSRP
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
   }
}

export default DropshipProductCardVariants;

DropshipProductCardVariants.propTypes = {
  variants: PropTypes.arrayOf(PropTypes.object).isRequired,
};