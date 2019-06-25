import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core'
import { styles } from './Theme'
import { withStyles } from '@material-ui/core/styles'
import '../../../styles/dashboard.css'

function fetchPrimaryImage (item) {
  if (item !== undefined &&
    item.itemDetails !== undefined &&
    item.itemDetails !== null &&
    item.itemDetails.enrichment !== undefined &&
    item.itemDetails.enrichment.images !== undefined &&
    item.itemDetails.enrichment.images !== null &&
    item.itemDetails.enrichment.images.base_url !== undefined &&
    item.itemDetails.enrichment.images.primary_image !== undefined
  ) {
    return 'http:' + item.itemDetails.enrichment.images.base_url + item.itemDetails.enrichment.images.primary_image + '?hei=100&wei=100'
  } else {
    return ''
  }
}

function fetchAlterImages (item) {
  if (item !== undefined &&
    item.itemDetails !== undefined &&
    item.itemDetails !== null &&
    item.itemDetails.enrichment !== undefined &&
    item.itemDetails.enrichment.images !== undefined &&
    item.itemDetails.enrichment.images !== null &&
    item.itemDetails.enrichment.images.base_url !== undefined &&
    item.itemDetails.enrichment.images.alternate_images !== undefined
  ) {
    let alternateImages = []
    for (let i = 0; i < item.itemDetails.enrichment.images.alternate_images.length; i++) {
      alternateImages.push({
        id: i,
        url: 'http:' + item.itemDetails.enrichment.images.base_url + item.itemDetails.enrichment.images.alternate_images[i] + '?hei=100&wei=100',
      })
    }
    return alternateImages
  }
  return undefined
}

function fetchPipelinePrimaryImage (item) {
  if (item !== undefined &&
    item.pipelineItemDetails !== undefined &&
    item.pipelineItemDetails !== null &&
    item.pipelineItemDetails.images !== undefined &&
    item.pipelineItemDetails.images !== null &&
    item.pipelineItemDetails.images.baseUrl !== undefined &&
    item.pipelineItemDetails.images.primary !== undefined
  ) {
    return 'http:' + item.pipelineItemDetails.images.baseUrl + item.pipelineItemDetails.images.primary + '?hei=100&wei=100'
  } else {
    return ''
  }
}

function fetchPipelineAlternateImages (item) {
  if (item !== undefined &&
    item.pipelineItemDetails !== undefined &&
    item.pipelineItemDetails !== null &&
    item.pipelineItemDetails.images !== undefined &&
    item.pipelineItemDetails.images !== null &&
    item.pipelineItemDetails.images.baseUrl !== undefined &&
    item.pipelineItemDetails.images.alternateUrls !== undefined &&
    item.pipelineItemDetails.images.alternateUrls !== null
  ) {
    let alternateImages = []
    for (let i = 0; i < item.pipelineItemDetails.images.alternateUrls.length; i++) {
      alternateImages.push({
        id: i,
        url: 'http:' + item.pipelineItemDetails.images.baseUrl + item.pipelineItemDetails.images.alternateUrls[i] + '?hei=100&wei=100',
      })
    }
    return alternateImages
  }
  return undefined
}
function escapeHtml (input) {
  return { __html: input }
}

