import {SET_CURRENT_USER,SUCESSFULL_REGISTER,ERRORS,FAILURE_REGISTER,AUTH_ERROR,SUCESSFULL_LOGIN,FAILURE_LOGIN,LOGOUT} from '../actions/types'

const initialState ={
  isAuthenticated : localStorage.getItem('token')?true:false,
  token : localStorage.getItem("token"),
  user : {},
  errors:[],
}

export default function(state = initialState,action){
  const {payload} = action
  switch(action.type){
    case SET_CURRENT_USER:
          return {
            ...state,
            isAuthenticated:true,
            user:payload
          }
    case SUCESSFULL_REGISTER:
    case SUCESSFULL_LOGIN:
          localStorage.setItem("token",payload.token)
          return {
            ...state,
            ...payload,
            isAuthenticated:true,
          }
    case FAILURE_REGISTER:
    case FAILURE_LOGIN:
      case AUTH_ERROR:
      case LOGOUT:
          localStorage.removeItem("token")
          return {
            ...state,
            token:null,
            isAuthenticated:false
          }
    case ERRORS:
          return {
            ...state,
            errors:payload
          }

    default:
        return state
  }
}
