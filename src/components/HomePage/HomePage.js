import React from 'react'
import { object } from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import HeaderTitle from '../Header/HeaderTitle'
import {
  Card,
  CardContent,
} from '@material-ui/core'
import '../../styles/homePage.css'

class HomePage extends React.Component {
  static propTypes = {
    classes: object,
  }

  render () {
    const { headerTitle } = this.props
    var title = { alert: '',
      resolved: '',
      normal: '',
    }
    var releaseNotes = { header: 'Here’s what happening with Pipeline!',
      description: 'Recent Announcements:',
      details: ['02/15/2019 - Image and Video upload changes… In a continuing effort to improve performance and stability we are updating our image and video upload services. There are no functional changes to the webpages — upload, history, and review pages are all the same. If you have questions or issues please continue to submit a Pipeline Support Request in POL by clicking “Request Support” and then in Reason for Support select “Vendor Pipeline - Images, Videos, CGI (CEP)“. For questions or issues specific to access to Content Pipeline, password resets, or account unlocks, please call the POL Help Desk at 612-304-3310 option #3, option #1 M – F, 9 a.m. to 12 p.m. and 1 p.m to 4 p.m. CST to speak to a specialist.',
        '12/7/2018 - Changes to Video coming in May 2019 - Beginning May 1st 2019, all newly submitted videos will require both Closed Captioning AND Transcripts. A transcript acts as a complete text alternative for video content. Watch this space for more information soon.'],
    }

    return (
      <div>
        <HeaderTitle title="Home" />
        <Helmet>
          <title>{headerTitle}</title>
        </Helmet>
        {title.alert.length ? <Card className="hp-alert-bg hp-margin-10">
          <CardContent>
            {title.alert}
          </CardContent>
        </Card> : null}
        {title.resolved.length ? <Card className="hp-resolved-bg hp-margin-10">
          <CardContent>
            {title.resolved}
          </CardContent>
        </Card> : null}
        {title.normal.length ? <Card className="hp-margin-10">
          <CardContent>
            {title.normal}
          </CardContent>
        </Card> : null}
        {releaseNotes.header.length || releaseNotes.description.length || releaseNotes.details.length ? <Card className="hp-margin-10">
          <CardContent>
            {releaseNotes.header.length ? <div className="hp-releaseNotes-header  hp-margin-bottom-10">{releaseNotes.header}</div> : null}
            {releaseNotes.description.length ? <div className="hp-releaseNotes-data">{releaseNotes.description}</div> : null}
            {releaseNotes.details.length ? <ul className="hp-releaseNotes-data">{releaseNotes.details.map(data => {
              return (
                <li key={data}>{data}</li>
              )
            })
            }</ul> : null}
          </CardContent>
        </Card> : null}
      </div>
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

export default connect(mapStateToProps)(HomePage)
