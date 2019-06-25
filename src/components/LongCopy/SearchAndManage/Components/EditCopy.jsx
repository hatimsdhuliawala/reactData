import React from 'react'
import {
  Card,
  Grid,
  CardContent,
  TextField,
  Button,
} from '@material-ui/core'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import '../../../../styles/longCopy.css'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link, Text, Icon } from 'react-praxis-components/SideNav'
import DialogBoxDeleteSelectionContainer from './DialogBoxDeleteSelectionContainer'
import DialogBoxConfirmDeleteContainer from './DialogBoxConfirmDeleteContainer'
import DialogBoxQuickPublishContainer from './DialogBoxQuickPublishContainer'
/* eslint-disable */
const renderTextAreaField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    multiline
    rows="15"
    fullWidth
    margin="normal"
    {...input}
    {...custom}
  />
)


const renderTextField = ({
  input,
  label,
  value,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    fullWidth
    multiline
    rows="8"
    autoFocus
    margin="normal"
    {...input}
    {...custom}
  />
)
/* eslint-enable */
function isDisable (event, permission = false) {
  if (event === 'NewWriteRequest' || event === 'WritingStarted' || event === 'ReadyForQA') {
    return false
  }
  if (permission && event === 'Done') {
    return false
  }
  return true
}

function escapeHtml (input) {
  return { __html: input }
}

function convertLongCopy (value) {
  let temp = value
  var res = temp.replace(/(<br\s*\/?>)|(<BR\s*\/?>)|(<Br\s*\/?>)|(<bR\s*\/?>)/g, '\n')
  return res
}

function convertFeatureBullet (value) {
  var convertedString = ''
  value.map(item => {
    convertedString += item + '\n'
  })
  return convertedString
}

let EditCopy = props => {
  const { pristine, selectedItemData, selectedCopyData, getFeatureBulletWordCount, editCopy,
    firstDraft, changeFirstDraft, saveDataEventHandler, publishEventHandler, draftDataEventHandler,
    getLongCopyWordCount, getTotalFeatureBullet, setBackgroundStatus, quickEditPublishConfirm,
    convertStatusDisplay, editCopyData, editFeatureBulletState, updateFeatureBullets, backTolist, classes, deleteBulletAndCopy,
    permission } = props

  if (!pristine && firstDraft && selectedCopyData.current_event.event_type !== 'ReadyForQA' && selectedCopyData.current_event.event_type === 'NewWriteRequest') {
    changeFirstDraft()
  }
  return (
    <Card>
      <CardContent>
        <Grid container spacing={24}>
          {/* New Eidt Page */}
          <Grid item container direction="row">
            <Grid item xs={2}>
              <div className={classes.counterContainer}>
                <Grid container justify="center" className={classes.marginTop20}>
                  <Grid container justify="center">
                    <Grid container justify="center" item xs={12}>
                      <span className={classes.boldText}>Highlights / Features</span>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <span className={classes.boldText}>(up to 8 maximum)</span>
                    </Grid>
                  </Grid>
                  <Grid className={classes.numberCount}>{getTotalFeatureBullet()}</Grid>

                  <Grid container item justify="center">
                    <Grid container justify="center" item xs={12}>
                      <span className={classes.boldText}>Highlights / Features word count</span>
                    </Grid>
                  </Grid>
                  <Grid className={classes.numberCount}>{getFeatureBulletWordCount()}</Grid>

                  <Grid container justify="center">
                    <Grid container justify="center" item xs={12}>
                      <span className={classes.boldText}>Copy word count</span>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                      <span className={classes.boldText}>(recommended 20 minimum)</span>
                    </Grid>
                  </Grid>
                  <Grid className={classes.numberCount}>{getLongCopyWordCount()}</Grid>
                </Grid>
              </div>
            </Grid>
            {/* long Copy and Feature Bullets */}
            {/* eslint-disable */}
            <Grid item xs={7} container direction="column">
              <Grid item>
                {editCopyData.isfeatureBulletsEdit
                  ? <Field
                    id="featureBullet"
                    name="featureBullet"
                    component={renderTextField}
                    disabled={isDisable(selectedCopyData.current_event.event_type, permission.instantEditLongCopy)}
                    className={classes.editLongCopy}
                    variant="outlined"
                    onBlur={() => updateFeatureBullets(false)}
                  />
              : <div
                  className={isDisable(selectedCopyData.current_event.event_type, permission.instantEditLongCopy) ? classes.editFeatureBulletDivDisable : classes.editFeatureBulletDiv}
                  onClick={() => editFeatureBulletState(selectedCopyData.current_event.event_type, true)}
                >
                  <span className={classes.headerHighlightText}>Highlights / Features</span>
                  <ul className={classes.featurBulletDivUl}>
                    {
                      editCopyData.isEdited ? editCopyData.editedFeatureBullets && editCopyData.editedFeatureBullets.map(item => {
                        return <li key={item}> {item} </li>
                      }) :  editCopyData.featureBullets && editCopyData.featureBullets.map(item => {
                        return <li key={item}> {item} </li>
                      })
                    }
                  </ul>
              </div>}
              </Grid>
              <Grid item>
                <Field
                  className={classes.editLongCopy}
                  id="longCopy"
                  name="longCopy"
                  variant="outlined"
                  component={renderTextAreaField}
                  disabled={isDisable(selectedCopyData.current_event.event_type, permission.instantEditLongCopy)}
                />
              </Grid>
            </Grid>
            {/* eslint-enable */}
            {/* Button */}
            <Grid container item xs={3} style={{ marginTop: '6px' }} spacing={24}>
              <Grid container justify="center" item xs={12}>
                <Button className={classes.noHoverBachground} onClick={backTolist}>
                  <Link to={{ pathname: `/v2/longcopy` }} className={classes.linkButton}>
                    <Icon className={classes.backButtonLabel}><KeyboardArrowLeftIcon /></Icon>
                    <Text className={classes.backButtonLabel} >
                      <span className={classes.backButtonLabel}>
                        Back to List of Items
                      </span>
                    </Text>
                  </Link>
                </Button>
              </Grid>

              <Grid item xs={12} container justify="center" >
                {selectedItemData.product_description && selectedItemData.product_description.title &&
                  <span>
                    <div className={`${classes.headerLabel} ${classes.marginTop30}`} dangerouslySetInnerHTML={escapeHtml(selectedItemData.product_description.title ? selectedItemData.product_description.title : 'No Title')} />
                  </span>
                }
              </Grid>
              <Grid container item xs={12}>
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <div className={classes.statusLabel} style={setBackgroundStatus(selectedCopyData.current_event.event_type)}>
                    {convertStatusDisplay(selectedCopyData.current_event.event_type)}
                  </div>
                  <span className={classes.helperTextLabel}>
                    {selectedCopyData.last_updated_by ? 'Last Updated By:' + selectedCopyData.last_updated_by : 'No Writing Started'}
                  </span>
                </Grid>
              </Grid>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.buttonSectionEditPage}
              >
                {selectedCopyData.current_event.event_type !== 'Done' &&
                <React.Fragment>{selectedCopyData.current_event.event_type !== 'ReadyForQA' ? <Button
                  className={classes.buttonSaveLongCopy}
                  disabled={pristine ||
                    editCopy.values.longCopy.length < 3 ||
                    isDisable(selectedCopyData.current_event.event_type)}
                  onClick={saveDataEventHandler}>
                    SAVE AS "READY FOR QA"
                </Button>
                  : <Button
                    className={classes.buttonSaveLongCopy}
                    disabled={!editCopy ||
                    editCopy.values.longCopy.length < 3}
                    onClick={publishEventHandler}>
                    PUBLISH
                    <KeyboardArrowRightIcon />
                  </Button>} </React.Fragment>}
                {selectedCopyData.current_event.event_type !== 'ReadyForQA' && selectedCopyData.current_event.event_type !== 'Done' && <Button
                  className={classes.buttonSaveDraft}
                  disabled={pristine ||
                  isDisable(selectedCopyData.current_event.event_type) ||
                  selectedCopyData.current_event.event_type === 'ReadyForQA'}
                  onClick={draftDataEventHandler}>
                  Save and Finish Later
                </Button>}
                {(selectedCopyData.current_event.event_type === 'Done' && permission.deleteCopyFeature) && <Button
                  className={classes.buttonSaveDraft}
                  onClick={deleteBulletAndCopy}>
                  Delete Copy/Bullets
                </Button>}
                {(selectedCopyData.current_event.event_type === 'Done' && permission.instantEditLongCopy) && <Button
                  className={classes.buttonSaveLongCopy}
                  onClick={quickEditPublishConfirm}
                  disabled={pristine}>
                  Publish Now
                </Button>}

              </Grid>
            </Grid>
          </Grid>
          {/* New Eidt Page */}
        </Grid>
      </CardContent>
      <DialogBoxDeleteSelectionContainer />
      <DialogBoxConfirmDeleteContainer />
      <DialogBoxQuickPublishContainer />
    </Card>
  )
}
EditCopy = reduxForm({ form: 'editCopy' })(EditCopy)
EditCopy = connect(
  state => ({
    initialValues: {
      longCopy: state.longCopy.editCopyData ? state.longCopy.editCopyData.longCopy ? convertLongCopy(state.longCopy.editCopyData.longCopy) : '' : '',
      featureBullet: state.longCopy.editCopyData ? state.longCopy.editCopyData.featureBullets ? convertFeatureBullet(state.longCopy.editCopyData.featureBullets) : '' : '',
    }, // pull initial values from account reducer
  }),
)(EditCopy)
export default EditCopy
