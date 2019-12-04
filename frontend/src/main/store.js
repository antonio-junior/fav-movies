import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import SearchReducer from '../reducers/searchReducer';
import SectionReducer from '../reducers/sectionReducer';
import FavoritesReducer from '../reducers/favoritesReducer';

const rootReducer = combineReducers({
  search: SearchReducer,
  section: SectionReducer,
  favorites: FavoritesReducer,
  toastr: toastrReducer,
});

export default rootReducer;
