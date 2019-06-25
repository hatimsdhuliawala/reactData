import React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import HeaderTitle from '../Header/HeaderTitle'
import '../../styles/homePage.css'
import RandomImageContainer from './Components/RandomImageContainer'

class ImageLabels extends React.Component {
  static propTypes = {
    classes: object,
  }

  render () {
    const { headerTitle } = this.props
    return (
      <React.Fragment>
        <HeaderTitle title="Image Tags" />
        <Helmet>
          <title>{headerTitle}</title>
        </Helmet>
        <RandomImageContainer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  const { layout } = state
  const { headerTitle } = layout

  return {
    headerTitle: headerTitle,
  }
}

export default connect(mapStateToProps)(ImageLabels)
