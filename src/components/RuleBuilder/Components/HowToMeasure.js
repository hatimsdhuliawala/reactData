import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
  Paper,
  Button,
} from '@material-ui/core'
import { styles } from '../../../styles/rulesBuilderStyles'
import { toggleHowToMeasure } from '../../../store/sizeChartEdit/sizeChartDataActions'
import { getHowToMeasure } from '../../../store/sizeChartEdit/sizeChartHTTPActions'

/*
 */

class HowToMeasure extends React.Component {
  componentDidMount () {
    this.props.getHowToMeasure(this.props.category)
  }
  render () {
    const {
      classes,
      useMeasurementGuide,
      howToMeasure,
    } = this.props

    return (
      <div>
        <link type="text/css" href="" rel="stylesheet" />
        <link type="text/css" href="" rel="stylesheet" />
        <Paper>
          <div className={classes.howToMeasureToggleWrapper}>
            <Button
              onClick={() => this.props.toggleHowToMeasure()}
              className={classes.toggleHowToMeasureButton}
            >Toggle How To Measure</Button>
          </div>
          <div
            id="how to measure"
            dangerouslySetInnerHTML={!useMeasurementGuide ? { __html: '' } : { __html: howToMeasure }}
            className={classes.howToMeasure}
          />
        </Paper>
      </div>
    )
  }
}

HowToMeasure.defaultProps = {
  category: '',
  brand: '',
  size: '',
}

export const mapStateToProps = state => {
  return {
    category: state.sizeChartEdit.sizeChart.category,
    useMeasurementGuide: state.sizeChartEdit.useMeasurementGuide,
    howToMeasure: state.sizeChartEdit.howToMeasure,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    toggleHowToMeasure: () => dispatch(toggleHowToMeasure()),
    getHowToMeasure: (category) => dispatch(getHowToMeasure(category)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HowToMeasure))
