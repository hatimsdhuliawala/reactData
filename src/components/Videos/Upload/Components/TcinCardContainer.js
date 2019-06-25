import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import TcinCard from './TcinCard'
import styles from '../theme'
import {
  updateTcinList,
  updateInvalidTcinList,
  updateNotOwnedTcinList,
  editModeEnabled,
  editModeSetTitle,
} from '../../../../store/videos/actionCreator'
import _ from 'lodash'
import axios from 'axios'
import envConfigs from '../../../../config/apiConfig'
import { withRouter } from 'react-router-dom'

class TcinCardContainer extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  componentDidMount () {
    if (this.props.location.state) {
      this.props.editModeEnabled(true)
      this.props.updateTcinList(this.props.location.state.historyData.tcins_set)
      this.props.editModeSetTitle(this.props.location.state.historyData.title)
    } else {
      this.props.editModeEnabled(false)
      this.props.updateTcinList([])
      this.props.editModeSetTitle('')
    }
    this.props.updateNotOwnedTcinList([])
    this.props.updateInvalidTcinList([])
  }

  hasWhiteSpace = (s) => {
    return /\s/g.test(s)
  }

  validTcin = (tcin) => {
    var isValid = false
    var validationRegexs = [
      '^[0-9]{5,8}$',
      '^B[0-9]{10,10}$"',
    ]

    // return true if one of the regex matches
    _.each(validationRegexs, function (regex) {
      regex = new RegExp(regex)
      if (tcin.match(regex) !== null && tcin.match(regex)[0] === tcin) {
        isValid = true
      }
    })

    return isValid
  }

  splitTcins = (tcin) => {
    let tcins = tcin.split('\n')
    let tcinList = []
    let invalidTcin = []
    this.props.invalidTcinList.forEach(item => {
      invalidTcin.push(item)
    })
    if (tcins.length > 0) {
      tcins.forEach(element => {
        if (element.trim() !== '') {
          if (element.indexOf(',') > -1) {
            element.split(',').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  if (tcinList.indexOf(item.trim()) === -1) {
                    tcinList.push(item.trim())
                  } else {
                    invalidTcin.push(item.trim())
                  }
                } else {
                  invalidTcin.push(item.trim())
                }
              }
            })
          } else if (this.hasWhiteSpace(element)) {
            element.split(' ').forEach(item => {
              if (item.trim() !== '') {
                if (this.validTcin(item.trim())) {
                  if (tcinList.indexOf(item.trim()) === -1) {
                    tcinList.push(item.trim())
                  } else {
                    invalidTcin.push(item.trim())
                  }
                } else {
                  invalidTcin.push(item.trim())
                }
              }
            })
          } else {
            if (this.validTcin(element.trim())) {
              if (tcinList.indexOf(element.trim()) === -1) {
                tcinList.push(element.trim())
              } else {
                invalidTcin.push(element.trim())
              }
            } else {
              invalidTcin.push(element.trim())
            }
          }
        }
      })
    }
    if (invalidTcin.length > 0) {
      this.props.updateInvalidTcinList(invalidTcin)
    }
    return tcinList
  }
  checkVendorTcinMap = tcin => {
    return axios.post(envConfigs.api.externalContentPipelineApi + 'item_assets/v1/vendor/tcin_ownership?key=' + envConfigs.harbinger.apiKey + '&emailId=' + this.props.auth.email, [tcin.toString()])
      .then(res => {
        return res.data[0].valid
      })
  }

  addTcin = (tcin) => {
    if (this.props.auth.permission.vendorTcinMap) {
      this.splitTcins(tcin).forEach(i => {
        this.checkVendorTcinMap(i).then(res => {
          if (res) {
            let data = []
            this.props.tcinList.forEach(item => {
              data.push(item)
            })
            data.push(i)
            this.props.updateTcinList(data)
          } else {
            let notOwned = []
            this.props.notOwnedTcinList.forEach(item => {
              notOwned.push(item)
            })
            notOwned.push(i)
            this.props.updateNotOwnedTcinList(notOwned)
          }
        })
      })
    } else {
      let data = []
      this.props.tcinList.forEach(item => {
        data.push(item)
      })
      this.splitTcins(tcin).forEach(i => {
        data.push(i)
      })
      this.props.updateTcinList(data)
    }
  }

  deleteTcin = (tcin) => {
    let data = []
    this.props.tcinList.forEach(item => {
      if (item !== tcin) {
        data.push(item)
      }
    })
    this.props.updateTcinList(data)
  }

  render () {
    return (
      <TcinCard
        tcinList={this.props.tcinList}
        invalidTcinList={this.props.invalidTcinList}
        notOwnedTcinList={this.props.notOwnedTcinList}
        addTcin={this.addTcin}
        deleteTcin={this.deleteTcin}
        uploadPageForm={this.props.uploadPageForm}
        editMode={this.props.editMode}
        editModeTitle={this.props.editModeTitle}
      />
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    updateTcinList,
    updateInvalidTcinList,
    updateNotOwnedTcinList,
    editModeEnabled,
    editModeSetTitle,
  }, dispatch)

const mapStateToProps = state => {
  const {
    auth,
    videos,
    form,
  } = state
  const {
    uploadPageForm,
  } = form
  const {
    tcinList,
    invalidTcinList,
    notOwnedTcinList,
    editMode,
    editModeTitle,
  } = videos
  return {
    uploadPageForm,
    auth,
    editMode,
    tcinList,
    invalidTcinList,
    notOwnedTcinList,
    editModeTitle,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(TcinCardContainer)))
