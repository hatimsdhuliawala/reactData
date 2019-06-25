import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles, FormControlLabel, Radio, FormControl, RadioGroup } from '@material-ui/core'
import { getRandomImage, submitImageLabel } from '../../../store/imageLabel/actionCreator'
import { DefaultState } from './ImageLabelsData'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: `5`,
  },
  formControl: {
    margin: theme.spacing.unit * 1,
  },
  group: {
    margin: `0px 0`,
  },
})

class LabelChoice extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.state = DefaultState
  }

  handleChange = event => {
    this.props.submitImageLabel(
      {
        currentImageUrl: this.props.currentImageToLabel,
        currentImageSignature: this.props.currentImageSignature,
        experimentName: DefaultState.experimentName,
        labelName: event.target.value,
        userEmail: this.props.auth.email,
      }
    )
    this.props.getRandomImage({
      userEmail: this.props.auth.email,
      experimentName: DefaultState.experimentName,
    })
  };

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="label"
            name="label2"
            className={classes.group}
            // value={this.state.value}
            onChange={this.handleChange}
          >
            {
              this.state.labelsChoices.map(choice => (
                <FormControlLabel value={choice.value} control={<Radio />} label={choice.display} />
              ))
            }
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRandomImage,
    submitImageLabel,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    imageLabel,
  } = state
  const {
    currentImageToLabel,
    currentImageSignature,
  } = imageLabel

  return {
    auth,
    currentImageToLabel,
    currentImageSignature,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LabelChoice))
