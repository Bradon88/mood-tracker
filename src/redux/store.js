import {createStore, combineReducers} from 'redux'
// import readMood from './readMood'
import notesReducer from './notesReducer'

const rootReducer = combineReducers({
    notesReducer
  })

export default createStore(rootReducer)