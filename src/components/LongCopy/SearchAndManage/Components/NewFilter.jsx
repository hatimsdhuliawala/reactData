import React from 'react'
import {
  Button,
  Divider,
  Typography,
  Card,
  CardActions,
  CardContent,
  Badge,
  List,
  Chip,
  Grid,
  ListItem,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import '../../../../styles/longCopy.css'
import styles from '../theme'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Close from '@material-ui/icons/Close'
import SaveFilterContainer from './SaveFilterContainer'
const filterChip = (filterValue, val, props) => {
  return (
    <Chip
      key={val.value}
      label={val.display}
      className={props.classes.smallMargin}
      onDelete={() => props.removeFilterHandler(filterValue, val.value)} />
  )
}

const filterChipWrapper = (item, props) => {
  return (
    <List key={item.filterValue}>
      <ListItem>
        <Badge color="primary" badgeContent={item.selectedValues.length}>
          <Typography
            className={props.classes.padding}>{item.filterDisplay}</Typography>
        </Badge>
      </ListItem>
      <Divider />
      <List>
        <ListItem>
          <Grid container spacing={24}>
            <Grid container direction="row" >
              {
                item.selectedValues.map(val => filterChip(item.filterValue, val, props))
              }
            </Grid>
          </Grid>
        </ListItem>
      </List>
    </List>
  )
}

function NewFilter (props) {
  return (
    <div className={props.classes.newFilterContainer}>
      <SaveFilterContainer />
      <Card className={props.cardCss}>
        <CardContent>
          <Grid container direction="row" className={props.classes.marginBottom10}>
            <Grid item xs={6}>
              <span className={props.classes.filterTitle}>{props.title}</span>
            </Grid>
            <Grid container item xs={6} justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                type="button"
                className={props.classes.button}
                onClick={() => props.clearFilters()}>
                <Close />
                CLEAR ALL
              </Button>
            </Grid>
          </Grid>
          <List>
            {
              props.selectedFilters.map(
                (item) => filterChipWrapper(item, props)
              )
            }
          </List>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={props.classes.button}
            onClick={() => props.addNewFilter()}>
            <AddBoxIcon />
            SAVE AS
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default withStyles(styles)(NewFilter)
