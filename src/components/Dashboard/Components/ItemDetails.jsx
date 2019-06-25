import React from 'react'
import PropTypes from 'prop-types'
import ItemEventDetailsPopup from './ItemEventDetailsPopup'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
} from '@material-ui/core'
import ItemDetailsHead from './ItemDetailsHead'
import { styles } from './Theme'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'MM-DD-YYYY [at] LT',
}

class ItemDetails extends React.Component {
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

  handleClick = (event, id) => {
  };

  handleClickOpen = (scroll, id) => () => {
    this.setState({ selectedJobId: id })
    this.setState({ selectedItem: this.props.itemDetails.filter((item) => item.id === id)[0] })
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
    const { classes, itemDetails } = this.props
    const { order, orderBy } = this.state
    return (
      <Paper className={classes.itemDetailsContainer}>
        {this.state.open &&
          <ItemEventDetailsPopup selectedItem={this.state.selectedItem}
            selectedJobId={this.state.selectedJobId}
            scroll={this.state.scroll}
            handleClose={this.handleClose}
            handleRetry={this.handleRetry}
            open={this.state.open} />
        }
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ItemDetailsHead
              order={order}
              orderBy={orderBy}
              rowCount={itemDetails.length}
            />
            <TableBody>
              {itemDetails !== undefined && itemDetails
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
                      <TableCell component="th" scope="row">
                        {n.tcin}
                      </TableCell>
                      <TableCell>{n.suffix}</TableCell>
                      <TableCell>{n.view_type}</TableCell>
                      <TableCell>
                        {n.file_name}
                      </TableCell>
                      <TableCell>{n.host_name}</TableCell>
                      <TableCell>{n.source}</TableCell>
                      <TableCell>
                        <Moment calendar={calendarStrings} format="DD-MM-YYYY HH:mm:ss">
                          {n.create_time}
                        </Moment>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={this.handleClickOpen('paper', n.id)}>
                          <MoreHorizIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

ItemDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ItemDetails)
