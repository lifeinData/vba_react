const templateChoiceReducer = (state={'templateChoiceClicked': false, 'data': ''}, action) => {
    switch (action.type) {
        case 'GET_TEMPLATE_OPTIONS':
            state['data'] = {...state['data'], ...action.payload} 
            return {...state}
        case 'TEMPLATE_OPTION_CLICKED':
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default templateChoiceReducer;