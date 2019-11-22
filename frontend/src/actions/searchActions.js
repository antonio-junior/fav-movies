export function clickSearch(term) {
    return {
        type: 'SEARCH_CLICKED',
        payload: term
    }
}