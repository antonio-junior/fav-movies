import axios from 'axios'

export function fetchFavorites() {
    return dispatch => {
        axios.get(`http://localhost:3003/api/favmovies`)
            .then(resp => {
                dispatch({ type: "FETCH_FAVORITES", payload: resp.data });
            }).catch(err => {
                dispatch({ type: "FETCH_FAVORITES_ERROR", payload: err });
            });
    }
}