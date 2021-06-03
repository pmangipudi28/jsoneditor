import jsonReducer from './jsonReducer'
import updateReducer from './updateReducer'

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    jsonReducer,
    updateReducer
})

export default allReducers;