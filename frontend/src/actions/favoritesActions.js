import Api from '../services/Api';

export default function fetchFavorites() {
  return dispatch => {
    Api.getAll()
      .then(resp => {
        dispatch({ type: 'FETCH_FAVORITES', payload: resp.data });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAVORITES_ERROR', payload: err });
      });
  };
}
