import { USER_LOGIN, FETCH_CHALLENGES } from '../actions/actionTypes'

const initialState = {user: null};

const rootReducer = (state=initialState, action) =>{
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        user: action.user
      }
    case FETCH_CHALLENGES: 
      return {
        ...state,
        challenges: action.challenges
      }
    default: 
      return state;
  }
}

export default rootReducer