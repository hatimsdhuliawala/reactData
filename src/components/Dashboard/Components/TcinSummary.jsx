import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  Paper,
} from '@material-ui/core'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
function TcinSummary (props) {
  const {
    tcinSummary,
  } = props
  return (
    <Grid>
      <Paper elevation={12}>
        <Card>
          <CardHeader title="TCIN Summary" />
          <CardContent className={props.classes.systemHealthCardStyle}>
            <Grid container spacing={24}>
              <Grid
                className={props.classes.jobDataContainer}
                spacing={16}
                justify="center"
                alignItems="center"
                item xs={4} sm container>
                <Grid item xs={6} sm={3} container direction="column" >
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Total
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      TCINs
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                      {tcinSummary.totalTcins}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} sm={3} container direction="column">
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Validated
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      TCINs
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                      {tcinSummary.totalValidatedImages !== tcinSummary.totalTcins &&
                        <font color="RED"> {tcinSummary.totalValidatedImages} </font>
                      }
                      {tcinSummary.totalValidatedImages === tcinSummary.totalTcins &&
                        <font color="GREEN"> {tcinSummary.totalValidatedImages} </font>
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={16} className={props.classes.marginTopMedium}>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Primary
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      Images
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="headline">
                      {tcinSummary.totalPrimaryImages}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Primary(TCIN)
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      Images
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="headline">
                      {tcinSummary.totalTcinBasedImages}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Alternate
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      Images
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="headline">
                      {tcinSummary.totalAlternateImages}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="caption">
                      Swatch
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      Images
                    </Typography>
                    <Divider />
                    <Typography gutterBottom variant="headline">
                      {tcinSummary.totalSwatchImages}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(TcinSummary)
