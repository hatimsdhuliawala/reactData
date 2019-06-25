import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Fab,
  Typography,
  Tooltip,
} from '@material-ui/core'
import styles from '../theme'
import BulkUploadHistoryJobTableHeader from './BulkUploadHistoryJobTableHeader'
import { withStyles } from '@material-ui/core/styles'
import RefreshIcon from '@material-ui/icons/Refresh'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Moment from 'react-moment'

function findPercentageProgress (n) {
  if (n.total_sub_jobs === 0) {
    return 100
  }
  return (100 - (n.pending_sub_jobs * 100) / n.total_sub_jobs)
}
const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'L',
}

function BulkUploadHistoryJobs (props) {
  const { jobData, currentPage, totalPages, classes, totalElements } = props
  return (
    <Paper elevation={12} className={classes.marginTop}>
      <Card>
        <CardContent>
          <Grid container spacing={24}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h6" gutterBottom className={classes.marginRight}>
              Bulk Upload Jobs
            </Typography>
            <Tooltip title="Refresh Jobs" aria-label="Refresh">
              <Fab color="primary" size="small" className={classes.buttonIndigo}>
                <RefreshIcon onClick={() => props.fetchBulkUploadJobsAction()} />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid container spacing={24}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <div className={classes.marginLeft}>
              <Typography variant="subtitle2" gutterBottom >
                {totalElements} Jobs
              </Typography>
            </div>
          </Grid>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Table aria-labelledby="tableTitle">
                <BulkUploadHistoryJobTableHeader />
                <TableBody>
                  {jobData !== undefined && jobData.length > 0 && jobData.map(n => {
                    return (
                      <TableRow
                        hover
                        key={n.id}
                      >
                        <TableCell>
                          {n.id}
                        </TableCell>
                        <TableCell>
                          {n.job_status}
                        </TableCell>
                        <TableCell>
                          {n.pending_sub_jobs}
                        </TableCell>
                        <TableCell>
                          {n.total_sub_jobs}
                        </TableCell>
                        <TableCell>
                          {n.created_by}
                        </TableCell>
                        <TableCell>
                          {n.created_time &&
                            <Moment
                              calendar={calendarStrings}
                              parse="DD-MM-YYYY HH:mm:ss"
                            >
                              {n.created_time}
                            </Moment>
                          }
                        </TableCell>
                        <TableCell>
                          <div className={classes.wrapper}>
                            {findPercentageProgress(n) === 100
                              ? <Tooltip title="Complete Job" aria-label="Complete">
                                <Fab color="primary" size="small" className={classes.buttonSuccess}>
                                  <CheckIcon />
                                </Fab>
                              </Tooltip>
                              : <Tooltip title="InProcess Job" aria-label="InProcess">
                                <Fab color="primary" size="small" className={classes.buttonIndigo}>
                                  <SaveIcon />
                                </Fab>
                              </Tooltip>
                            }
                            {findPercentageProgress(n) !== 100 &&
                              <CircularProgress
                                size={52}
                                variant="static"
                                className={classes.fabProgress}
                                value={findPercentageProgress(n)}
                              />
                            }
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
            </Grid>
          </Grid>
          {currentPage < (totalPages - 1) &&
            <Grid container spacing={24}
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.marginTop}
            >
              <Tooltip title="Load More Jobs" aria-label="Refresh">
                <Fab color="primary" size="small" className={classes.buttonIndigo}>
                  <ExpandMoreIcon onClick={() => props.fetchMoreBulkUploadJobsAction()} />
                </Fab>
              </Tooltip>
            </Grid>
          }
        </CardContent>
      </Card>
    </Paper>
  )
}

export default withStyles(styles)(BulkUploadHistoryJobs)
