import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Autocomplete from '../../Shared/Autocomplete/Autocomplete'
import { connect } from 'react-redux'
import {
  Card,
  CardContent,
  Switch,
  Typography,
  IconButton,
  Chip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core'
import {
  Add,
} from '@material-ui/icons'
import { styles } from '../../../styles/rulesBuilderStyles'
import { editSearchInfo } from '../../../store/sizeChartEdit/sizeChartDataActions'
import * as conditionActions from '../../../store/rules/builder/conditionActions'
import * as apiActions from '../../../store/rules/builder/apiActions'
import ResultsTable from './SubComponents/ResultsTable'
import _ from 'lodash'
import RuleConditionViewer from './SubComponents/RuleConditionViewer'
import * as inputTypes from './InputTypes'
import { changePage } from '../../../store/rules/builder/rulesBuilderActions'

class SelectItems extends React.Component {
  componentDidMount () {
  }

  isSelected () {

  }

  getBuilder (ruleAttribute) {
    const {
      classes,
      additionalConditionInput,
      additionalConditionExtra,
    } = this.props

    switch (ruleAttribute.inputType) {
      case inputTypes.FREE_FORM: {
        return (
          <div>
            <div className={classes.AdditionalConditionsAutocomplete}>
              <Autocomplete
                placeholder={'Enter ' + ruleAttribute.display + ' Here'}
                value={additionalConditionInput}
                onChange={(e) => this.props.updateAdditionalConditionInput(e.target.value)}
                items={[]}
                endAdornment={
                  <IconButton
                    onClick={() => {
                      let newAdditionalConditionExtra = additionalConditionExtra.slice(0)
                      newAdditionalConditionExtra.push(additionalConditionInput)
                      this.props.updateAdditionalConditionInput('')
                      this.props.updateAdditionalConditionExtra(newAdditionalConditionExtra)
                    }}
                  ><Add /></IconButton>
                }
                fullWidth
              />
            </div>
            <div className={classes.AdditionalConditionsChipArray}>
              {
                additionalConditionExtra.map((value, index) => {
                  return (
                    <Chip
                      key={index}
                      label={value}
                      onDelete={() => {
                        let newAdditionalConditionExtra = additionalConditionExtra.slice(0)
                        newAdditionalConditionExtra.splice(index, 1)
                        this.props.updateAdditionalConditionExtra(newAdditionalConditionExtra)
                      }}
                      className={classes.selectionContditionChip}
                    />
                  )
                })
              }
            </div>
            {
              additionalConditionExtra.length > 0
                ? <Button
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '10px' }}
                  onClick={() => {
                    this.props.saveAdditionalCondition()
                    this.props.resetAdditionalCondition()
                  }}
                >Add Condition</Button>
                : ''
            }
          </div>
        )
      }
      case inputTypes.AUTOCOMPLETE: {
        return (
          <div>
            <div className={classes.AdditionalConditionsAutocomplete}>
              <Autocomplete
                placeholder={'Enter ' + ruleAttribute.display + ' Here'}
                value={additionalConditionInput}
                onChange={(e) => this.props.updateAdditionalConditionInput(e.target.value)}
                onSelect={(e) => {
                  let newAdditionalConditionExtra = additionalConditionExtra.slice(0)
                  newAdditionalConditionExtra.push(e)
                  this.props.updateAdditionalConditionInput('')
                  this.props.updateAdditionalConditionExtra(newAdditionalConditionExtra)
                }}
                items={ruleAttribute.data.map(item => {
                  if (ruleAttribute.display.toLowerCase() === 'vendor name') {
                    return `${item.key} - ${item.value}`
                  }
                  return item.key
                })}
                endAdornment={
                  <IconButton
                    onClick={() => {
                      let newAdditionalConditionExtra = additionalConditionExtra.slice(0)
                      newAdditionalConditionExtra.push(additionalConditionInput)
                      this.props.updateAdditionalConditionInput('')
                      this.props.updateAdditionalConditionExtra(newAdditionalConditionExtra)
                    }}
                  ><Add /></IconButton>
                }
                fullWidth
              />
            </div>
            <div className={classes.AdditionalConditionsChipArray}>
              {
                additionalConditionExtra.map((value, index) => {
                  return (
                    <Chip
                      key={index}
                      label={value}
                      onDelete={() => {
                        let newAdditionalConditionExtra = additionalConditionExtra.slice(0)
                        newAdditionalConditionExtra.splice(index, 1)
                        this.props.updateAdditionalConditionExtra(newAdditionalConditionExtra)
                      }}
                      className={classes.selectionContditionChip}
                    />
                  )
                })
              }
            </div>
            {
              additionalConditionExtra.length > 0
                ? <Button
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '10px' }}
                  onClick={() => {
                    this.props.saveAdditionalCondition()
                    this.props.resetAdditionalCondition()
                  }}
                >Add Condition</Button>
                : ''
            }
          </div>
        )
      }
      case inputTypes.DOUBLE_COMBO_BOX: {
        return (
          <div>
            <FormControl style={{ width: '100%' }}>
              <InputLabel shrink>
                {ruleAttribute.labels[0]}
              </InputLabel>
              <Select
                value={additionalConditionInput === '' ? -1 : additionalConditionInput}
                onChange={(e) => this.props.updateAdditionalConditionInput(e.target.value)}
                name={ruleAttribute.labels[0]}
                className={classes.selectionConditionSelect}
              >
                {
                  ruleAttribute.data[0].map((value, index) => {
                    return (
                      <MenuItem
                        value={index}
                        key={index}
                      >{value.display}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
            {
              additionalConditionInput !== -1 && additionalConditionInput !== ''
                ? <FormControl style={{ width: '100%' }}>
                  <InputLabel shrink>
                    {ruleAttribute.labels[1]}
                  </InputLabel>
                  <Select
                    value={additionalConditionExtra}
                    onChange={(e) => this.props.updateAdditionalConditionExtra(e.target.value)}
                    name={ruleAttribute.labels[1]}
                    className={classes.selectionConditionSelect}
                    multiple
                    fullWidth
                  >
                    {
                      ruleAttribute.data[1][additionalConditionInput].map((value, index) => {
                        return (
                          <MenuItem
                            value={index}
                            key={index}
                          >{value.display}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
                : ''
            }
            {
              additionalConditionExtra.length > 0
                ? <Button
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: '10px' }}
                  onClick={() => {
                    this.props.saveAdditionalCondition()
                    this.props.resetAdditionalCondition()
                  }}
                >Add Condition</Button>
                : ''
            }
          </div>
        )
      }
    }
  }

  mapRuleAttributes () {
    const {
      ruleAttributes,
    } = this.props

    return ruleAttributes.map((ruleAttribute, index) => {
      return {
        name: ruleAttribute.display,
        type: ruleAttribute.type,
        builder: () => this.getBuilder(ruleAttribute),
      }
    })
  }

  render () {
    const {
      classes,
      conditions,
      identifiers,
      sizeChart,
      categories,
      sizes,
      brands,
      foundItems,
      totalResults,
      childCount,
      needsRefresh,
      tableFilter,
      page,
      selectedOperator,
      loadingConditions,
    } = this.props

    let { relationIndex } = this.props

    const {
      category,
      brand,
      size,
    } = sizeChart

    if (relationIndex === -1 && conditions.length > 0) {
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].key === 'relationship_type') {
          if (_.isEqual(conditions[i].values, ['VAP', 'VPC'])) {
            relationIndex = 0
          } else if (_.isEqual(conditions[i].values === ['VAP', 'VPC', 'SA', 'CC'])) {
            relationIndex = 1
          }
        }
      }
    }

    if (needsRefresh && relationIndex !== -1) {
      this.props.getRuleItems(conditions, tableFilter)
    }

    return (
      <div className={classes.selectItemsMain} >
        <div className={classes.selectItemsRulesBuilder}>
          <div className={classes.selectItemsPaper}>
            {/* rule search creation side */}
            <div className={classes.selectionItemsConditions}>
              <div style={{ width: '100%' }}>
                <div id="sizechart_card">
                  <Card className={classes.selectionSizeChartCard}>
                    <CardContent>
                      <Typography variant="h3" className={classes.rulesBuilderCardHeader}>
                        {'Size Chart Identifiers'}
                      </Typography>
                      <div className={classes.selectionSizeChartInput}>
                        <Autocomplete
                          value={category}
                          onChange={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'category',
                                value: e.target.value,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          onSelect={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'category',
                                value: e,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          items={categories}
                          placeholder={'Size Chart Category'}
                        />
                      </div>
                      <div className={classes.selectionSizeChartInput}>
                        <Autocomplete
                          value={brand}
                          onChange={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'brand',
                                value: e.target.value,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          onSelect={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'brand',
                                value: e,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          items={brands}
                          placeholder={'Size Chart Brand'}
                        />
                      </div>
                      <div className={classes.selectionSizeChartInput}>
                        <Autocomplete
                          value={size}
                          onChange={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'size',
                                value: e.target.value,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          onSelect={(e) => {
                            this.props.editSearchInfo(
                              {
                                key: 'size',
                                value: e,
                                sizeChart,
                                identifiers,
                              }
                            )
                          }}
                          items={sizes}
                          placeholder={'Size Chart Sizing'}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div id="other_condition_card">
                  <Card className={classes.selectionRelationshipCard}>
                    <CardContent>
                      <div className={classes.rulesBuilderAdditionalConditionHeader}>
                        <div className={classes.rulesBuilderAdditionalConditionTitle}>
                          <Typography variant="h3" style={{ marginBottom: '15px' }} className={classes.rulesBuilderCardHeader}>
                            {'Additional Conditions'}
                          </Typography>
                        </div>
                        <div className={classes.rulesBuilderOperatorSelectionWrapper}>
                          <Switch
                            checked={selectedOperator === 1}
                            onChange={(e) => this.props.changeAdditionalConditionOperator(e.target.checked ? 1 : 0)}
                          />
                          <Typography variant="button" style={{ margin: 'auto' }}>{selectedOperator === 0 ? 'Include' : 'Exclude'}</Typography>
                        </div>
                      </div>
                      <FormControl style={{ width: '100%' }}>
                        <InputLabel shrink>
                          Attribute
                        </InputLabel>
                        <Select
                          value={this.props.additionalConditionKey}
                          onChange={(e) => this.props.setAdditionCondition(e.target.value)}
                          name="Additional Attribute Selector"
                          className={classes.selectionConditionSelect}
                        >
                          {
                            this.mapRuleAttributes().map((item, index) => {
                              return (
                                <MenuItem value={index} key={index}>{item.name}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                      <div className={classes.selectionAdditionalContitionBuilder}>
                        {
                          this.props.additionalConditionKey >= 0
                            ? this.mapRuleAttributes()[this.props.additionalConditionKey].builder()
                            : ''
                        }
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div id="relation_card">
                  <Card className={classes.selectionRelationshipCard}>
                    <CardContent>
                      <Typography variant="h3" style={{ marginBottom: '15px' }} className={classes.rulesBuilderCardHeader}>
                        {'Relationship Type'}
                      </Typography>
                      <FormControl
                        component="fieldset"
                        className={classes.selectionRelationshipForm}
                      >
                        <RadioGroup
                          name="Relationship Type"
                          className={classes.selectionRelationshipGroup}
                          value={'' + relationIndex}
                          onChange={(e) => {
                            this.props.setRelationType(e.target.value)
                          }}
                        >
                          <FormControlLabel
                            value={'' + 0}
                            control={<Radio color="default" />}
                            label="VAP & VPC"
                          />
                          <FormControlLabel
                            value={'' + 1}
                            control={<Radio color="default" />}
                            label="All Items (VAP, VPC, SA & CC)"
                          />
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* rule search review */}
            <div className={classes.selectItemConditionsView}>
              <RuleConditionViewer
                conditions={conditions}
                editCondition={(payload) => this.props.editCondition(payload)}
                removeCondition={(payload) => this.props.removeCondition(payload)}
                removeConditionAttribute={(payload) => this.props.removeConditionAttribute(payload)}
              />
            </div>
          </div>
        </div>

        {/* Rule Search Results */}
        <div className={classes.selectItemsPreview}>
          <ResultsTable
            foundItems={foundItems}
            totalResults={totalResults}
            childCount={childCount}
            tableFilter={tableFilter}
            updateTableFilter={(newFilter) => this.props.updateTableFilter(newFilter)}
            refreshing={needsRefresh || loadingConditions}
            handleChangePage={(event, page) => {
              this.props.changePage(page)
              this.props.getRuleItems()
            }}
            page={page}
          />
        </div>
      </div>
    )
  }
}

SelectItems.defaultProps = {
  category: '',
  brand: '',
  size: '',
}

export const mapStateToProps = state => {
  return {
    // size chart stuff
    sizeChart: state.sizeChartEdit.sizeChart,
    identifiers: state.sizeChartEdit.identifiers,
    categories: state.sizeChartEdit.categories,
    brands: state.sizeChartEdit.brands,
    sizes: state.sizeChartEdit.sizes,

    // Select Items Specific
    relationIndex: state.rulesBuilder.relationIndex,
    additionalConditionKey: state.rulesBuilder.additionalConditionKey,
    additionalConditionInput: state.rulesBuilder.additionalConditionInput,
    additionalConditionExtra: state.rulesBuilder.additionalConditionExtra,
    ruleAttributes: state.rulesBuilder.ruleAttributes,

    // Non Specific stuff
    conditions: state.rulesBuilder.conditions,
    foundItems: state.rulesBuilder.foundItems,
    parentCount: state.rulesBuilder.parentCount,
    childCount: state.rulesBuilder.childCount,
    needsRefresh: state.rulesBuilder.needsRefresh,
    tableFilter: state.rulesBuilder.filter,
    page: state.rulesBuilder.page,
    totalResults: state.rulesBuilder.totalResults,
    selectedOperator: state.rulesBuilder.selectedOperator,
    loadingConditions: state.rulesBuilder.loadingConditions,
  }
}

export function mapDispatchToProps (dispatch) {
  // these are all the functions which will change what the page looks like
  // in a stateless component, all of these actions SHOULD be handled in props
  return {
    // Misc Size Chart Actions
    editSearchInfo: (payload) => dispatch(editSearchInfo(payload)),

    // Condition Actions
    setRelationType: (index) => dispatch(conditionActions.setRelationType(index)),
    setAdditionCondition: (index) => dispatch(conditionActions.setAdditionCondition(index)),
    resetAdditionalCondition: () => dispatch(conditionActions.resetAdditionalCondition()),
    updateAdditionalConditionInput: (value) => dispatch(conditionActions.updateAdditionalConditionInput(value)),
    updateAdditionalConditionExtra: (value) => dispatch(conditionActions.updateAdditionalConditionExtra(value)),
    saveAdditionalCondition: () => dispatch(conditionActions.saveAdditionalCondition()),
    removeCondition: (payload) => dispatch(conditionActions.removeCondition(payload)),
    removeConditionAttribute: (payload) => dispatch(conditionActions.removeConditionAttribute(payload)),
    updateTableFilter: (newFilter) => dispatch(conditionActions.updateTableFilter(newFilter)),
    editCondition: (conditionIndex) => dispatch(conditionActions.editCondition(conditionIndex)),
    addCondition: (payload) => dispatch(conditionActions.manuallyAddCondition(payload)),
    changeAdditionalConditionOperator: (payload) => dispatch(conditionActions.changeAdditionalConditionOperator(payload)),

    // api Actions
    getRuleAttributes: () => dispatch(apiActions.getRuleAttributes()),
    getRuleItems: (criteria, filter) => dispatch(apiActions.getRuleItems(criteria, filter)),

    // other actions
    changePage: (page) => dispatch(changePage(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SelectItems))
