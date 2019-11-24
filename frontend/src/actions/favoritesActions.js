import axios from 'axios'
import consts from '../consts'

export function fetchFavorites() {
    return dispatch => {
        axios.get(`${consts.FAV_MOVIES_URL}/favmovies`)
            .then(resp => {
                dispatch({ type: "FETCH_FAVORITES", payload: resp.data });
            }).catch(err => {
                dispatch({ type: "FETCH_FAVORITES_ERROR", payload: err });
            });
    }
}