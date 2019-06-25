import React from 'react'
import {
  Card,
  Grid,
  CardContent,
} from '@material-ui/core'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import { withStyles } from '@material-ui/core/styles'

function escapeHtml (input, key) {
  var txt = document.createElement('span')
  txt.innerHTML = input
  if (key === 'Category' && input &&
    input.indexOf(':') > 0) {
    return input.split(':')[1]
  }
  if (key === 'Launch Date' || key === 'Intended Launch Date') {
    var date = new Date(input)
    try {
      var dateFormat = new Intl.DateTimeFormat('en-US').format(date)
      return dateFormat
    } catch (error) {
      return input
    }
  }
  return txt.innerHTML
}
function escapeHtmlForBulletDescription (input) {
  return { __html: input }
}

function ItemDetail (props) {
  const { selectedItemData, classes } = props
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <div>
            <div className={classes.prodcutDetailHeader}>Product Details</div>
            <div className={classes.productDetailContainer}>
              {props.itemDescription.map((data) => {
                return (<div key={data.key}>
                  <span><b>{data.key}: </b></span>
                  <span>{escapeHtml(data.value, data.key)}</span>
                </div>)
              })}
              <div>
                {selectedItemData &&
                  selectedItemData.product_description &&
                  selectedItemData.product_description.bullet_descriptions != null &&
                  selectedItemData.product_description.bullet_descriptions.map((bullet) => {
                    return (<div
                      dangerouslySetInnerHTML={escapeHtmlForBulletDescription(bullet)}
                    />)
                  })
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default withStyles(styles)(ItemDetail)
