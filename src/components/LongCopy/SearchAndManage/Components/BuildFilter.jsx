import React from 'react'
import {
  Button,
  Select,
  Tooltip,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core/styles'
import { FilterData, CopyWritingStatus, RoutedTeams } from './FilterData'
import '../../../../styles/longCopy.css'
import styles from '../theme'

let mapToTcins = (source) => {
  let tcins = []
  source.forEach(item => {
    tcins.push(item.value)
  })
  return tcins
}
let mapToDivisions = (source) => {
  let tcins = []
  if (source !== undefined) {
    source.forEach(item => {
      tcins.push(item.value)
    })
  }
  return tcins
}
function BuildFilter (props) {
  return (
    <div className={props.classes.buildFilterContainer}>
      <Card className={props.cardCss}>
        <CardHeader subheader={props.title} />
        <CardContent>
          <Select
            name="searchFilter"
            value={props.selectedFilter}
            onChange={props.onFilterSelect}
            inputProps={{
              id: 'filter-required',
            }}
            fullWidth
            className={props.classes.formControl}
          >
            {
              FilterData.map(
                (item) => <MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>
              )
            }
          </Select>
          <FormHelperText
            className={props.classes.formControl}>Please select filter</FormHelperText>
          {props.selectedFilter === 'eventType' &&
            <div>
              <Select
                name="copyWritingStatus"
                value={props.filterValues.copyWritingStatus}
                onChange={props.onFilterValueSelect}
                fullWidth
                className={props.classes.formControl}
              >
                {
                  CopyWritingStatus.filter(item => item.isVisible).map(
                    (item) => <MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>
                  )
                }
              </Select>
              <FormHelperText
                className={props.classes.formControl}>Please select copy writing status</FormHelperText>
            </div>
          }
          {props.selectedFilter === 'department' &&
            <div>
              <Select
                name="departmentData"
                value={props.filterValues.departmentData}
                onChange={props.onFilterValueSelect}
                fullWidth
                className={props.classes.formControl}
              >
                {props.selectedDepartmentData.returnData &&
                  props.selectedDepartmentData.returnData.map(
                    (item) => <MenuItem key={item.display} value={item.value}>{item.display}</MenuItem>
                  )
                }
              </Select>
              <FormHelperText
                className={props.classes.formControl}>Please select department</FormHelperText>
            </div>
          }
          {props.selectedFilter === 'tcin' &&
            <ChipInput
              value={mapToTcins(props.filterValues.tcins)}
              fullWidth
              blurBehavior="add"
              onAdd={(chips) => props.handleAddTcin(chips)}
              onDelete={(deletedChip) => props.handleDeleteTcin(deletedChip)}
              className={props.classes.formControl}
              helperText="Please provide list of TCINs"
            />
          }
          {props.selectedFilter === 'division' &&
            <ChipInput
              value={mapToDivisions(props.filterValues.divisions)}
              fullWidth
              blurBehavior="add"
              onAdd={(chips) => props.handleAddDivision(chips)}
              onDelete={(deletedChip) => props.handleDeleteDivision(deletedChip)}
              className={props.classes.formControl}
            />
          }
          {/* props.selectedFilter === 'division' &&
            <InputChips
              fullWidth
              selected={props.filterValues.divisions}
              onChange={(chips) => props.handleDivision(chips)}
              className={props.classes.formControl}
            />
          }
        */}
          {props.selectedFilter === 'routedTeams' &&
          <div>
            <Select
              name="routedTeams"
              value={props.filterValues.routedTeams}
              onChange={props.onFilterValueSelect}
              fullWidth
              className={props.classes.formControl}
            >
              {
                RoutedTeams.map(
                  (item) => <MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>
                )
              }
            </Select>
            <FormHelperText
              className={props.classes.formControl}>Please select Routing Team</FormHelperText>
          </div>
          }
        </CardContent>
        <CardActions>
          <Tooltip id="tooltip-icon" title="Add to Filter">
            <Button
              className={props.classes.button}
              disabled={props.isFetching}
              variant="contained"
              color="primary"
              type="button"
              onClick={() => props.handler()}>
              ADD
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </div>
  )
}
export default withStyles(styles)(BuildFilter)
