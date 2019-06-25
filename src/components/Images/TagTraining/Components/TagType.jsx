import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Tooltip,
} from '@material-ui/core'
import {
  CheckCircleOutline,
  RadioButtonUncheckedOutlined,
} from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'

function TagType (props) {
  const { classes, userEmail, tags, getImageUrlsForModelLabel, initiateModelTraining } = props
  return (
    <React.Fragment>
      <List>
        {
          tags.map(t => (
            <React.Fragment key={`${t.tag}`}>
              <ListItem>
                <ListItemText
                  primary={`${t.tag}`}
                  classes={{ primary: classes.primaryListItemHeaderText }}
                />
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ fontSize: '10px' }}
                    onClick={() => {
                      initiateModelTraining(t.id, userEmail)
                    }}
                    disabled={t.isTrainingInProgress || !t.isEligibleForTraining}
                  >
                    {
                      (() => {
                        if (t.isTrainingInProgress) {
                          return 'In Progress'
                        } else if (!t.isEligibleForTraining) {
                          return 'Not Eligible'
                        } else {
                          return 'Train Model'
                        }
                      })()}
                  </Button>
                </span>
              </ListItem>
              {
                t.labels.map(l => (
                  <ListItem
                    divider
                    key={`${t.tag}${l.label}`}
                    button
                    onClick={() => getImageUrlsForModelLabel(t.tag, l.label)}
                  >
                    <ListItemText
                      inset primary={`${l.label}`}
                    />
                    {l.isEligibleForTraining
                      ? <Tooltip title="Eligible for Model Training">
                        <CheckCircleOutline
                          nativeColor="green"
                        />
                      </Tooltip>
                      : <Tooltip title="Not Enough Images for Model Training">
                        <RadioButtonUncheckedOutlined
                          nativeColor="red"
                        /></Tooltip>
                    }
                  </ListItem>
                ))
              }
            </React.Fragment>
          ))
        }
      </List>
    </React.Fragment>
  )
}

export default withStyles(styles)(TagType)
