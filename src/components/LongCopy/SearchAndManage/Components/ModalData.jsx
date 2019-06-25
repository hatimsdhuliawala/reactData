import React from 'react'
import {
  Card,
  Grid,
  CardContent,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import changeCase from 'change-case'

function convertKeyName (name) {
  return changeCase.titleCase(name.split('_').join(' '))
}
function escapeHtml (input) {
  return { __html: input }
}
function convertHeader (name) {
  return changeCase.ucFirst(name)
}
function ModalData (props) {
  const { modalMetadata, modalMetadataFetching, classes } = props
  return (
    <React.Fragment>
      {modalMetadataFetching ? <CircularProgress />
        : <Grid item xs={12}>
          {modalMetadata.length > 0 && <Card>
            <CardContent className={classes.productModalContainer}>
              {modalMetadata.map(item => {
                return (<div key={item}>
                  <h3> {convertHeader(item.view_type)} </h3>
                  <div className={classes.paddingLeft20} >
                    {Object.keys(item.metadata).map(function (key) {
                      return (<div key={key}>
                        <span><b>{convertKeyName(key)}: </b></span>
                        <span dangerouslySetInnerHTML={escapeHtml(item.metadata[key])} />
                      </div>)
                    })}
                  </div>
                </div>)
              })}
            </CardContent>
          </Card>}
        </Grid>}
    </React.Fragment>
  )
}

export default withStyles(styles)(ModalData)
