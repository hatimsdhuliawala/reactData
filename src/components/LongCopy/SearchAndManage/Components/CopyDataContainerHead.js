import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'

const columnData = [
  { id: 'open', numeric: false, disablePadding: false, label: 'Open' },
  { id: 'status', numeric: false, disablePadding: true, label: 'Status' },
  { id: 'tcin', numeric: false, disablePadding: false, label: 'TCIN' },
  { id: 'productTitle', numeric: false, disablePadding: false, label: 'Product Title' },
  { id: 'divDeptClass', numeric: false, disablePadding: false, label: 'Division' },
  { id: 'brand', numeric: false, disablePadding: false, label: 'Brand' },
  { id: 'relationshipType', numeric: false, disablePadding: false, label: 'Rel. Type' },
  { id: 'writing_team', numeric: false, disablePadding: false, label: 'Writing Team' },
  { id: 'launch_due_dt', numeric: false, disablePadding: false, label: 'Launch Date' },
  { id: 'notes', numeric: false, disablePadding: false, label: 'Notes' },
]

class CopyDataContainerHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  };

  render () {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props

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
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

CopyDataContainerHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default CopyDataContainerHead
