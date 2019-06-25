import React from 'react'
import {
  TextField,
} from '@material-ui/core'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'

function escapeHtml (input) {
  return { __html: input }
}

function EditFeatureBullets (props) {
  const { tcin, featureBullets, featureBulletsEdit, isFeatureBulletsEditable, updateFeatureBullets, changeToEditState } = props
  return (
    <div>
      { isFeatureBulletsEditable
        /* eslint-disable */
        ? <TextField
          multiline
          rows="10"
          fullWidth
          margin="normal"
          defaultValue={featureBulletsEdit}
          autoFocus
          onBlur={(event) => updateFeatureBullets(event, tcin)}
        />
        /* eslint-enable */
        : <div
          onClick={() => changeToEditState(tcin, featureBullets)}
          role="presentation"
        >
          <ul>
            {featureBullets.map(bullet => {
              return (<li key={bullet}
                dangerouslySetInnerHTML={escapeHtml(bullet)}
              />)
            })}
          </ul>
        </div>
      }
    </div>
  )
}

export default withStyles(styles)(EditFeatureBullets)
