import React from 'react'
import {
  Grid,
  Paper,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import EditCopyContainer from './EditCopyContainer'
import CopyHistoryContainer from './CopyHistoryContainer'
import ItemDetailContainer from './ItemDetailContainer'
import ImageViewerContainer from './ImageViewerContainer'
import NotesEditPageContainer from './NotesEditPageContainer'
import ModalDataContainer from './ModalDataContainer'

function CopyDetailLayout (props) {
  const TabData = [
    { id: 'images', label: 'IMAGES' },
    { id: 'details', label: 'DETAILS' },
    { id: 'history', label: 'HISTORY' },
    { id: 'notes', label: 'NOTES' },
  ]
  const { classes, currentTabIndex, handleTabChange } = props
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <EditCopyContainer />
        </Grid>
        <Grid item xs={12}>
          <Paper position="static" color="default">
            <Toolbar className={classes.toolbarTab}>
              <Tabs
                value={currentTabIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                onChange={handleTabChange}
              >
                {TabData.map((tabs, index) => {
                  return (
                    <Tab key={tabs.id} value={index} label={tabs.label} />
                  )
                })
                }
              </Tabs>
            </Toolbar>
            {currentTabIndex === 0 &&
              <ImageViewerContainer />}
            {currentTabIndex === 1 &&
              <Grid container spacing={24}>
                <Grid item xs={6}><ItemDetailContainer /></Grid>
                <Grid item xs={6}><ModalDataContainer /></Grid>
              </Grid>
            }
            {currentTabIndex === 2 &&
              <CopyHistoryContainer />}
            {currentTabIndex === 3 &&
              <NotesEditPageContainer />}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
export default withStyles(styles)(CopyDetailLayout)
