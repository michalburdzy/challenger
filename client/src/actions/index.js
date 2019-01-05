import { USER_LOGIN, FETCH_CHALLENGES } from './actionTypes'
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

export const fetchChallenges = () => async dispatch => {
  let res = await axios.get('/api/current_user/challenges')
  if (res.status !== 200) {
    res = 'Can\'t fetch challenges!'
  }
  dispatch({
    type: FETCH_CHALLENGES,
    challenges: res.data
  })
}