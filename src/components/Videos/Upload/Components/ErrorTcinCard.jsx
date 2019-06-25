import React from 'react'
import {
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Chip,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'

function ErrorTcinCard (props) {
  const { classes, panelTcinError, handlePanelErrorTcin, invalidTcinList, notOwnedTcinList } = props
  return (
    <React.Fragment>{(invalidTcinList.length > 0 || notOwnedTcinList.length > 0) &&
      <ExpansionPanel expanded={panelTcinError === 'tcinErrorPanel'} onChange={handlePanelErrorTcin('tcinErrorPanel')} className={classes.expansionPanel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className={props.classes.secondaryHeading}>
            {panelTcinError ? 'TCIN ERROR(s) - These will not be submitted with this video' : 'SHOW TCIN ERROR(s)'}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          {invalidTcinList.length > 0 &&
          <Grid container>
            <Grid item xs={12}><div className={classes.invalidErrorText}>Invalid Tcins</div></Grid>
            {invalidTcinList.map(data => {
              return (
                <Chip key={data} label={data} className={classes.errorChip} />
              )
            })}
          </Grid>}
          {notOwnedTcinList.length > 0 &&
            <Grid container>
              <Grid item xs={12}><div className={classes.notOwnedErrorText}>You are not the valid vendor {notOwnedTcinList.length} TCIN(s)</div></Grid>
              {notOwnedTcinList.map(data => {
                return (
                  <Chip key={data} label={data} className={classes.errorChip} />
                )
              })}
            </Grid>}
        </ExpansionPanelDetails>
      </ExpansionPanel>}
    </React.Fragment>
  )
}
export default withStyles(styles)(ErrorTcinCard)
