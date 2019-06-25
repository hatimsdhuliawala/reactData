import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from '../theme'
import Paper from '@material-ui/core/Paper'
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from '@material-ui/core'
import AddTcinContainer from './AddTcinContainer'
import SelectImageContainer from './SelectImageContainer'
import TagSelectionContainer from './TagSelectionContainer'
import SimilarItemContainer from './SimilarItemContainer'

function ClassificationPage (props) {
  const { currentActiveStep, startOver, backToSelectTags, backToSelectImage, backToEnterTcin, currentSimilarImageCount, classes } = props
  return (
    <React.Fragment>
      <Paper style={{ marginTop: '25px' }}>
        <Stepper activeStep={currentActiveStep} orientation="vertical" >
          <Step key="label">
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.stepperIcon,
                  completed: classes.completed,
                  active: classes.active },
              }}
            >
            Specify an item or click the Random button to begin training the classifier</StepLabel>
            <StepContent>
              <AddTcinContainer />
            </StepContent>
          </Step>
          {/* Step 2 */}
          <Step className={classes.checkColor} key="label2">
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.stepperIcon,
                  completed: classes.completed,
                  active: classes.active },
              }}
            >
            Select a specific image {currentActiveStep === 1 && <span className={classes.goBackSpan} role="presentation" onClick={backToEnterTcin}>(Go Back)</span>}
            </StepLabel>
            <StepContent>
              <SelectImageContainer />
            </StepContent>
          </Step>
          {/* Step 3 */}
          <Step key="label3">
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.stepperIcon,
                  completed: classes.completed,
                  active: classes.active },
              }}
            >
              Select classification tags {currentActiveStep === 2 && <span className={classes.goBackSpan} role="presentation" onClick={backToSelectImage}>(Go Back)</span>}
            </StepLabel>
            <StepContent>
              <TagSelectionContainer />
            </StepContent>
          </Step>
          {/* Step 4 */}
          <Step key="label4">
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.stepperIcon,
                  completed: classes.completed,
                  active: classes.active },
              }}
            >
            Validate your selection {currentActiveStep === 3 && currentSimilarImageCount === 0 && <span className={classes.goBackSpan} role="presentation" onClick={backToSelectTags}>(Go Back)</span>}
            </StepLabel>
            <StepContent>
              <SimilarItemContainer />
            </StepContent>
          </Step>
        </Stepper>
        {currentActiveStep !== 3 && <Button
          className={classes.startOverButton}
          onClick={startOver}>
          Start Over
        </Button>}
      </Paper>
    </React.Fragment>
  )
}

export default withStyles(styles)(ClassificationPage)
