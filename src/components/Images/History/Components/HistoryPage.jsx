import React from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import NoThumbnail from '../../../../images/NoThumbnail.svg'
import envConfigs from '../../../../config/apiConfig'
import Moment from 'react-moment'
import {
  Grid,
} from '@material-ui/core'

const columnData = [
  { id: 'Image', numeric: false, disablePadding: false, label: 'IMAGE' },
  { id: 'Filename', numeric: false, disablePadding: false, label: 'Filename' },
  { id: 'UploadData', numeric: false, disablePadding: true, label: 'Upload Date' },
  { id: 'Status', numeric: false, disablePadding: false, label: 'Status' },
]

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'MM-DD-YYYY [at] LT',
}

const addImgConstant = '&wid=133&make_square=true'
const generatingPreview = envConfigs.api.sceneSevenBaseUrl + 'generating_preview'

function HistoryPage (props) {
  const { historyData, classes, totalElements, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, emptyRows } = props

  return (
    <React.Fragment>
      {historyData
        ? <React.Fragment>{ historyData.length > 0
          ? <div>
            <Paper className={classes.copyDataroot}>
              <Grid container alignItems="center" className={classes.marginTop20}>
                <Grid item xs={6}>
                  <div className={classes.totalHistoryData}>{rowsPerPage < totalElements ? rowsPerPage : totalElements} out of {totalElements}</div>
                </Grid>
                <Grid item xs={6}>
                  <TablePagination
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </Grid>
              </Grid>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <TableHead>
                  <TableRow>
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
                <TableBody>
                  {historyData
                    .map(data => {
                      return (
                        <TableRow
                          key={data.id}
                        >
                          <TableCell style={{ width: '100px' }}>
                            {!data.publish_url || data.publish_url === null ? <img src={generatingPreview} alt={data.tcin}
                              onError={(e) => { e.target.src = NoThumbnail }}
                              className={classes.imageThumbnail}
                            />
                              : <img src={data.publish_url + addImgConstant} alt={data.tcin}
                                onError={(e) => { e.target.src = NoThumbnail }}
                                className={classes.imageThumbnail}
                              />}
                          </TableCell>
                          <TableCell>
                            {data.file_name}
                          </TableCell>
                          <TableCell padding={'none'}>
                            {(data.events && data.events.publish_to_vault && data.events.publish_to_vault.end_time) ? <Moment calendar={calendarStrings}>{data.events.publish_to_vault.end_time}</Moment> : 'null'}
                          </TableCell>
                          <TableCell style={{ color: data.user_status_color }}>
                            {data.user_status_message}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={10} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </div>
          : <div className={props.classes.noResult}>You haven't uploaded any images yet!</div>}
        </React.Fragment>
        : <CircularProgress className={classes.progressBar} /> }
    </React.Fragment>
  )
}
export default withStyles(styles)(HistoryPage)
