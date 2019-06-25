import { DefaultState } from '../../components/ImageLabels/Components/ImageLabelsData'
import { RANDOM_IMAGE_GET_SUCCESS } from './actionType'

export default function imageLabelReducer (state = DefaultState, action = {}) {
  switch (action.type) {
    case RANDOM_IMAGE_GET_SUCCESS: {
      const { payload } = action
      const newState = {
        ...state,
        currentImageToLabel: payload.imageUrl,
        currentImageSignature: payload.signature,
      }
      return newState
    }

    default:
      return state
  }
}
