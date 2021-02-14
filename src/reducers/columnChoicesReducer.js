const columnChoiceReducer = (state={'insertColumnFlag':false}, action) => {
    switch (action.type) {
        case 'COLUMN_LIST_SUBMIT':
            return {...state, ...action.payload}
        case 'COLUMN_TYPE_CHANGED':
            return {...state, ...action.payload}
        case 'TOGGLE_INSERT_COLUMN':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default columnChoiceReducer