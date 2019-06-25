import React from 'react'
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core'

import LoopIcon from '@material-ui/icons/Loop'
import DoneIcon from '@material-ui/icons/Done'
import ErrorIcon from '@material-ui/icons/Error'
import UpdateIcon from '@material-ui/icons/Update'
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox'

import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'

function filterData (jobCount, event, status) {
  var item = jobCount.filter((item) => item.event === event && item.status === status)
  if (item && item.length > 0) {
    return item[0].count
  }
  return 0
}
function totalJob (jobCount, event) {
  var item = jobCount.filter((item) => item.event === event)
  if (item && item.length > 0) {
    let total = 0
    item.forEach(element => {
      total = total + element.count
    })
    return total
  }
  return 0
}
function checkIsFetching (eventLoading, event, status) {
  var items = eventLoading.filter((item) => item.event === event && item.status === status)
  let isFetching = false
  if (items && items.length > 0) {
    items.forEach(element => {
      if (element.isFetching) {
        isFetching = true
      }
    })
    return isFetching
  }
  return isFetching
}
function Header (props) {
  return (
    <Grid key={props.item.id} item xs={props.item.xs} sm={props.item.sm}>
      <Paper elevation={12}>
        <Card>
          <CardContent className={props.classes.cardStyle}>
            <Grid item xs={12}>
              <Grid container justify="center" direction="column" >
                <Grid item>
                  <Typography variant="body2" gutterBottom align="center">
                    {props.item.display}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <b>Complete </b> : {!checkIsFetching(props.eventLoading, props.item.event, 'Complete') &&
                        filterData(props.jobCount, props.item.event, 'Complete')
                      }
                    </Typography>
                    {checkIsFetching(props.eventLoading, props.item.event, 'Complete') &&
                      <CircularProgress size={15} color="secondary" />
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <b>Retry </b> : {!checkIsFetching(props.eventLoading, props.item.event, 'Retry') &&
                        filterData(props.jobCount, props.item.event, 'Retry')
                      }
                    </Typography>
                    {checkIsFetching(props.eventLoading, props.item.event, 'Retry') &&
                      <CircularProgress size={15} color="secondary" />
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <b>Error </b> : {!checkIsFetching(props.eventLoading, props.item.event, 'Error') &&
                        filterData(props.jobCount, props.item.event, 'Error')
                      }
                    </Typography>
                    {checkIsFetching(props.eventLoading, props.item.event, 'Error') &&
                      <CircularProgress size={15} color="secondary" />
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <b>Critical </b> : {!checkIsFetching(props.eventLoading, props.item.event, 'Critical') &&
                        filterData(props.jobCount, props.item.event, 'Critical')
                      }
                    </Typography>
                    {checkIsFetching(props.eventLoading, props.item.event, 'Critical') &&
                      <CircularProgress size={15} color="secondary" />
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <b>InProcess </b> : {!checkIsFetching(props.eventLoading, props.item.event, 'InProcess') &&
                        filterData(props.jobCount, props.item.event, 'InProcess')
                      }
                    </Typography>
                    {checkIsFetching(props.eventLoading, props.item.event, 'InProcess') &&
                      <CircularProgress size={15} color="secondary" />
                    }
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container justify="center" direction="row" >
                    <Typography variant="caption" gutterBottom align="center">
                      <span className={props.classes.totalJob}>Total : <b>{totalJob(props.jobCount, props.item.event)}</b></span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={props.classes.cardActions}>
            <Grid container justify="center" direction="row" >
              <Tooltip title="Click to fetch retry jobs">
                <IconButton onClick={() => props.requestJobData(props.item.event, 'Complete')}>
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Click to fetch retry jobs">
                <IconButton onClick={() => props.requestJobData(props.item.event, 'Retry')}>
                  <LoopIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Click to fetch error jobs">
                <IconButton onClick={() => props.requestJobData(props.item.event, 'Error')}>
                  <ErrorIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Click to fetch critical jobs">
                <IconButton onClick={() => props.requestJobData(props.item.event, 'Critical')}>
                  <IndeterminateCheckBoxIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Click to fetch in process jobs">
                <IconButton onClick={() => props.requestJobData(props.item.event, 'InProcess')}>
                  <UpdateIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </CardActions>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(Header)
