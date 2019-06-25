import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import {
  Card,
} from '@material-ui/core'
import DropZoneContainer from './DropZoneContainer'
import CircularProgress from '@material-ui/core/CircularProgress'

function UplodPage (props) {
  return (
    <React.Fragment>
      <Card>
        <DropZoneContainer />
      </Card>
      { props.isFetchingOnDrop && <CircularProgress className={props.classes.progressBar} />}
    </React.Fragment>
  )
}
export default withStyles(styles)(UplodPage)
