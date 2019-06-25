import React from 'react'
import Card from '@material-ui/core/Card'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Chip from '@material-ui/core/Chip'
import Confirmation from './Confirmation'
const filterChip = (val, props) => {
  return (
    <Chip
      key={val.id}
      label={val.filter_name}
      className={props.classes.smallMargin}
      onClick={() => props.loadFilterHandler(val)}
      onDelete={() => props.removeSavedFilterHandler(val)}
    />
  )
}

function MyFilter (props) {
  return (
    <div className={props.classes.marginTopSmall}>
      <Card className={props.cardCss}>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={props.classes.column}>
              <Typography variant="body2">{props.title}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={props.classes.details}>
            {
              props.savedFilterData.map(val => filterChip(val, props))
            }
            <Button
              className={props.classes.button}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => props.onClick()}>
              NEW FILTER
            </Button>
          </ExpansionPanelDetails>
          <Confirmation
            isConfirmationOpen={props.isConfirmationOpen}
            handleCancelConfirmation={props.handleCancelConfirmation}
            handleConfirmRemoveFilter={props.handleConfirmRemoveFilter}
          />
        </ExpansionPanel>
      </Card>
    </div>
  )
}
export default withStyles(styles)(MyFilter)
