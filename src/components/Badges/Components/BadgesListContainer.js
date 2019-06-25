import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import HeaderSectionContainer from './HeaderSectionContainer'
import TableBadgesContainer from './TableBadgesContainer'
import styles from '../theme'
import {
  Card,
  CardContent,
} from '@material-ui/core'

class BadgesListContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }
  render () {
    return (
      <Card className={this.props.classes.marginTopMidium}>
        <CardContent>
          <HeaderSectionContainer />
          <TableBadgesContainer />
        </CardContent>
      </Card>
    )
  }
}

export default connect(null, null)(withStyles(styles)(BadgesListContainer))
