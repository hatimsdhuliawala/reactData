import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Button,
  Grid,
} from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress'
import CheckCircle from '@material-ui/icons/CheckCircle'
import HighlightOff from '@material-ui/icons/HighlightOff'

function Uploader (props) {
  const { classes, uploadCancel, uploadInProgress, uploadData, totalFiles } = props
  return (
    <React.Fragment>
      { uploadInProgress &&
        <div className={classes.cepUploadMgr}>
          <Grid container direction="row" alignItems="center" justify="flex-start" className={classes.cepUploadMgrBar}>
            <Grid item xs={6} container alignItems="center">
              <span style={{ marginLeft: '10px' }}>Uploading {totalFiles} Files</span>
            </Grid>
            <Grid xs={6} item container alignItems="center" justify="flex-end">
              <Button onClick={uploadCancel} style={{ color: 'white' }}> X </Button>
            </Grid>
          </Grid>
          <div className={classes.cepUploadMgrBody}>
            <Table >
              <TableBody >
                { uploadData
                  .map(data => {
                    return (
                      <TableRow
                        key={data.fileName}
                      >
                        <TableCell padding="checkbox">
                          {data.fileName}
                        </TableCell>
                        <TableCell padding="none">
                          {data.percent < 0 && <HighlightOff className={classes.uploadError} />}
                          {(data.percent >= 0 && data.percent <= 100) && <CircularProgress className={classes.uploadProgress} variant="static" value={data.percent} size={24} />}
                          { data.percent > 100 && <CheckCircle className={classes.uploadComplete} />}
                        </TableCell>
                      </TableRow>
                    )
                  }
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
      }
    </React.Fragment>
  )
}
export default withStyles(styles)(Uploader)
