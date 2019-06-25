import React from 'react'
import {
  Card,
  Grid,
  CardContent,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'

const calendarStrings = {
  lastDay: '[Yesterday at] LT',
  sameDay: '[Today at] LT',
  nextDay: '[Tomorrow at] LT',
  lastWeek: '[Last] dddd [at] LT',
  nextWeek: 'dddd [at] LT',
  sameElse: 'MM-DD-YYYY [at] LT',
}
function escapeHtml (input) {
  return { __html: input }
}
function CopyHistory (props) {
  const { classes, historyIndex, copyHistory, changeHistoryIndex } = props
  return (
    <div>{copyHistory ? <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.marginTop10}
              >
                <div className={classes.historyButtonContainer}>
                  { copyHistory.map((copy, index) => {
                    return (
                      <Grid
                        container
                        direction="column"
                        onClick={() => changeHistoryIndex(index)}
                        key={index}
                        className={index === historyIndex ? classes.historyButtonsSelected : classes.historyButtons}
                      >
                        <Moment className={classes.helperTextLabel} calendar={calendarStrings} parse="DD-MM-YYYY HH:mm:ss">{copy.created_time}</Moment>
                        <span className={classes.helperTextLabel}>
                          Saved by: {copy.created_by}
                        </span>
                      </Grid>
                    )
                  })
                  }
                </div>
              </Grid>
            </Grid>

            {/* Long copy and Feature bullet Header */}
            <Grid container direct="column" item xs={9}>
              <Grid item xs={12} container direct="column" justify="center">
                {copyHistory[historyIndex].feature_bullets &&
                  <div className={classes.historyFeatureBullet}>
                    <span className={classes.historyheaderHighlightText}>Highlights / Features</span>
                    <ul className={classes.historyfeaturBulletDivUl}>
                      {
                        copyHistory[historyIndex].feature_bullets && copyHistory[historyIndex].feature_bullets.map(item => {
                          return <li key={item} dangerouslySetInnerHTML={escapeHtml(item)} />
                        })
                      }
                    </ul>
                  </div>}
              </Grid>
              <Grid item container direct="column" justify="center" xs={12}>
                <div className={classes.historyLongCopy} dangerouslySetInnerHTML={escapeHtml(copyHistory[historyIndex].long_copy)} />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid> : <Grid container justify="center">
      <span className={`${classes.noHistoryData} ${classes.minHeightCard}`}>No history data available</span> </Grid>}
    </div>
  )
}
export default withStyles(styles)(CopyHistory)
