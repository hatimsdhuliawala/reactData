import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser'
import CopyDataContainerHead from './CopyDataContainerHead'
import CopyDataContainerToolbar from './CopyDataContainerToolbar'
import CopyDataContainerTitle from './CopyDataContainerTitle'
import CopyDataActionDrawerContainer from './CopyDataActionDrawerContainer'
import { Link, Icon } from 'react-praxis-components/SideNav'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import StickerButtonsContainer from './StickerButtonsContainer'
import Moment from 'react-moment'
import DialogBoxDeleteSelectionContainer from './DialogBoxDeleteSelectionContainer'
import DialogBoxConfirmDeleteContainer from './DialogBoxConfirmDeleteContainer'

function escapeHtml (input) {
  return { __html: input }
}
function CopyData (props) {
  const { selected, classes, orderBy, order, data, getSorting,
    page, rowsPerPage, emptyRows, handleSelectAllClick, handleRequestSort,
    isSelected, handleClick, handleChangePage, handleChangeRowsPerPage,
    toggleActionDrawer, totalElements, auth, setBackgroundStatus,
    downloadSelectedTcinsCopy, downloadAllToExcel, isActionDrawerOpen, deleteBulletAndCopy,
  } = props
  return (
    <div>
      {data.length ? <Paper className={classes.copyDataroot}>
        <StickerButtonsContainer />
        <CopyDataContainerTitle
          numSelected={selected.length}
          downloadAllToExcel={downloadAllToExcel}
          size={totalElements}
          totalElements={totalElements}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <CopyDataContainerHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const findIsSelected = isSelected(n.id)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={findIsSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={findIsSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={findIsSelected} onClick={event => handleClick(event, n.id)} />
                      </TableCell>
                      <TableCell>
                        <Link to={{ pathname: `/v2/longcopy/${n.id}` }} className={classes.linkButton}>
                          <Icon><OpenInBrowserIcon /></Icon>
                        </Link>
                      </TableCell>
                      <TableCell component="th" padding="none" scope="row" style={setBackgroundStatus(n.current_event.event_type)}>
                        {props.convertStatusDisplay(n.current_event.event_type)}
                      </TableCell>
                      <TableCell>{n.tcin}</TableCell>
                      <TableCell>
                        {n.tcin_info &&
                          <div dangerouslySetInnerHTML={escapeHtml(n.tcin_info.product_title)} />
                        }
                      </TableCell>
                      <TableCell>
                        {n.tcin_info &&
                          n.tcin_info.division
                        }
                      </TableCell>
                      <TableCell>
                        {n.tcin_info &&
                          n.tcin_info.brand_name
                        }
                      </TableCell>
                      <TableCell>
                        {n.tcin_info &&
                          n.tcin_info.relationship_type_code
                        }
                      </TableCell>
                      <TableCell>
                        {n.assigned_to &&
                          n.assigned_to
                        }
                      </TableCell>
                      <TableCell>
                        {n.copy_due_date &&
                          <Moment
                            format="YYYY-MMM-DD"
                            parse="DD-MM-YYYY HH:mm:ss"
                          >
                            {n.copy_due_date}
                          </Moment>
                        }
                      </TableCell>
                      <TableCell>
                        <div className={classes.tableNotes}>{n.planner_note}</div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
              <TableRow style={{ height: 49 * 1 }}>
                <TableCell colSpan={11} />
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <CopyDataContainerToolbar
          numSelected={selected.length}
          toggleActionDrawer={toggleActionDrawer}
          downloadSelectedTcinsCopy={downloadSelectedTcinsCopy}
          deleteBulletAndCopy={deleteBulletAndCopy}
          auth={auth}
          isActionDrawerOpen={isActionDrawerOpen}
        />
        <CopyDataActionDrawerContainer />
        <DialogBoxDeleteSelectionContainer />
        <DialogBoxConfirmDeleteContainer />
      </Paper> : <div>
        <div className={props.classes.noResult}>No results matched your filter criteria</div>
      </div>}
    </div>
  )
}
export default withStyles(styles)(CopyData)
