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
import Pageview from '@material-ui/icons/Pageview'
import Build from '@material-ui/icons/Build'
import Block from '@material-ui/icons/Block'
import Done from '@material-ui/icons/Done'
import Cached from '@material-ui/icons/Cached'
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import Warning from '@material-ui/icons/Warning'
import {
  Grid,
} from '@material-ui/core'
import Moment from 'react-moment'
import { Link, withRouter } from 'react-router-dom'
import envConfigs from '../../../../config/apiConfig'
import NoThumbnail from '../../../../images/NoThumbnail.svg'

const columnData = [
  { id: 'Actions', numeric: false, disablePadding: false, label: 'Actions' },
  { id: 'Status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'Poster Frame', numeric: false, disablePadding: false, label: 'Poster Frame' },
  { id: 'Video Title', numeric: false, disablePadding: false, label: 'Video Title' },
  { id: 'Provided TCIN(s)', numeric: false, disablePadding: false, label: 'Provided TCIN(s)' },
  { id: 'Applied TCIN(s)', numeric: false, disablePadding: false, label: 'Applied TCIN(s)' },
  { id: 'Upload Date', numeric: false, disablePadding: false, label: 'Upload Date' },
]

function escapeHtml (input) {
  return { __html: input }
}

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'MM-DD-YYYY [at] LT',
}

const generatingPreview = envConfigs.api.sceneSevenBaseUrl + 'generating_preview'
const setWidHeight = '?hei=75&wid=133'

function HistoryPage (props) {
  const { videoHistoryData, classes, totalElements, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, emptyRows } = props
  return (
    <React.Fragment>
      {videoHistoryData
        ? <React.Fragment>{ videoHistoryData.length > 0
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
                  {videoHistoryData
                    .map((data, index) => {
                      return (
                        <TableRow
                          key={index}
                        >
                          <TableCell>
                            {(data.approval_status === 'Approved' || data.approval_status === 'InProcess') &&
                            <Link to={{ pathname: '/v2/video/upload', state: { historyData: data } }} className={classes.noDecoration}>
                              <Grid container direction="row" className={classes.viewInfoIcon} alignItems="center">
                                <Pageview />
                                <span>View Info</span>
                              </Grid>
                            </Link>
                            }
                            {(data.approval_status === 'Rejected') &&
                              <Link to={{ pathname: '/v2/video/upload', state: { historyData: data } }} className={classes.noDecoration}>
                                <Grid container direction="row" className={classes.fixIcon} alignItems="center">
                                  <Build />
                                  <span>Fix</span>
                                </Grid>
                              </Link>
                            }
                            {(data.approval_status !== 'Rejected' && data.approval_status !== 'Approved' && data.approval_status !== 'InProcess') &&
                              <Grid container direction="row" className={classes.blockedIcon} alignItems="center">
                                <Block />
                              </Grid>
                            }
                          </TableCell>
                          <TableCell>
                            {data.approval_status === 'Approved' &&
                              <Grid container direction="row" className={classes.statusApporved} alignItems="center">
                                <Done />
                                <span>Approved</span>
                              </Grid>
                            }
                            {(data.approval_status === 'Pending' || !data.approval_status) &&
                              <Grid container direction="row" className={classes.statusPending} alignItems="center">
                                <Cached />
                                <span>{data.external_user_status_message}</span>
                              </Grid>
                            }
                            {(data.approval_status === 'InProcess') &&
                              <Grid container direction="row" className={classes.statusInprocess} alignItems="center">
                                <SpeakerNotes />
                                <span>Received by ME - Awaiting Review</span>
                              </Grid>
                            }
                            {data.approval_status === 'Rejected' &&
                              <Grid container direction="row" className={classes.statusRejected} alignItems="center">
                                <Warning />
                                <span>{data.external_user_status_message}</span>
                              </Grid>
                            }
                          </TableCell>
                          <TableCell>
                            {!data.poster_frame_url || data.poster_frame_url === null ? <img src={generatingPreview + setWidHeight} alt={data.tcin}
                              onError={(e) => { e.target.src = NoThumbnail }}
                              className={classes.imageThumbnail}
                            />
                              : <img src={data.poster_frame_url + setWidHeight} alt={data.tcin}
                                onError={(e) => { e.target.src = NoThumbnail }}
                                className={classes.imageThumbnail}
                              />}
                          </TableCell>
                          <TableCell>
                            <div dangerouslySetInnerHTML={escapeHtml(data.title)} />
                          </TableCell>
                          <TableCell>
                            <Grid container direction="column">
                              {data.tcins_set.map(function (tcin, index) {
                                return <span key={index}>{tcin}</span>
                              })
                              }
                            </Grid>
                          </TableCell>
                          <TableCell>
                            <Grid container direction="column">
                              {(data.applied_tcins_set && data.applied_tcins_set.length > 0) ? data.applied_tcins_set.map(function (tcin, index) {
                                return <span key={index}>{tcin}</span>
                              })
                                : 'null'}
                            </Grid>
                          </TableCell>
                          <TableCell>
                            {(data.create_time && data.create_time)
                              ? <Moment calendar={calendarStrings}>{data.create_time}</Moment> : 'null'}
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
          : <div className={props.classes.noResult}>You haven't uploaded any video yet!</div>}
        </React.Fragment>
        : <CircularProgress className={classes.progressBar} /> }
    </React.Fragment>
  )
}
export default withRouter(withStyles(styles)(HistoryPage))
