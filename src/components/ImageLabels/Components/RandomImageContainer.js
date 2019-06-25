import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, withStyles, Card, CardMedia, CardContent } from '@material-ui/core'
import { getRandomImage } from '../../../store/imageLabel/actionCreator'
import LabelChoice from './LabelChoice'
import { DefaultState } from './ImageLabelsData'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    display: 'flex',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 16:9
  },
  content: {
    flex: '1 0 auto',
  },
  imageToLabel: {
    width: 410,
    height: 410,
    padding: theme.spacing.unit * 2,
  },
})

class RandomImageContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.props.getRandomImage({
      userEmail: this.props.auth.email,
      experimentName: DefaultState.experimentName,
    })
  }

  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.imageToLabel}
                image={this.props.currentImageToLabel}
              />
              <CardContent className={classes.content}>
                <LabelChoice />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getRandomImage,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    imageLabel,
  } = state
  const {
    currentImageToLabel,
  } = imageLabel

  return {
    auth,
    currentImageToLabel,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RandomImageContainer))
