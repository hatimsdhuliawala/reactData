import React from 'react'
import { shape, string, func, bool, object } from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { withStyles } from '@material-ui/core/styles'
import _ from 'lodash'
import envConfig from '../../config/apiConfig'
import HomeIcon from '@material-ui/icons/Home'
// import DashboardIcon from '@material-ui/icons/Dashboard'
import StraightenIcon from '@material-ui/icons/Straighten'
import Polymer from '@material-ui/icons/Polymer'
import Info from '@material-ui/icons/Info'
import PhotoIcon from '@material-ui/icons/Photo'
import Launch from '@material-ui/icons/Launch'
import SideNav, { Footer, Header, Icon, Link, Text } from 'react-praxis-components/SideNav'
import UserBar from 'react-praxis-components/UserBar'
import Grid from '@material-ui/core/Grid'
import Notifications from '../Notifications/Notifications'
import { closeSideNav, openSideNav } from '../../store/layout/actionCreator'
import AppHeader from '../Header/Header'
import HomePage from '../HomePage/HomePage'
import ImageLabels from '../ImageLabels/ImageLabels'
import NotFound from '../NotFoundPage/NotFoundPage'
import SignInPrompt from '../SignInPrompt/SignInPrompt'
import LongCopy from '../LongCopy/SearchAndManage/LongCopy'
import DashboardUI from '../Dashboard/DashboardUI'
import DashboardHeader from '../Dashboard/DashboardHeader'
import EditLongCopy from '../LongCopy/SearchAndManage/EditLongCopy'
import LongCopyHeader from '../LongCopy/LongCopyHeader'
import ImagesHeader from '../Images/ImagesHeader'
import DashboardPage from '../DashboardPage/DashboardPage'
import Copy from '../LongCopy/NarativeScience/Copy'
import SpecMismatch from '../SpecMismatch/SpecMismatch'
import Auth from '../Auth/Auth'
import { signIn, signOut } from '../../store/auth'
import BulkUpload from '../LongCopy/BulkUpload/BulkUpload'
import BulkUploadHistory from '../LongCopy/BulkUploadHistory/BulkUploadHistory'
import Images from '../Images/Upload/Images'
import ImagesHistory from '../Images/History/ImagesHistory'
import ImagesReview from '../Images/Review/ImagesReview'
import ImagesReviewHistory from '../Images/ReviewHistory/ImagesReviewHistory'
import SearchAndManage from '../Images/SearchAndManage/SearchAndManage'
import Classification from '../Images/Classification/Classification'
import TagTraining from '../Images/TagTraining/TagTraining'
import VideoHeader from '../Videos/VideoHeader'
import Videos from '../Videos/Upload/Videos'
import VideoHistory from '../Videos/History/VideosHistory'
import VideoReview from '../Videos/Review/VideosReview'
import harbinger from 'harbinger'
import RulesSelection from '../RulesSelection/SizeChartRulesSelection'
import RulesBuilder from '../RuleBuilder/RulesBuilder'
import grey from '@material-ui/core/colors/grey'
import Badges from '../Badges/Badges'
import StageCoronaPage from '../StageCorona/StageCoronaPage'
import OfferGeneration from '../OfferGeneration/OfferGeneration'
import {
  BadgesIcon,
  CopyBulletsIcon,
  TeamToolIcon,
  VideoIcon,
} from '../Icons/ApplicationIcons'
import SizeChartUI from '../RuleBuilder/Components/SizeChartUI'
const styles = theme => ({
  header: {
    height: 56,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 48,
    },
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  whiteColor: {
    color: 'white',
  },
  whiteIcon: {
    color: 'white',
  },
  contentContainer: {
    padding: theme.spacing.unit, // Default <Grid container> spacing is 16. Use 8px padding for bug in material-ui Grid. See https://github.com/callemall/material-ui/issues/7466#issuecomment-316356427
  },
  sideNavList: {
    backgroundColor: grey[800],
  },
  sideNavFooterList: {
    color: theme.typography.body1.color,
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: theme.typography.caption.fontSize,
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing.unit * 1.5,
    '& li': {
      padding: theme.spacing.unit / 2,
    },
    '& a': {
      color: theme.typography.caption.color,
      textDecoration: 'none',
      transition: theme.transitions.create('color', { duration: theme.transitions.duration.shorter }),
      '&:hover': {
        color: theme.palette.primary[500],
      },
    },
  },
  iconSmall: {
    height: '10px',
  },
})

