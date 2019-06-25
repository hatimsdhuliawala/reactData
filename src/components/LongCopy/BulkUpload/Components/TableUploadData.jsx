import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import TableUploadDataHead from './TableUploadDataHead'
import DeleteIcon from '@material-ui/icons/Delete'
import UndoIcon from '@material-ui/icons/Undo'
import Tooltip from '@material-ui/core/Tooltip'
import '../../../../styles/longCopy.css'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styles from '../theme'
// import ItemDataContainer from './ItemDataContainer'
import EditLongCopyContainer from './EditLongCopyContainer'
import EditFeatureBulletsContainer from './EditFeatureBulletsContainer'
import DialogBoxDeleteContainer from './DialogBoxDeleteContainer'

let TableUploadData = props => {
  const { selected, classes, uploadData, handleSelectAllClick, isSelected,
    handleClick, revertBackFeatureBullets, revertBackLongCopy, handleDeleteConfirmation } = props
  return (
    <div>
      {uploadData.length ? <Paper className={classes.copyDataroot}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableUploadDataHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={uploadData.length}
            />
            <TableBody>
              {uploadData
                .map(data => {
                  const findIsSelected = isSelected(data)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={findIsSelected}
                      tabIndex={-1}
                      key={data.tcin}
                      selected={findIsSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={findIsSelected} onClick={event => handleClick(event, data)} />
                      </TableCell>
                      <TableCell padding="none">
                        {data.tcin}
                      </TableCell>
                      <TableCell style={{ maxWidth: '300px', overflowWrap: 'break-word' }} padding="none">
                        <EditLongCopyContainer data={data} />
                      </TableCell>
                      <TableCell style={{ maxWidth: '80px', paddingLeft: '30px', paddingRight: '20px' }}>
                        {
                          data.isLongCopyEdited &&
                          <Tooltip title="Revert back">
                            <UndoIcon
                              className={classes.revertBack}
                              onClick={() => revertBackLongCopy(data.tcin)} />
                          </Tooltip>
                        }
                      </TableCell>
                      <TableCell style={{ maxWidth: '200px' }} padding="none">
                        <EditFeatureBulletsContainer data={data} />
                      </TableCell>
                      <TableCell style={{ maxWidth: '80px', paddingLeft: '30px', paddingRight: '20px' }}>
                        {
                          data.isFeatureBulletsEdited &&
                          <Tooltip title="Revert back">
                            <UndoIcon
                              className={classes.revertBack}
                              onClick={() => revertBackFeatureBullets(data.tcin)}
                            />
                          </Tooltip>
                        }
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <DeleteIcon
                            className={classes.deleteButton}
                            onClick={event => handleDeleteConfirmation(data.tcin)}
                          />
                        </Tooltip>
                        <DialogBoxDeleteContainer data={data} />
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </div>
      </Paper> : <div className={props.classes.noResult}>No results matched your filter criteria</div>}
    </div>
  )
}

TableUploadData = reduxForm({ form: 'bulkUploadData' })(TableUploadData)
TableUploadData = connect(
  state => ({
    initialValues: {
      tcin: '',
      notes: '',
      feature_Bullets: '',
    }, // pull initial values from account reducer
  }),
)(TableUploadData)
export default withStyles(styles)(TableUploadData)
