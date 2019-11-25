import { combineReducers } from 'redux'
import SearchReducer from '../reducers/SearchReducer'
import SectionReducer from '../reducers/SectionReducer'
import FavoritesReducer from '../reducers/FavoritesReducer'
import {reducer as toastrReducer} from 'react-redux-toastr'

const rootReducer = combineReducers({
    search: SearchReducer,
    sections: SectionReducer,
    favorites: FavoritesReducer,
    toastr: toastrReducer
})

export default rootReducer