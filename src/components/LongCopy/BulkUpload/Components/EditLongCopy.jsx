import React from 'react'
import {
  TextField,
} from '@material-ui/core'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'

function escapeHtml (input) {
  return { __html: input }
}

function EditLongCopy (props) {
  const { tcin, longCopy, isLongCopyEditable, updateLongCopy, changeToEditState, convertLongCopy, convertLongCopyTextField, classes } = props
  let longDefaultValue = convertLongCopyTextField(longCopy)
  return (
    <div>
      { isLongCopyEditable
        /* eslint-disable */
        ? <TextField
          multiline
          rows="10"
          fullWidth
          margin="normal"
          defaultValue={longDefaultValue}
          autoFocus
          onBlur={(event) => updateLongCopy(event, tcin)}
        />
        /* eslint-enable */
        : <div
          className={classes.marginTopBottom10}
          onClick={() => changeToEditState(tcin)}
          role="presentation"
          dangerouslySetInnerHTML={escapeHtml(convertLongCopy(longCopy))}
        />
      }
    </div>
  )
}

export default withStyles(styles)(EditLongCopy)