function TcinDetails (props) {
  return (
    <Grid key={props.item.id} item xs={12} sm={12}>
      <Paper elevation={12}>
        <Card>
          <CardContent>
            <Grid item xs={12} sm={12}>
              <Grid container justify="center" direction="column" >
                <Grid item>
                  {props.item.itemDetails && props.item.itemDetails.product_description &&
                    <Typography variant="body2" gutterBottom align="center">
                      <span dangerouslySetInnerHTML={escapeHtml(props.item.itemDetails.product_description.title + '(<B>' + props.item.itemDetails.tcin + '</B>)')} />
                    </Typography>
                  }
                  <Divider />
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={4} sm={2}>
                <Typography type="button" gutterBottom align="center">
                  Images
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5}>
                <Grid container direction="row" >
                  <Grid item>
                    <img alt="Primary" src={fetchPipelinePrimaryImage(props.item)} />
                    <Typography type="caption" gutterBottom align="center">
                      Primary
                    </Typography>
                  </Grid>
                  {fetchPipelineAlternateImages(props.item) &&
                    fetchPipelineAlternateImages(props.item).map((item) => {
                      return (
                        <Grid item key={item.id}>
                          <img alt="Primary" src={item.url} />
                          <Typography type="caption" gutterBottom align="center">
                            Alternate
                          </Typography>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
              <Grid item xs={10} sm={5}>
                <Grid container direction="row" >
                  <Grid item>
                    <img alt="Primary" src={fetchPrimaryImage(props.item)} />
                    <Typography type="caption" gutterBottom align="center">
                      Primary
                    </Typography>
                  </Grid>
                  {fetchAlterImages(props.item) &&
                    fetchAlterImages(props.item).map((item) => {
                      return (
                        <Grid item key={item.id}>
                          <img alt="Alternate" src={item.url} />
                          <Typography type="caption" gutterBottom align="center">
                            Alternate
                          </Typography>
                        </Grid>
                      )
                    })
                  }
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={4} sm={2}>
                <Typography type="button" gutterBottom align="center">
                  Product Specs
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.pipelineItemDetails &&
                  props.item.pipelineItemDetails.product_specifications !== null &&
                  props.item.pipelineItemDetails.product_specifications !== undefined &&
                  props.item.pipelineItemDetails.product_specifications.map(ps => {
                    return <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(ps + '<br/>')} />
                  })
                }
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.itemDetails &&
                    props.item.itemDetails.product_description !== null &&
                    props.item.itemDetails.product_description !== undefined &&
                    props.item.itemDetails.product_description.bullet_descriptions !== null &&
                    props.item.itemDetails.product_description.bullet_descriptions !== undefined &&
                    props.item.itemDetails.product_description.bullet_descriptions.map(ps => {
                      return <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(ps + '<br/>')} />
                    })
                }
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={4} sm={2}>
                <Typography type="button" gutterBottom align="center">
                  Long Copy
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.pipelineItemDetails &&
                  props.item.pipelineItemDetails.downstream_description !== null &&
                  props.item.pipelineItemDetails.downstream_description !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.pipelineItemDetails.downstream_description)} />
                }
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.itemDetails &&
                  props.item.itemDetails.product_description !== null &&
                  props.item.itemDetails.product_description !== undefined &&
                  props.item.itemDetails.product_description.downstream_description !== null &&
                  props.item.itemDetails.product_description.downstream_description !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.itemDetails.product_description.downstream_description)} />
                }
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={4} sm={2}>
                <Typography type="button" gutterBottom align="center">
                  Feature Bullets
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.pipelineItemDetails &&
                  props.item.pipelineItemDetails.soft_bullet_description !== null &&
                  props.item.pipelineItemDetails.soft_bullet_description !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.pipelineItemDetails.soft_bullet_description)} />
                }
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.itemDetails &&
                  props.item.itemDetails.product_description !== null &&
                  props.item.itemDetails.product_description !== undefined &&
                  props.item.itemDetails.product_description.soft_bullet_description !== null &&
                  props.item.itemDetails.product_description.soft_bullet_description !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.itemDetails.product_description.soft_bullet_description)} />
                }
              </Grid>
            </Grid>
            <Grid container spacing={24}>
              <Grid item xs={4} sm={2}>
                <Typography type="button" gutterBottom align="center">
                  Size Chart URL
                </Typography>
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.pipelineItemDetails &&
                  props.item.pipelineItemDetails.size_chart_html_fragment !== null &&
                  props.item.pipelineItemDetails.size_chart_html_fragment !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.pipelineItemDetails.size_chart_html_fragment)} />
                }
              </Grid>
              <Grid item xs={10} sm={5} className={props.classes.alignLeft}>
                {props.item.itemDetails &&
                  props.item.itemDetails.enrichment !== null &&
                  props.item.itemDetails.enrichment !== undefined &&
                  props.item.itemDetails.enrichment.size_chart_fragment_url !== null &&
                  props.item.itemDetails.enrichment.size_chart_fragment_url !== undefined &&
                  <span className="dashBoardItemDesc" dangerouslySetInnerHTML={escapeHtml(props.item.itemDetails.enrichment.size_chart_fragment_url)} />
                }
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Paper>
    </Grid>
  )
}

export default withStyles(styles)(TcinDetails)
