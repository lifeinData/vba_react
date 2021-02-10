const columnChoiceReducer = (state={}, action) => {
    switch (action.type) {
        case 'COLUMN_LIST_SUBMIT':
            return {...state, ...action.payload}
        case 'COLUMN_TYPE_CHANGED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default columnChoiceReducer