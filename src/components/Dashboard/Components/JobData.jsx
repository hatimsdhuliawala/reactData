/* global _ */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from '@material-ui/core'
import JobDataHead from './JobDataHead'
import JobDataToolbar from './JobDataToolbar'
import { styles } from './Theme'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import JobDetail from './JobDetail'
function getSorting (order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1)
}

class JobData extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      order: 'asc',
      orderBy: 'tcin',
      selected: [],
      page: 0,
      rowsPerPage: 15,
      open: false,
      scroll: 'paper',
      header: 'Job Information',
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  };

  handleSelectAllClick = (event, checked) => {

  };

  handleClick = (event, id) => {
  };

  handleChangePage = (event, page) => {
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  };

  handleClickOpen = (scroll, id) => () => {
    this.setState({ selectedJobId: id })
    this.setState({ open: true, scroll })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleRetry = (retryContext) => {
    this.props.handleRetry(retryContext)
  }
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render () {
    const { classes, data, event, status } = this.props
    const jobData = _.cloneDeep(data)
    const { order, orderBy, selected, rowsPerPage, page } = this.state
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)
    return (
      <Paper className={classes.jobDataContainer}>
        {this.state.open &&
          <JobDetail data={jobData}
            selectedJobId={this.state.selectedJobId}
            scroll={this.state.scroll}
            handleClose={this.handleClose}
            handleRetry={this.handleRetry}
            open={this.state.open} />
        }
        <JobDataToolbar event={event} status={status} numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <JobDataHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {jobData !== undefined && jobData
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.tcin}
                      </TableCell>
                      <TableCell>{n.suffix}</TableCell>
                      <TableCell>{n.view_type}</TableCell>
                      <TableCell>
                        {n.file_name}
                      </TableCell>
                      <TableCell>{n.host_name}</TableCell>
                      <TableCell>{n.source}</TableCell>
                      <TableCell>{n.create_time}</TableCell>
                      <TableCell>
                        <IconButton onClick={this.handleClickOpen('paper', n.id)}>
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

JobData.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(JobData)
