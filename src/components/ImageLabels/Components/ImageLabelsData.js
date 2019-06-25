const DefaultState = {
  initialImageUrl: '',
  experimentName: 'shot_types',
  labelsChoices: [
    {
      value: 'outfit_front',
      display: 'Front & full person',
    },
    {
      value: 'outfit_back',
      display: 'Back & full person',
    },
    {
      value: 'outfit_side',
      display: 'Side & full person',
    },
    {
      value: 'croppedtop_front',
      display: 'Front & person top half',
    },
    {
      value: 'croppedtop_back',
      display: 'Back & person top half',
    },
    {
      value: 'croppedbottom_front',
      display: 'Front & person lower half',
    },
    {
      value: 'croppedbottom_back',
      display: 'Back & person lower half',
    },
    {
      value: 'laydown',
      display: 'No person with just background',
    },
  ],
}

export { DefaultState }
