import { USER_LOGIN } from './actionTypes'
import axios from 'axios'

export const fetchUser = () => async dispatch => {
  let res = await axios.get('/api/current_user');
  if (res.status !== 200) {
    res = await axios.get('/api/current_user');
  }
  dispatch({
    type: USER_LOGIN,
    user: res.data.user
  });
}