export class Layout extends React.Component {
  constructor (props) {
    super(props)
    harbinger.appId = envConfig.harbinger.appId
    harbinger.apiKey = envConfig.harbinger.apiKey
    harbinger.segment = 'Other'
  }
  static propTypes = {
    classes: object,
    headerTitle: string,
    openSideNav: func,
    closeSideNav: func,
    user: shape({
      email: string,
      isAuthorized: bool,
    }),
  }

  static defaultProps = {
    classes: {},
    headerTitle: undefined,
    layoutActions: {},
    notificationActions: {},
    user: {
      email: undefined,
      isAuthorized: undefined,
    },
  }

  handleMenuButtonClick = () => {
    if (this.props.sideNavIsOpen) {
      this.props.closeSideNav()
    } else {
      this.props.openSideNav()
    }
  }

  handleCloseSideNav = () => {
    if (this.props.sideNavIsOpen) {
      this.props.closeSideNav()
    }
  }

  render () {
    const {
      classes,
      user,
      headerTitle,
      sideNavIsOpen,
      signIn,
      signOut,
    } = this.props

    return (
      <div>
        <Helmet
          defaultTitle="Pipeline"
          titleTemplate="%s - Pipeline"
        />
        <Auth />
        <Notifications />
        <SideNav
          className={classes.sideNavList}
          isOpen={sideNavIsOpen}
          onClose={this.handleCloseSideNav}
        >
          <Header>
            <UserBar
              displayName={user.email}
              handleSignIn={signIn}
              handleSignOut={signOut}
              isAuthorized={user.isAuthorized}
            />
          </Header>
          {(user.isAuthorized && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Link to="/v2/badges" target="_self">
            <Icon className={classes.whiteIcon}><BadgesIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Badges</Text>
          </Link> : null
          }

          {(user.isAuthorized && user.permission.cgi && _.includes(user.permission.hostName, 'vendorpipeline')) ? <Link to={envConfig.hostName.externalUrl + '/v1/cgi/tcinList'} target="_self">
            <Icon className={classes.whiteIcon}><Polymer /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>CGI</Text>
          </Link> : null
          }

          {/* If User has Long Copy , Feature Bullet Permission & Narative Science permissions */}
          {user.isAuthorized && user.permission.longCopy && user.permission.copy ? <Link to="/v2/longcopy" target="_self">
            <Icon className={classes.whiteIcon}><CopyBulletsIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Copy & Bullets</Text>
          </Link> : null
          }

          {/* If User has only Narative Science permissions */}
          {user.isAuthorized && !user.permission.longCopy && user.permission.copy ? <Link to="/v2/narrative-science" target="_self">
            <Icon className={classes.whiteIcon}><CopyBulletsIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Copy & Bullets</Text>
          </Link> : null
          }

          {/* user.isAuthorized && user.permission.isCepSuperUser ? <Link to="/v2/dashboards" exact>
            <Icon className={classes.whiteIcon}><DashboardIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Dashboards</Text>
          </Link> : null
          */}

          {user.isAuthorized ? <Link to={_.includes(user.permission.hostName, 'vendorpipeline') ? envConfig.hostName.externalUrl + '/v1/guides/styleguides' : envConfig.hostName.internalUrl + '/guides/styleguides'} target="_self">
            <Icon className={classes.whiteIcon}><Info /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Help</Text>
          </Link> : null
          }

          {user.isAuthorized ? <Link to={_.includes(user.permission.hostName, 'vendorpipeline') ? envConfig.hostName.externalUrl : envConfig.hostName.internalUrl + '/home'} target="_self">
            <Icon className={classes.whiteIcon}><HomeIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Home</Text>
          </Link> : null
          }

          {user.isAuthorized && user.permission.imgReviewUpload ? <Link to="/v2/images/upload" target="_self">
            <Icon className={classes.whiteIcon}><PhotoIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Images</Text>
          </Link> : null
          }

          {(user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Link to="/v2/size-and-fit" exact>
            <Icon className={classes.whiteIcon}><StraightenIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Size & Fit</Text>
          </Link> : null
          }

          {/* (user.isAuthorized && user.permission.specMismatch && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Link to="/v2/SpecMismatch" target="_self">
            <Icon className={classes.whiteIcon}><StraightenIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Spec Mismatch</Text>
          </Link> : null
          */}

          {user.isAuthorized && user.permission.isCepSuperUser ? <Link to="/v2/monitors" exact>
            <Icon className={classes.whiteIcon}><TeamToolIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Team Tools</Text>
          </Link> : null
          }

          {user.isAuthorized && user.permission.videoUpload ? <Link to="/v2/video/upload" exact>
            <Icon className={classes.whiteIcon}><VideoIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Video</Text>
          </Link> : null
          }

          {/* user.isAuthorized && user.permission.videoUpload ? <Link to={_.includes(user.permission.hostName, 'vendorpipeline') ? envConfig.hostName.externalUrl + '/video/upload' : envConfig.hostName.internalUrl + '/video/upload'} target="_self">
            <Icon className={classes.whiteIcon}><VideoIcon /></Icon>
            <Text classes={{ primary: classes.whiteColor }}>Video</Text>
          </Link> : null
          */}

          <Footer>
            <ul className={classes.sideNavFooterList}>
              <li>
                <a href="" target="_blank" rel="noopener noreferrer">Help Chat Room
                  <Icon><Launch style={{ fontSize: '16px', marginLeft: '5px' }} /></Icon>
                </a>
              </li>
            </ul>
          </Footer>
        </SideNav>
        {/* Below switch case customize headers for every routes. Override AppHeader to customize Header */}
        { user.isAuthorized ? <Switch>
          <Route exact path="/" component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} />
          { user.permission.longCopy && <Route exact path="/v2/longcopy" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.longCopy && <Route exact path="/v2/longcopy/:id" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.longCopy && <Route exact path="/v2/bulk-upload" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.longCopy && <Route exact path="/v2/bulk-upload-history" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.copy && <Route exact path="/v2/narrative-science" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.specMismatch && <Route exact path="/v2/SpecMismatch" component={() => <LongCopyHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { (user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/size-and-fit" component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { (user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/size-and-fit/edit-rule" component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.isCepSuperUser && <Route exact path="/v2/monitors" component={() => <DashboardHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.isCepSuperUser && <Route exact path="/v2/dashboards" component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          {/* Images */}
          { user.permission.imgReviewUpload && <Route exact path="/v2/images" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.imgReviewUpload && <Route exact path="/v2/images/upload" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.imgReviewUpload && <Route exact path="/v2/images/history" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { !_.includes(user.permission.hostName, 'vendorpipeline') && <Route exact path="/v2/images/searchAndManage" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { (user.permission.imgReview && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/images/review" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { (user.permission.imgReview && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/images/reviewHistory" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.isCepSuperUser && <Route exact path="/v2/images/imageTags" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.isCepSuperUser && <Route exact path="/v2/images/classification" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.isCepSuperUser && <Route exact path="/v2/images/tagTraining" component={() => <ImagesHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          {/* Video */}
          { user.permission.videoUpload && <Route exact path="/v2/video" component={() => <VideoHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.videoUpload && <Route exact path="/v2/video/upload" component={() => <VideoHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { user.permission.videoUpload && <Route exact path="/v2/video/history" component={() => <VideoHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          { (user.permission.videoReview && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/video/review" component={() => <VideoHeader permission={user.permission} title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} /> }
          {(user.isAuthorized && user.permission.specMismatch && !_.includes(user.permission.hostName, 'vendorpipeline')) && <Route exact path="/v2/SpecMismatch" component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} />}
          <Route component={() => <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />} />
        </Switch> : <AppHeader title={headerTitle} menuAction={() => this.handleMenuButtonClick()} />}
        <div className={classes.contentContainer}>
          <Grid container>
            <Grid item xs={12}>
              { user.isAuthorized ? <Switch>
                <Route exact path="/" component={HomePage} />
                {/* Long Copy Management Routes */}
                { user.permission.longCopy ? <Route exact path="/v2/longcopy" component={LongCopy} /> : null }
                { user.permission.longCopy ? <Route exact path="/v2/longcopy/:id" component={EditLongCopy} /> : null }
                { user.permission.longCopy ? <Route exact path="/v2/bulk-upload" component={BulkUpload} /> : null }
                { user.permission.longCopy ? <Route exact path="/v2/bulk-upload-history" component={BulkUploadHistory} /> : null }
                { user.permission.copy ? <Route exact path="/v2/narrative-science" component={Copy} /> : null }
                {(user.isAuthorized && user.permission.specMismatch && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/SpecMismatch" component={SpecMismatch} /> : null}
                {/* Size Chart Routes */}
                { (user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/size-and-fit" component={RulesSelection} /> : null }
                { (user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/size-and-fit/edit-rule" component={RulesBuilder} /> : null }
                { (user.isAuthorized && user.permission.sizeChartsEdit && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/size-and-fit/edit-chart" component={SizeChartUI} /> : null }
                {/* Monitor and Dashboard Routes */}
                { user.permission.isCepSuperUser ? <Route exact path="/v2/monitors" component={DashboardUI} /> : null }
                { user.permission.isCepSuperUser ? <Route exact path="/v2/dashboards" component={DashboardPage} /> : null }
                {/* Image Upload Routes */}
                { user.permission.imgReviewUpload ? <Route exact path="/v2/images/upload" component={Images} /> : null }
                { user.permission.imgReviewUpload ? <Route exact path="/v2/images/history" component={ImagesHistory} /> : null }
                { (user.permission.imgReview && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/images/review" component={ImagesReview} /> : null }
                { (user.permission.imgReview && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/images/reviewHistory" component={ImagesReviewHistory} /> : null }
                { !_.includes(user.permission.hostName, 'vendorpipeline') ? <Route exact path="/v2/images/searchAndManage" component={SearchAndManage} /> : null }
                { user.permission.isCepSuperUser ? <Route exact path="/v2/images/imageTags" component={ImageLabels} /> : null }
                { user.permission.isCepSuperUser ? <Route exact path="/v2/images/classification" component={Classification} /> : null }
                { user.permission.isCepSuperUser ? <Route exact path="/v2/images/tagTraining" component={TagTraining} /> : null }
                {/* Video */}
                { user.permission.videoUpload ? <Route exact path="/v2/video/upload" component={Videos} /> : null }
                { user.permission.videoUpload ? <Route exact path="/v2/video/history" component={VideoHistory} /> : null }
                { (user.permission.videoReview && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/video/review" component={VideoReview} /> : null }
                { user.permission.copy ? <Route exact path="/v2/copy" component={Copy} /> : null }
                { (user.isAuthorized && !_.includes(user.permission.hostName, 'vendorpipeline')) ? <Route exact path="/v2/badges" component={Badges} /> : null }
                { user.isAuthorized ? <Route exact path="/v2/images/stagedata" component={StageCoronaPage} /> : null }
                {/* Offer Generator */}
                {user.isAuthorized ? <Route exact path="/v2/offerGenerator" component={OfferGeneration} /> : null}
                <Route component={NotFound} />
              </Switch>
                : <Switch> <Route component={SignInPrompt} /> </Switch> }
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  headerTitle: state.layout.headerTitle,
  sideNavIsOpen: state.layout.sideNavIsOpen,
  user: {
    email: state.auth.email,
    isAuthorized: state.auth.isAuthorized,
    memberOf: state.auth.memberOf,
    permission: state.auth.permission,
  },
})

const mapDispatchToProps = {
  openSideNav,
  closeSideNav,
  signIn,
  signOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Layout))
