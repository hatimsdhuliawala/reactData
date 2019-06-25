import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
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

class ItemDetailsHead extends React.Component {
  render () {
    const { order, orderBy } = this.props

    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
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

ItemDetailsHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

export default withStyles(styles)(ItemDetailsHead)
