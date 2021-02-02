const columnDropDownReducer = (state={}, action) => {
    switch (action.type) {
        case 'COLUMN_LIST_SUBMIT':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default columnDropDownReducer