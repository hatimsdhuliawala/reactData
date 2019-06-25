import React from 'react'
import '../../../styles/copy.css'
import HeaderTitle from '../../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import MdInputChips from '../../ChipComponent/ChipComponent'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import envConfigs from '../../../config/apiConfig'
import _ from 'lodash'
import { connect } from 'react-redux'

class Copy extends React.Component {
  constructor () {
    super()
    this.state = {
      tcinData: [],
      chckData: false,
      AddTcin: [],
      RemoveTcin: [],
      errorMessage: '',
    }
  }

  getCopyData (tcinData) {
    if (this.state.tcinData.length) {
      this.setState({ chckData: true })
    } else {
      this.setState({ chckData: false })
    }
    this.state.tcinData.map((chip) => {
      axios.get(`${envConfigs.api.contentApi}search/${chip}?key=${envConfigs.api.gatewayKey}`)
        .then(res => {
          const checkTcinData = res.data

          if (checkTcinData && checkTcinData.longCopy && checkTcinData.softBullets.length) {
            if (_.findIndex(this.state.RemoveTcin, checkTcinData)) {
              this.setState({ RemoveTcin: [...this.state.RemoveTcin, checkTcinData] })
            }
          } else {
            if (!_.includes(this.state.AddTcin, chip)) {
              this.setState({ AddTcin: [...this.state.AddTcin, chip] })
            }
          }
        })
        .catch(error => {
          // TODO error message
          this.setState({ errorMessage: error })
        })
    })
    this.state.tcinData.splice(0, this.state.tcinData.length)
    this.setState({ tcinData: this.state.tcinData })
  }

  generateQuery = (tcins, deletedBy, processedBy) => {
    var queryParam = ''
    tcins.forEach((item) => {
      queryParam = queryParam + 'tcins=' + item + '&'
    })
    if (deletedBy !== undefined) {
      queryParam = queryParam + 'deleted_by=' + deletedBy
    }
    if (processedBy !== undefined) {
      queryParam = queryParam + 'processed_by=' + processedBy
    }
    return queryParam
  }
  removeLongCopy (tcinList) {
    let deletedBy = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    let query = this.generateQuery(tcinList, deletedBy, undefined)
    if (tcinList.length === 1) {
      axios.delete(`${envConfigs.api.narrativeScienceApi}copy/v1/trackings/clear_copy_and_feature_bullets?${query}&key=${envConfigs.api.gatewayKey}`)
        .then(res => {
          var index = this.state.RemoveTcin.map(function (tcinData) { return tcinData.tcin }).indexOf(tcinList[0])
          if (index < 0) return
          this.state.RemoveTcin.splice(index, 1)
          this.setState({ RemoveTcin: this.state.RemoveTcin })
          // TODO Do something with the response
        })
    } else {
      axios.delete(`${envConfigs.api.narrativeScienceApi}copy/v1/trackings/clear_copy_and_feature_bullets?${query}&key=${envConfigs.api.gatewayKey}`)
        .then(res => {
          this.setState({ RemoveTcin: [] })
          // TODO Do something with the response
        })
    }
  }

  addLongCopy (tcinList) {
    let processedBy = this.props.auth.email ? this.props.auth.email : this.props.auth.lanId
    let query = this.generateQuery(tcinList, undefined, processedBy)
    if (tcinList.length === 1) {
      axios.post(`${envConfigs.api.narrativeScienceApi}copy/v1/ns/process?${query}&key=${envConfigs.api.gatewayKey}`)
        .then(res => {
          const index = this.state.AddTcin.indexOf(tcinList[0])
          if (index < 0) return
          this.state.AddTcin.splice(index, 1)
          this.setState({ AddTcin: this.state.AddTcin })
          // TODO Do something with the response
        })
    } else {
      axios.post(`${envConfigs.api.narrativeScienceApi}copy/v1/ns/process?${query}&key=${envConfigs.api.gatewayKey}`)
        .then(res => {
          this.setState({ AddTcin: [] })
          // TODO Do something with the response
        })
    }
  }

  render () {
    return (
      <div className="white-bg">
        <HeaderTitle title="Narrative Science" />
        <Helmet title="Narrative Science" />
        <MdInputChips chips={this.state.tcinData} />
        <button className="copy-button-center copy-button-all copy-button-primary" onClick={this.getCopyData.bind(this, this.state.tcinData)}>Find Items</button>

        { /* Table for Remove long copy from tcin */ }
        { this.state.RemoveTcin.length ? <div className="copy-table-border">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TCIN</TableCell>
                <TableCell>Long Copy</TableCell>
                <TableCell>Soft Bullets</TableCell>
                <TableCell>Remove product bullets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.RemoveTcin.map(tcinData => {
                return (<TableRow key={tcinData.tcin}>
                  <TableCell>{tcinData.tcin}</TableCell>
                  <TableCell>{tcinData.longCopy}</TableCell>
                  <TableCell>
                    { tcinData.softBullets ? <ul>{ tcinData.softBullets.map(softBullets => {
                      return (<li key={softBullets.length}> {softBullets} </li>)
                    })}
                    </ul> : null }
                  </TableCell>
                  <TableCell><button onClick={this.removeLongCopy.bind(this, [tcinData.tcin])}>Remove</button></TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
          <button className="copy-button-center copy-button-all copy-button-reject"
            onClick={this.removeLongCopy.bind(this, this.state.RemoveTcin.map(test => { return test.tcin }))}>
            Remove All
          </button>
        </div>
          : null }

        { /* Table to add long copy for tcin */ }
        { this.state.AddTcin.length ? <div className="copy-table-border">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TCIN</TableCell>
                <TableCell>Add product bullets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.AddTcin.map(tcinData => {
                return (<TableRow key={tcinData}>
                  <TableCell>{tcinData}</TableCell>
                  <TableCell><button onClick={this.addLongCopy.bind(this, [tcinData])}>Add</button></TableCell>
                </TableRow>)
              })}
            </TableBody>
          </Table>
          <button className="copy-button-center copy-button-all copy-button-primary" onClick={this.addLongCopy.bind(this, this.state.AddTcin)}> Add All</button>
        </div>
          : null
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  const {
    auth,
  } = state
  return {
    auth,
  }
}
export default connect(mapStateToProps, null)(Copy)
