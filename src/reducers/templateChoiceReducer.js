const templateChoiceReducer = (state={}, action) => {
    switch (action.type) {
        case 'GET_TEMPLATE_OPTIONS':
            return {...state, ...action.payload}
        default:
            return state
    }
}