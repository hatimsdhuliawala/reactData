export const styles = {
  RulesBuilderMain: {
    width: 'calc(100% - 10px)',
    minWidth: '1600px',
    minHeight: '700px',
    height: 'calc(100% - 85px)',
    position: 'absolute',
    margin: 'auto',
    fontFamily: 'Targetica, "Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  RulesBuilderStepper: {
    width: '70%',
    display: 'inline-block',
  },
  RulesBuilderHeader: {
    width: 'calc(100% - 20px)',
    margin: 'auto',
    height: '100px',
  },
  RulesBuilderControl: {
    display: 'inline-block',
    padding: '4px',
    width: '30%',
    height: '80%',
  },
  rulesBuilderControlWrapper: {
    textAlign: 'right',
    width: '30%',
    height: '45px',
    display: 'inline-flex',
  },
  RulesBuilderControlButton: {
    width: '100%',
    height: '100%',
  },
  RulesBuilderStepButton: {
    padding: '20px, 16px',
    fontSize: '36px',
  },
  rulesBuilderContent: {
    height: 'calc(100% - 100px)',
    width: 'calc(100% - 20px)',
    margin: 'auto',
  },
  hidden: {
    display: 'none',
  },

  // ITEM SELECTION STYLES
  selectItemsMain: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  selectItemsRulesBuilder: {
    width: '49.5%',
    display: 'block',
  },
  selectItemsPreview: {
    width: '49.5%',
    display: 'block',
    marginLeft: '1%',
  },
  selectItemsPaper: {
    height: '100%',
    display: 'flex',
  },
  selectionSizeChartInput: {
    width: '100%',
    padding: '10px 0px',
  },
  selectionSizeChartCard: {
    width: '100%',
    padding: '0px',
    overflow: 'inherit',
  },
  selectItemConditionsView: {
    width: '49%',
    marginLeft: '2%',
    margin: 'auto',
    display: 'inline-flex',
    height: '100%',
  },
  selectionItemsConditions: {
    display: 'inline-flex',
    width: '49%',
  },
  selectionContitionCards: {
    marginTop: '10px',
    width: '100%',
    fontSize: '14px',
    minHeight: '150px',
  },
  selectionContitionCardHeader: {
    fontSize: '14px',
  },
  selectionContditionChip: {
    margin: '2px',
  },
  selectionRelationshipCard: {
    marginTop: '10px',
    overflow: 'inherit',
  },
  selectionConditionSelect: {
    width: '100%',
  },
  selectionAdditionalContitionBuilder: {
    marginTop: '10px',
  },
  rulesTCINTableImage: {
    width: '100px',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14px',
    marginLeft: '15px',
  },
  rulesTCINTableTitle: {
    width: '30%',
    minWidth: '300px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '15px',
    fontSize: '14px',
  },
  rulesTCINTableChart: {
    width: '50%',
    minWidth: '500px',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: '14px',
    marginLeft: '15px',
  },
  rulesTCINTableTCIN: {
    minWidth: '80px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '14px',
    margin: 'auto',
  },
  rulesTCINTableTop: {
    width: '100%',
    height: '40px',
    marginTop: '10px',
  },
  rulesTCINTableSummary: {
    width: '40%',
    height: '100%',
    display: 'inline-block',
    textAlign: 'center',
    fontSize: '18px',
  },
  rulesTCINTableFilter: {
    width: 'calc(60% - 40px)',
    marginLeft: '20px',
    marginRight: '20px',
    height: '100%',
    fontSize: '24px',
    display: 'inline-block',
  },
  rulesTCINTableBody: {
    overflowY: 'auto',
    display: 'inline-block',
    overflowX: 'visible',
    width: '100%',
  },
  rulesTCINTableImageCell: {
    minWidth: '80px',
    width: '20%',
    textAlign: 'center',
    margin: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rulesTCINTableTitleCell: {
    minWidth: '200px',
    width: '40%',
    margin: 'auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rulesTCINTableTCINCell: {
    minWidth: '80px',
    width: '15%',
    margin: 'auto',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rulesTCINTableLDCell: {
    minWidth: '100px',
    margin: 'auto',
    width: '20%',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rulesTCINTableCCCell: {
    minWidth: '20px',
    margin: 'auto',
    width: '5%',
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  rulesTCINTable: {
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    height: 'calc(100% - 50px)',
    display: 'inline-grid',
    gridTemplateRows: '57px calc(100% - 113px) 56px',
    alignContent: 'start',
  },
  resultsProgressWrapper: {
    textAlign: 'center',
    margin: 'auto',
    width: 'fit-content',
    display: 'flex',
    padding: '10px',
  },
  resultsProgress: {
    margin: '5px',
    height: '50px',
    width: '50px',
    display: 'inline-block',
  },
  resultsProgressText: {
    display: 'inline-block',
    margin: 'auto 0',
    marginLeft: '10px',
    fontSize: '20px',
  },
  conditionMenuItemDiv: {
    width: '100%',
    height: '100%',
    display: 'contents',
  },
  ConditionMenuItemContent: {
    width: 'calc(100% - 30px)',
    height: '100%',
    display: 'inline-block',
  },
  ConditionMenuItemIcon: {
    width: '24px',
    height: '24px',
    marginLeft: '10px',
    display: 'inline-block',
  },
  AdditionalConditionsAutocomplete: {
    height: '50px',
  },
  AdditionalConditionsChipArray: {
    margin: '10px',
  },
  resultsTablePaper: {
    height: '100%',
    overflow: 'hidden',
  },

  // Rule Confirmation Styles
  rulesConditionViewerMain: {
    width: '100%',
    height: '100%',
    marginBottom: '10px',
  },
  rulesConditionViewerTitle: {
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center',
    padding: '10px',
    margin: 'auto',
  },
  rulesConditionViewerCondtitions: {
    width: '100%',
    display: 'flex',
    height: 'calc(100% - 55px)',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    overflowY: 'auto',
  },
  conditionCard: {
    width: '100%',
  },
  rulesConditionViewerCardPadding: {
    width: '100%',
    maxWidth: '400px',
    minWidth: '23%',
    padding: '10px',
    margin: '0 auto',
  },
  ruleConfirmationMain: {
    display: 'grid',
    height: '100%',
    width: '100%',
  },
  ruleConfirmationFinalSettings: {
    width: '100%',
    margin: '10px 0',
    height: '100px',
  },
  ruleConfirmationTitle: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: '500',
  },
  ruleConfirmationPriorityWrapper: {
    height: '25px',
    display: 'inline-block',
    textAlign: 'center',
    padding: '0 50px',
    margin: 'auto',
  },
  ruleConfirmationLabel: {
    fontSize: '16px',
    marginRight: '15px',
    display: 'inline-block',
    marginTop: '4px',
  },
  ruleConfirmationNameWrapper: {
    display: 'inline-block',
    padding: '0 50px',
    height: '25px',
    margin: 'auto',
  },
  ruleConfirmationNameInput: {
    width: '400px',
  },
  ruleConfirmationFinalSettingsInputWrapper: {
    display: 'flex',
    height: '50%',
  },
  ruleConfirmationSizeChartPreview: {
    width: '49.5%',
    display: 'inline-flex',
    marginRight: '.5%',
  },
  ruleConfirmationItemPreview: {
    width: '49.5%',
    display: 'inline-flex',
    marginLeft: '.5%',
  },
  rulesConfirmationPreviews: {
    width: '100%',
    marginTop: '10px',
    minHeight: '600px',
    display: 'flex',
    marginBottom: '10px',
  },
  ruleConfirmationHowToMeasure: {
    margin: 'auto',
  },
  toggleHowToMeasureButton: {
    margin: 'auto',
  },
  howToMeasureToggleWrapper: {
    width: '100%',
    display: 'flex',
  },
  rulesBuilderCardHeader: {
    fontSize: '20px',
    fontWeight: '600',
  },
  rulesBuilderOperatorSelectionWrapper: {
    display: 'inline-flex',
    marginLeft: 'auto',
  },
  rulesBuilderAdditionalConditionTitle: {
    display: 'inline-block',
  },
}
