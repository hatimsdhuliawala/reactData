import React from 'react'
import '../../styles/copy.css'
import HeaderTitle from '../Header/HeaderTitle'
import { Helmet } from 'react-helmet'
import MdInputChips from '../ChipComponent/ChipComponent'
import axios from 'axios'
import envConfigs from '../../config/apiConfig'
import Snackbar from '@material-ui/core/Snackbar'

class SpecMismatch extends React.Component {
  constructor () {
    super()
    this.state = {
      tcinData: [],
      open: false,
      errorMessage: '',
    }
  }

  mismatch (tcinList) {
    tcinList.map(tcin => {
      axios.post(`${envConfigs.api.contentApi}prodspecs/process_inbox?key=${envConfigs.api.gatewayKey}`, { 'tcin': tcin })
        .then(response => {
          // TODO Something with the response

        })
        .catch(error => {
          // TODO error message
          this.setState({ errorMessage: error })
        })
    })
    this.setState({ tcinData: [] })
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    this.setState({ open: false })
  }

  render () {
    return (
      <div className="white-bg">
        <HeaderTitle title="Spec Mismatch" />
        <Helmet title="Spec Mismatch" />
        <MdInputChips chips={this.state.tcinData} />
        <button className="copy-button-center copy-button-all copy-button-primary" onClick={this.mismatch.bind(this, this.state.tcinData)}>Reprocess</button>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">TCIN reprocessed</span>}
        />
      </div>
    )
  }
}

export default SpecMismatch
