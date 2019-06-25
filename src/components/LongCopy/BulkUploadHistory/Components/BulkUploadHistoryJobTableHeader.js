import React from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
const columnData = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Job ID' },
  { id: 'job_status', numeric: false, disablePadding: false, label: 'Job Status' },
  { id: 'pending_sub_jobs', numeric: false, disablePadding: false, label: 'Pending Sub Jobs' },
  { id: 'total_sub_jobs', numeric: false, disablePadding: false, label: 'Total Sub Jobs' },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'created_time', numeric: false, disablePadding: false, label: 'Created At' },
  { id: 'progress', numeric: false, disablePadding: false, label: 'Progress' },
]

class BulkUploadHistoryJobTableHeader extends React.Component {
  render () {
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel>
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
export default withStyles(styles)(BulkUploadHistoryJobTableHeader)
