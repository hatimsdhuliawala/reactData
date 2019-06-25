import React from 'react'
import { shape, func } from 'prop-types'
import { Helmet } from 'react-helmet'
import NotFound from 'react-praxis-components/NotFound'
import HeaderTitle from '../Header/HeaderTitle'

class NotFoundPage extends React.Component {
  static propTypes = {
    layoutActions: shape({
      setHeaderTitle: func,
    }),
  }

  render () {
    const { headerTitle } = this.props
    return (
      <div>
        <HeaderTitle title="Not Found" />
        <Helmet title={headerTitle} />
        <NotFound />
      </div>
    )
  }
}

export default (NotFoundPage)
