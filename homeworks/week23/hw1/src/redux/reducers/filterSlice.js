import { SET_FILTER } from '../actionTypes'

const initialState = {
  filters: 'All'
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      const { name } = action.payload
      return {
        filters: name
      }
    }

    default: {
      return state
    }
  }
}
