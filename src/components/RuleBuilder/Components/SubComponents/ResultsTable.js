import React from 'react'
import { styles } from '../../../../styles/rulesBuilderStyles'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TextField,
  withStyles,
  Paper,
  CircularProgress,
  Typography,
  TablePagination,
} from '@material-ui/core'

export class ResultsTable extends React.Component {
  render () {
    const {
      classes,
      totalResults,
      tableFilter,
      foundItems,
      refreshing,
      page,
      handleChangePage,
      childCount,
    } = this.props
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Paper className={classes.resultsTablePaper}>
          <div id={'table_top'} className={classes.rulesTCINTableTop}>
            <div className={classes.rulesTCINTableSummary}>
              { '' + totalResults + ' Parents Found ' }
              { childCount !== undefined && childCount !== -1 && childCount + ' Children Found' }
            </div>
            <div className={classes.rulesTCINTableFilter}>
              <TextField
                value={tableFilter}
                onChange={(e) => this.props.updateTableFilter(e.target.value)}
                placeholder={'Search for Items Here'}
                fullWidth
              />
            </div>
          </div>
          <div className={classes.rulesTCINTable}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.rulesTCINTableImageCell}>Image</TableCell>
                  <TableCell
                    className={classes.rulesTCINTableTitleCell}
                    style={{ textAlign: 'center' }}
                  >Title</TableCell>
                  <TableCell className={classes.rulesTCINTableTCINCell}>TCIN</TableCell>
                  <TableCell className={classes.rulesTCINTableLDCell}>Launch Date</TableCell>
                  <TableCell className={classes.rulesTCINTableCCCell}>Child Count</TableCell>
                </TableRow>
              </TableHead>
            </Table>
            <div className={classes.rulesTCINTableBody}>
              <Table>
                <TableBody>
                  {
                    refreshing
                      ? <TableRow>
                        <TableCell colSpan={5}>
                          <div className={classes.resultsProgressWrapper}>
                            <CircularProgress
                              className={classes.resultsProgress}
                              style={{
                                width: '50px',
                                height: '50px',
                              }}
                            />
                            <Typography className={classes.resultsProgressText}>
                              Results Loading...
                            </Typography>
                          </div>
                        </TableCell>
                      </TableRow>
                      : foundItems.length > 0
                        ? foundItems.map((value, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className={classes.rulesTCINTableImageCell}>
                                <img
                                  src={value.image + '?&hei=60&wei=60'}
                                  alt={'Product'}
                                />
                              </TableCell>
                              <TableCell className={classes.rulesTCINTableTitleCell}>
                                <div dangerouslySetInnerHTML={{ __html: value.title }} />
                              </TableCell>
                              <TableCell className={classes.rulesTCINTableTCINCell}>{value.tcin}</TableCell>
                              <TableCell className={classes.rulesTCINTableLDCell}>
                                {value.launchData === null ? 'Unkown Launch Data' : new Date(value.launchDate).toDateString()}
                              </TableCell>
                              <TableCell className={classes.rulesTCINTableCCCell}>{value.children.length}</TableCell>
                            </TableRow>
                          )
                        })
                        : <TableRow key={'rawr'}>
                          <TableCell colSpan="5" style={{ fontSize: '24px', textAlign: 'center' }}>
                              No Items Found
                          </TableCell>
                        </TableRow>
                  }
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              rowsPerPageOptions={['100']}
              count={totalResults}
              rowsPerPage={100}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={handleChangePage}
            />
          </div>
        </Paper>
      </div>
    )
  }
}

export default (withStyles(styles)(ResultsTable))
