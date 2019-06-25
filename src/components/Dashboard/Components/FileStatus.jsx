/* global _ */
import React from 'react'
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  IconButton,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Link,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'

function FindTotalFiles (fileStatus) {
  return fileStatus.reduce(function (sum, item) {
    return sum + item.pending_files
  }, 0)
}
function generateLable (source) {
  if (!source) {
    source = 'Pending'
  }
  return _.upperFirst(source)
}

function FetchFileNames (fileStatus, assetSource, folderName) {
  return fileStatus
    .filter((item) => item.asset_source === assetSource && item.folder_name === folderName)
    .map((item) => {
      return (
        item.file_names
      )
    })
}
function fetchFileNameWithoutExtension (filePath) {
  let fileName = filePath.substring(filePath.lastIndexOf('/') + 1)
  fileName = fileName.substring(0, fileName.lastIndexOf('.'))
  return fileName
}
function handleClickEvent (event, props) {
  let name = fetchFileNameWithoutExtension(event.target.innerHTML)
  props.handleSelectedItems(name)
}
function FileStatus (props) {
  const {
    fileStatus,
  } = props
  return (
    <Grid>
      <Paper elevation={12}>
        <Card>
          <CardHeader title="File Status" subheader="Total Files" />
          <CardContent className={props.classes.systemHealthCardStyle}>
            <Typography gutterBottom align="center">
              {FindTotalFiles(fileStatus)}
            </Typography>
            <Grid container spacing={16}>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <CardHeader subheader="Mmb" />
                    <Divider />
                    {fileStatus
                      .filter((item) => item.asset_source === 'mmb')
                      .map((item) => {
                        return (
                          <Typography key={item.folder_name + item.asset_source} variant="body1" gutterBottom align="center">
                            {generateLable(item.folder_name)} :
                            <IconButton className={props.classes.smallButton} name={props.pending_files} onClick={() => props.toggleFileInfo(FetchFileNames(fileStatus, 'mmb', item.folder_name))} >
                              {item.pending_files}
                            </IconButton>
                          </Typography>
                        )
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <CardHeader subheader="Vendor" />
                    <Divider />
                    {fileStatus
                      .filter((item) => item.asset_source === 'vendor')
                      .map((item) => {
                        return (
                          <Typography key={item.folder_name + item.asset_source} variant="body1" gutterBottom align="center">
                            {generateLable(item.folder_name)} :
                            <IconButton className={props.classes.smallButton} name={props.pending_files} onClick={() => props.toggleFileInfo(FetchFileNames(fileStatus, 'vendor', item.folder_name))} >
                              {item.pending_files}
                            </IconButton>
                          </Typography>
                        )
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <CardHeader subheader="Photostudio" />
                    <Divider />
                    {fileStatus
                      .filter((item) => item.asset_source === 'photostudio')
                      .map((item) => {
                        return (
                          <Typography key={item.folder_name + item.asset_source} variant="body1" gutterBottom align="center">
                            {generateLable(item.folder_name)} :
                            <IconButton className={props.classes.smallButton} name={props.pending_files} onClick={() => props.toggleFileInfo(FetchFileNames(fileStatus, 'photostudio', item.folder_name))} >
                              {item.pending_files}
                            </IconButton>
                          </Typography>
                        )
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <CardHeader subheader="Priority" />
                    <Divider />
                    {fileStatus
                      .filter((item) => item.asset_source === 'priority')
                      .map((item) => {
                        return (
                          <Typography key={item.folder_name + item.asset_source} variant="body1" gutterBottom align="center">
                            {generateLable(item.folder_name)} :
                            <IconButton className={props.classes.smallButton} name={props.pending_files} onClick={() => props.toggleFileInfo(FetchFileNames(fileStatus, 'priority', item.folder_name))} >
                              {item.pending_files}
                            </IconButton>
                          </Typography>
                        )
                      })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
      <ExpansionPanel expanded={props.fileInfoToggle}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={() => props.onClickToggleFileInfo(!props.fileInfoToggle)} >
          <Typography className={props.classes.heading}>File Information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ol>
            {props.fileNames.length && props.fileNames[0].map((item) => {
              return (
                <li key={item}>
                  <Link
                    key={item}
                    component="button"
                    variant="body2"
                    onClick={(event) => handleClickEvent(event, props)}
                  >
                    {item}
                  </Link>
                </li>
              )
            })}
          </ol>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  )
}

export default withStyles(styles)(FileStatus)
