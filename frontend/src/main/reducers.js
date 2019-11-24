import { combineReducers } from 'redux'
import SearchReducer from '../reducers/SearchReducer'
import SectionReducer from '../reducers/SectionReducer'
import FavoritesReducer from '../reducers/FavoritesReducer'

const rootReducer = combineReducers({
    search: SearchReducer,
    sections: SectionReducer,
    favorites: FavoritesReducer
})

export default rootReducer