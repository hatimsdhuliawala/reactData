const DefaultState = {
  tcinList: [],
  imageList: [],
  imageListFetching: false,
  selectedImage: null,
  tagSelectedData: [],
  tagDataFetching: false,
  tagData: [],
  similarImageFetching: false,
  similarImageData: [],
  maxSimilarImageCount: 0,
  dataSelectionComplete: false,
  isErrorMessageShownClassification: false,
  errorMessageClassification: '',
  durationSnackBarClassification: 4000,
  currentActiveStep: 0,
  currentSimilarImageCount: 0,
  tagData1: [
    {
      'group': 'model',
      'group_metadata': {
        'description': 'This tag type is used to classify an image based on the body type of the model',
        'short_description': 'body type',
      },
      'tags': [
        {
          'name': 'plus',
          'tag_metadata': {
            'description': 'Photos of plus sized models',
            'example_asset_urls': [
              '',
            ],
          },
        },
      ],
    },
    {
      'group': 'crop',
      'group_metadata': {
        'description': 'This tag type is used to classify an image based on how much and what part of the model is visible',
      },
      'tags': [
        {
          'name': 'person_top',
          'tag_metadata': {
            'description': 'A photo where you can see the top of a person',
            'example_asset_urls': [
              '',
            ],
          },
        },
        {
          'name': 'full_person',
          'tag_metadata': {
            'description': 'A photo where you can see the entire person',
            'short_description': 'head-to-toe',
            'example_asset_urls': [
              '',
            ],
          },
        },
      ],
    },
    {
      'group': 'view',
      'group_metadata': {
        'description': 'This tag type is used to classify an image based on the view of the model/product',
        'short_description': 'photo shot',
      },
      'tags': [
        {
          'name': 'back',
          'tag_metadata': {
            'description': 'A photo of the back of a model/product',
            'example_asset_urls': [
              '',
            ],
          },
        },
        {
          'name': 'side',
          'tag_metadata': {
            'description': 'A photo of the side of a model/product',
            'example_asset_urls': [
              '',
            ],
          },
        },
        {
          'name': 'front',
          'tag_metadata': {
            'description': 'A front facing photo of a model/product',
            'example_asset_urls': [
              '',
              '',
            ],
          },
        },
      ],
    },
  ],
}

export { DefaultState }
