import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
const columnData = [
  { id: 'tcin', numeric: false, disablePadding: true, label: 'TCIN' },
  { id: 'suffix', numeric: false, disablePadding: false, label: 'Suffix' },
  { id: 'view_type', numeric: false, disablePadding: false, label: 'View Type' },
  { id: 'file_name', numeric: false, disablePadding: false, label: 'File Name' },
  { id: 'host_name', numeric: false, disablePadding: false, label: 'Host Name' },
  { id: 'source', numeric: false, disablePadding: false, label: 'Source' },
  { id: 'create_time', numeric: false, disablePadding: false, label: 'Create Time' },
  { id: 'details', numeric: false, disablePadding: false, label: 'Details' },
]

class JobDataHead extends React.Component {
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

JobDataHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default withStyles(styles)(JobDataHead)
