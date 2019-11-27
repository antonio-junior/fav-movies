const INITIAL_STATE = { term: '', movies: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SEARCH_CLICKED':
      return { ...state, term: action.payload };
    default:
      return state;
  }
};
