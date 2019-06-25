import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'

const columnData = [
  { id: 'tcin', numeric: false, disablePadding: true, label: 'TCIN' },
  // { id: 'item', numeric: false, disablePadding: false, label: 'Item' },
  // { id: 'produnctTitle', numeric: false, disablePadding: true, label: 'Product Title' },
  { id: 'longCopy', numeric: false, disablePadding: true, label: 'Long Copy' },
  { id: 'revertLongCopy', numeric: false, disablePadding: false, label: '' },
  { id: 'featureBullets', numeric: false, disablePadding: false, label: 'Feature Bullets' },
  { id: 'revertFeatureBullets', numeric: false, disablePadding: false, label: '' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
]

class TableUploadDataHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render () {
    const { onSelectAllClick, numSelected, rowCount } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                padding={column.disablePadding ? 'none' : 'default'}
              >
                {column.label}
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

TableUploadDataHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default TableUploadDataHead
