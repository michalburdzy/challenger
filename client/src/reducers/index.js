import { USER_LOGIN } from '../actions/actionTypes'

const initialState = {user: null};

const rootReducer = (state=initialState, action) =>{
  switch(action.type){
    case USER_LOGIN:
      return {
        ...state,
        user: action.user
      }
    default: 
      return state;
  }
}

export default rootReducer