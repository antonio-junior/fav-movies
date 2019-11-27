const INITIAL_STATE = { actual: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SECTION_CLICKED':
      return { ...state, actual: action.payload };
    default:
      return state;
  }
};
