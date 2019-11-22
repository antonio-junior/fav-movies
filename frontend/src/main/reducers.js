import { combineReducers } from 'redux'
import SearchReducer from '../reducers/SearchReducer'
import SectionReducer from '../reducers/SectionReducer'

const rootReducer = combineReducers({
    search: SearchReducer,
    sections: SectionReducer
})

export default rootReducer