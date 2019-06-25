import React from 'react'
import { Typography, Toolbar, Grid, IconButton, Link } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import GetAppIcon from '@material-ui/icons/GetApp'
import TablePagination from '@material-ui/core/TablePagination'
let CopyDataContainerTitle = props => {
  const { classes, size, totalElements, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } = props
  return (
    <Toolbar>
      <Grid
        justify="space-between" // Add it here :)
        container
        spacing={24}
        alignItems="center"
      >
        <Grid item>
          <div className={classes.title}>
            <Typography
              variant="subtitle1"
              className={classes.totalElementsTitle}
              id="tableTitle">
              {size} items
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <Grid container direction="row" alignItems="center" justify="flex-end" spacing={8}>
            <Grid item>
              <IconButton onClick={() => props.downloadAllToExcel()} >
                <GetAppIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="caption"
                id="tableTitle">
                <Link href="#" className={classes.link} onClick={() => props.downloadAllToExcel()}>
                  Download All to Excel
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid>
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
      </Grid>
    </Toolbar>
  )
}

CopyDataContainerTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
}

export default withStyles(styles)(CopyDataContainerTitle)
